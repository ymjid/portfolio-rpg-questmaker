import { Component, inject } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Skill } from '../../data/questmaker.data';

@Component({
  selector: 'app-skills',
  imports: [ReactiveFormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  dataService = inject(Data)

  skillForm = new FormArray<FormGroup>([])

  addForm() {
    this.skillForm.push(new FormGroup({
      name: new FormControl(""),
      rate: new FormControl(0),
    }));
  }

  removeForm(index: number) {
    this.skillForm.removeAt(index)
  }

  getSkillGroup(index: number): FormGroup {
    return this.skillForm.at(index) as FormGroup
  }

  onSubmit() {
    this.dataService.setSkills(this.skillForm.getRawValue()  as Skill[])
  }
}
