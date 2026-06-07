import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Quest, QuestImage, QuestState, ThemeType } from '../../data/questmaker.data';
import { Notif } from '../../services/notif';

@Component({
  selector: 'app-quests',
  imports: [ReactiveFormsModule],
  templateUrl: './quests.html',
  styleUrl: './quests.scss',
})
export class Quests implements OnInit {
  dataService = inject(Data)
  questState = Object.values(QuestState)
  questTheme = this.dataService.themes
  questTag = this.dataService.tags
  notifService = inject(Notif)

  
  questForm = new FormArray<FormGroup>([])

    ngOnInit() {
  this.dataService.quests().forEach(quest => {
    this.questForm.push(new FormGroup({
        id: new FormControl(quest.id),
        name: new FormControl(quest.name),
        description: new FormControl(quest.description),
        state: new FormControl(quest.state.text),
        release: new FormControl(quest.release),
        preview: new FormControl(quest.preview),
        theme: new FormControl(quest.theme),
        code: new FormControl(quest.code),
        tags: new FormArray(quest.tags.map(tag => new FormControl(tag))),
        subquests: new FormArray(quest.subquests.map(subquest => new FormGroup({
          name: new FormControl(subquest.name),
          state: new FormControl(subquest.state.text),
        }))),
        images: new FormArray((quest.images as QuestImage[]).map(image => new FormGroup({
          url: new FormControl(image.url),
          alt: new FormControl(image.alt),
        }))),
      }))
  })
}

  addQuestForm() {
      this.questForm.push(new FormGroup({
        id: new FormControl(Date.now().toString()),
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
        const quests = this.questForm.getRawValue().map((quest, index) => ({
          id: quest['id'],
          name: quest['name'],
          description: quest['description'],
          state: Object.values(QuestState).find(r => r.text === quest['state']),
          release: quest['release'],
          preview: quest['preview'],
          theme: quest['theme'],
          code: quest['code'],
          tags: quest['tags'],
          subquests: quest['subquests'].map((subquest: any) => ({
            name: subquest.name,
            state: Object.values(QuestState).find(r => r.text === subquest.state),
          })),
          images: quest['images']
        }))
    this.dataService.setQuests(quests as Quest[])
    this.notifService.showSaved()
  }
}
