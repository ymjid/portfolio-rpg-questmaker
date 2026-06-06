import { Component, inject, signal } from '@angular/core';
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

  addNewTag() {
    this.tagForm.push(new FormControl(''))
  }

  removeNewTag(tagIndex: number) {
    this.tagForm.removeAt(tagIndex)
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
  }

  removeNewTheme(themeIndex: number) {
    this.themeForm.removeAt(themeIndex)
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
