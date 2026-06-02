import { Component, inject } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Gear, Rarety } from '../../data/questmaker.data';

@Component({
  selector: 'app-gears',
  imports: [ReactiveFormsModule],
  templateUrl: './gears.html',
  styleUrl: './gears.scss',
})
export class Gears {
  dataService = inject(Data)
  gearRarety = Object.values(Rarety)

  gearForm = new FormArray<FormGroup>([])

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
    }
  
    removeForm(index: number) {
      this.gearForm.removeAt(index)
    }
  
    getGearGroup(index: number): FormGroup {
      return this.gearForm.at(index) as FormGroup
    }
  
    onSubmit() {
      this.dataService.setGears(this.gearForm.getRawValue()  as Gear[])
    }
}
