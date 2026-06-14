import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharState } from '../../data/questmaker.data';
import { Data } from '../../services/data';
import { Notif } from '../../services/notif';
import { Json } from '../../services/json';

@Component({
  selector: 'app-character',
  imports: [ReactiveFormsModule],
  templateUrl: './character.html',
  styleUrl: './character.scss',
})
export class Character {
  dataService = inject(Data)
  charStates = Object.values(CharState)
  notifService = inject(Notif)
  selectedFile: File | null = null
  previewUrl = signal<string | null>(null)
  jsonService = inject(Json)

  characterForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    class: new FormControl('', { nonNullable: true, validators: Validators.required }),
    img: new FormControl('', { nonNullable: true }),
    github: new FormControl('', { nonNullable: true }),
    linkedin: new FormControl('', { nonNullable: true }),
    state: new FormControl(CharState.LOOKINGJOB, { nonNullable: true, validators: Validators.required }),
  })

  constructor() {
    effect(() => {
    this.characterForm.patchValue({
      name: this.dataService.hero().name,
      class: this.dataService.hero().class,
      img: this.dataService.hero().img,
      github: this.dataService.hero().github,
      linkedin: this.dataService.hero().linkedin,
      state: this.dataService.hero().state,
    })
  })
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    this.selectedFile = file;
    const ext = file.name.split('.').pop()
    const fileName = `profile.${ext}`
    this.jsonService.addPendingImage(fileName, this.selectedFile)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.previewUrl.set(reader.result as string)
    }

    const currentHero = this.dataService.hero()
this.dataService.updateCharacter({
  ...currentHero,
  img: `https://raw.githubusercontent.com/ymjid/portfolio-rpg-data/main/assets/${fileName}`
})
}

  onSubmit() {
    this.dataService.updateCharacter(this.characterForm.getRawValue())
    this.notifService.showSaved()
  }
}
