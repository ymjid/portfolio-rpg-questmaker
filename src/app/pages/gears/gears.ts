import { Component, effect, inject, signal } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gear, Rarety } from '../../data/questmaker.data';
import { Notif } from '../../services/notif';
import { Json } from '../../services/json';

@Component({
  selector: 'app-gears',
  imports: [ReactiveFormsModule],
  templateUrl: './gears.html',
  styleUrl: './gears.scss',
})
export class Gears {
  dataService = inject(Data)
  gearRarety = Object.values(Rarety)
  notifService = inject(Notif)
  jsonService = inject(Json)

  gearForm = new FormArray<FormGroup>([])
  gearOpen: boolean[] = []
  selectedFiles: (File | null)[] = []
  previewUrls = signal<(string | null)[]>([])
  SlotSize = {
    width:2,
    height:2,
  }

  toggleGearSection(index: number) {
    this.gearOpen[index] = !this.gearOpen[index];
  }

      constructor() {
        effect(() => {
          this.gearForm.clear()
  this.dataService.gears().forEach(gear => {
    this.gearForm.push(new FormGroup({
        name: new FormControl(gear.name),
        logo: new FormControl(gear.logo),
        rarety: new FormControl(gear.rarety),
        description: new FormControl(gear.description),
        slot: new FormControl(gear.slot),
        width: new FormControl(gear.width),
        height: new FormControl(gear.height),
      }))
  })

  this.gearOpen = this.dataService.gears().map(() => false)
})
}

    addForm() {
      this.gearForm.push(new FormGroup({
        name: new FormControl(""),
        logo: new FormControl(""),
        rarety: new FormControl(Rarety.COMMON),
        description: new FormControl(""),
        slot: new FormControl(0),
        width: new FormControl(0),
        height: new FormControl(0),
      }));
      this.gearOpen.push(true)
    }
  
    removeForm(index: number) {
      this.gearForm.removeAt(index)
      this.gearOpen.splice(index, 1)
    }
  
    getGearGroup(index: number): FormGroup {
      return this.gearForm.at(index) as FormGroup
    }

    onFileSelected(event: Event, index: number) {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) return
      this.selectedFiles[index] = file;
      const ext = file.name.split('.').pop()
      const fileName = `gear${index}.${ext}`
      this.jsonService.addPendingImage(fileName, this.selectedFiles[index])

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.previewUrls.update(urls => {
          const newUrls = [...urls]
          newUrls[index] = reader.result as string
          return newUrls
        })
      }

      const currentGears = this.dataService.gears()
      this.dataService.editGear({
        ...currentGears[index],
        logo: `https://raw.githubusercontent.com/ymjid/portfolio-rpg-data/main/assets/${fileName}`
      })
    }
  
    onSubmit() {
      this.dataService.setGears(this.gearForm.getRawValue()  as Gear[])
      this.notifService.showSaved()
    }
}
