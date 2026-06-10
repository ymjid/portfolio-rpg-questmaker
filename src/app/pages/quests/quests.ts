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
  questsOpen: boolean[] = []
  questTagsOpen: boolean[][] = []
  questSubquestsOpen: boolean[][] = []
  questImagesOpen: boolean[][] = []

  toggleQuestSection(index: number) {
    this.questsOpen[index] = !this.questsOpen[index];
  }

  toggleTagSection(questIndex: number, index: number) {
    this.questTagsOpen[questIndex][index] = !this.questTagsOpen[questIndex][index];
  }

  toggleSubquestSection(questIndex: number, index: number) {
    this.questSubquestsOpen[questIndex][index] = !this.questSubquestsOpen[questIndex][index];
  }

  toggleImageSection(questIndex: number, index: number) {
    this.questImagesOpen[questIndex][index] = !this.questImagesOpen[questIndex][index];
  }

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

  this.questsOpen = this.dataService.quests().map(() => false)
  this.questTagsOpen = this.dataService.quests().map(quest => 
    quest.tags.map(() => false)
  )
  this.questSubquestsOpen = this.dataService.quests().map(quest => 
    quest.subquests.map(() => false)
  )
  this.questImagesOpen = this.dataService.quests().map(quest => 
    (quest.images ?? []).map(() => false)
  )
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
      this.questTagsOpen.push([])
      this.questSubquestsOpen.push([])
      this.questImagesOpen.push([])
  }

  removeQuest(index: number) {
    this.questForm.removeAt(index)
    this.questsOpen.splice(index, 1)
  }

  getQuestGroup(index: number): FormGroup {
    return this.questForm.at(index) as FormGroup
  }

  addTag(questIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const tags = quest.get('tags') as FormArray
    tags.push(new FormControl(''))
    this.questTagsOpen[questIndex].push(true)
  }

  removeTag(questIndex: number, tagIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const tags = quest.get('tags') as FormArray
    tags.removeAt(tagIndex)
    this.questTagsOpen[questIndex].splice(tagIndex, 1)
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
    this.questSubquestsOpen[questIndex].push(true)
  }

  removeSubquest(questIndex: number, subquestIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const subquests = quest.get('subquests') as FormArray
    subquests.removeAt(subquestIndex)
    this.questSubquestsOpen[questIndex].splice(subquestIndex, 1)
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
    this.questImagesOpen[questIndex].push(true)
  }

  removeImage(questIndex: number, imageIndex: number) {
    const quest = this.questForm.at(questIndex) as FormGroup
    const images = quest.get('images') as FormArray
    images.removeAt(imageIndex)
    this.questImagesOpen[questIndex].splice(imageIndex, 1)
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
