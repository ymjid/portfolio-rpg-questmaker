import { Component, effect, inject } from '@angular/core';
import { Data } from '../../services/data';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Theme } from '../../data/questmaker.data';
import { Notif } from '../../services/notif';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
    dataService = inject(Data)
    notifService = inject(Notif)
    
  tagForm = new FormArray<FormControl>([])
  themeForm = new FormArray<FormGroup>([])
  newTagsOpen: boolean[] = []
  newThemesOpen: boolean[] = []

  toggleNewTagSection(index: number) {
    this.newTagsOpen[index] = !this.newTagsOpen[index];
  }

  toggleNewThemeSection(index: number) {
    this.newThemesOpen[index] = !this.newThemesOpen[index];
  }

  constructor() {
    effect(() => {
      this.themeForm.clear()
      this.tagForm.clear()
  this.dataService.tags().forEach(tag => {
    this.tagForm.push(new FormControl(tag))
  })
  this.newTagsOpen = this.dataService.tags().map(() => false)

    this.dataService.themes().forEach(theme => {
    this.themeForm.push(new FormGroup({
      name: new FormControl(theme.name),
      variables: new FormGroup({
        "--portal-primary": new FormControl(theme.variables['--portal-primary']),
        "--portal-bg": new FormControl(theme.variables['--portal-bg']),
        "--portal-text": new FormControl(theme.variables['--portal-text']),
         "--portal-card": new FormControl(theme.variables['--portal-card']),
        "--portal-border": new FormControl(theme.variables['--portal-border']),
      })
    }))
  })

  this.newThemesOpen = this.dataService.themes().map(() => false)
})
}

  addNewTag() {
    this.tagForm.push(new FormControl(''))
    this.newTagsOpen.push(true)
  }

  removeNewTag(tagIndex: number) {
    this.tagForm.removeAt(tagIndex)
    this.newTagsOpen.splice(tagIndex, 1)
  }

  onSubmitTag() {
    this.dataService.setTags(this.tagForm.getRawValue()  as string[])
    this.notifService.showSaved();
  }

  getNewTagControl(tagIndex: number): FormControl {
    return this.tagForm.at(tagIndex) as FormControl
  }

  addNewTheme() {
    this.themeForm.push(new FormGroup({
      name: new FormControl(''),
      variables: new FormGroup({
        "--portal-primary": new FormControl(''),
        "--portal-bg": new FormControl(''),
        "--portal-text": new FormControl(''),
         "--portal-card": new FormControl(''),
        "--portal-border": new FormControl(''),
      })
    }))
    this.newThemesOpen.push(true)
  }

  removeNewTheme(themeIndex: number) {
    this.themeForm.removeAt(themeIndex)
    this.newThemesOpen.splice(themeIndex, 1)
  }

  onSubmitTheme() {
    this.dataService.setThemes(this.themeForm.getRawValue()  as Theme[])
    this.notifService.showSaved();
  }

  getNewThemeControl(themeIndex: number): FormControl {
    return this.themeForm.at(themeIndex).get('name') as FormControl
  }
getThemeVariableKeys(): string[] {
  return Object.keys({
    "--portal-primary": '',
    "--portal-bg": '',
    "--portal-text": '',
    "--portal-card": '',
    "--portal-border": '',
  })
}

getThemeVariableControl(themeIndex: number, varKey: string): FormControl {
  return this.themeForm.at(themeIndex).get('variables')?.get(varKey) as FormControl
}
}
