import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Skill } from '../../data/questmaker.data';
import { Notif } from '../../services/notif';

@Component({
  selector: 'app-skills',
  imports: [ReactiveFormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements OnInit{
  dataService = inject(Data)
  notifService = inject(Notif)

  skillForm = new FormArray<FormGroup>([])

  ngOnInit() {
  this.dataService.skills().forEach(skill => {
    this.skillForm.push(new FormGroup({
      name: new FormControl(skill.name),
      rate: new FormControl(skill.rate),
    }))
  })
}

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
    this.notifService.showSaved();
  }
}
