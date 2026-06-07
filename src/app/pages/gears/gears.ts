import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gear, Rarety } from '../../data/questmaker.data';
import { Notif } from '../../services/notif';

@Component({
  selector: 'app-gears',
  imports: [ReactiveFormsModule],
  templateUrl: './gears.html',
  styleUrl: './gears.scss',
})
export class Gears implements OnInit{
  dataService = inject(Data)
  gearRarety = Object.values(Rarety)
  notifService = inject(Notif)

  gearForm = new FormArray<FormGroup>([])
  gearOpen: boolean[] = []

  toggleGearSection(index: number) {
    this.gearOpen[index] = !this.gearOpen[index];
  }

      ngOnInit() {
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
  
    onSubmit() {
      this.dataService.setGears(this.gearForm.getRawValue()  as Gear[])
      this.notifService.showSaved()
    }
}
