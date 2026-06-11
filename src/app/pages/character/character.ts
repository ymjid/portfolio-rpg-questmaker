import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharState } from '../../data/questmaker.data';
import { Data } from '../../services/data';
import { Notif } from '../../services/notif';

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

  characterForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    class: new FormControl('', { nonNullable: true, validators: Validators.required }),
    state: new FormControl(CharState.LOOKINGJOB, { nonNullable: true, validators: Validators.required }),
  })

  constructor() {
    effect(() => {
    this.characterForm.patchValue({
      name: this.dataService.hero().name,
      class: this.dataService.hero().class,
      state: this.dataService.hero().state,
    })
  })
  }

  onSubmit() {
    this.dataService.updateCharacter(this.characterForm.getRawValue())
    this.notifService.showSaved()
  }
}
