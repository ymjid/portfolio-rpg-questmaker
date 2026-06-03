import { Component, inject } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Quest, QuestState, SubQuest, TagsType, ThemeType } from '../../data/questmaker.data';

@Component({
  selector: 'app-quests',
  imports: [ReactiveFormsModule],
  templateUrl: './quests.html',
  styleUrl: './quests.scss',
})
export class Quests {
  dataService = inject(Data)
  questState = Object.values(QuestState)
  questTheme = Object.values(ThemeType)
  questTag = Object.values(TagsType)
  
  questForm = new FormArray<FormGroup>([])

  addQuestForm() {
      this.questForm.push(new FormGroup({
        name: new FormControl(""),
        description: new FormControl(""),
        state: new FormControl(""),
        release: new FormControl(""),
        preview: new FormControl(""),
        theme: new FormControl(""),
        code: new FormControl(""),
        tags: new FormArray([]),
        subquests: new FormArray([]),
        images: new FormArray([])
      }));
  }

  removeQuest(index: number) {
    this.questForm.removeAt(index)
  }

  getQuestGroup(index: number): FormGroup {
    return this.questForm.at(index) as FormGroup
  }

  addTag(questIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const tags = quest.get('tags') as FormArray
    tags.push(new FormControl(''))
  }

  removeTag(questIndex: number, tagIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const tags = quest.get('tags') as FormArray
    tags.removeAt(tagIndex)
  }

  getTagGroup(index: number): FormArray {
    return this.questForm.at(index).get('tags') as FormArray
  }

  getTagControl(questIndex: number, tagIndex: number): FormControl {
    return this.getTagGroup(questIndex).at(tagIndex) as FormControl
  }

  addSubquest(questIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const subquests = quest.get('subquests') as FormArray
    subquests.push(new FormGroup({
        name: new FormControl(""),
        state: new FormControl(""),
    }))
  }

  removeSubquest(questIndex: number, subquestIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const subquests = quest.get('subquests') as FormArray
    subquests.removeAt(subquestIndex)
  }

  getSubquestArray(index: number): FormArray {
    return this.questForm.at(index).get('subquests') as FormArray
  }

  getSubquestGroup(questIndex: number, subquestIndex: number): FormGroup {
    return this.getSubquestArray(questIndex).at(subquestIndex) as FormGroup
  }

  addImage(questIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const images = quest.get('images') as FormArray
    images.push(new FormGroup({
            url: new FormControl(""),
            alt: new FormControl(""),
    }))
  }

  removeImage(questIndex: number, imageIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const images = quest.get('images') as FormArray
    images.removeAt(imageIndex)
  }

  getImageArray(index: number): FormArray {
    return this.questForm.at(index).get('images') as FormArray
  }

  getImageGroup(questIndex: number, imageIndex: number): FormGroup {
    return this.getImageArray(questIndex).at(imageIndex) as FormGroup
  }

  onSubmit() {
    this.dataService.setQuests(this.questForm.getRawValue()  as Quest[])
  }
}
