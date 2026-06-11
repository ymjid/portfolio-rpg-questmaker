import { Component, effect, inject } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Skill, SkillRate } from '../../data/questmaker.data';
import { Notif } from '../../services/notif';

@Component({
  selector: 'app-skills',
  imports: [ReactiveFormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills{
  dataService = inject(Data)
  notifService = inject(Notif)
  rateSkills = Object.values(SkillRate)

  skillForm = new FormArray<FormGroup>([])
  skillOpen: boolean[] = []

  toggleSkillSection(index: number) {
    this.skillOpen[index] = !this.skillOpen[index];
  }

  constructor() {
    effect(() => {
      this.skillForm.clear()
  if (this.dataService.isLoaded()) {
      this.dataService.skills().forEach(skill => {
    this.skillForm.push(new FormGroup({
      name: new FormControl(skill.name),
      rate: new FormControl(skill.rate.value),
    }))
  })
  this.skillOpen = this.dataService.skills().map(() => false)
  }
})
}

  addForm() {
    this.skillForm.push(new FormGroup({
      name: new FormControl(""),
      rate: new FormControl(0),
    }));
    this.skillOpen.push(true)
  }

  removeForm(index: number) {
    this.skillForm.removeAt(index)
    this.skillOpen.splice(index, 1)
  }

  getSkillGroup(index: number): FormGroup {
    return this.skillForm.at(index) as FormGroup
  }

  onSubmit() {
    const skills = this.skillForm.getRawValue().map(skill => ({
      name: skill['name'],
      rate: Object.values(SkillRate).find(r => r.value === skill['rate'])
    }))
    this.dataService.setSkills(skills as Skill[])
    this.notifService.showSaved();
  }
}
