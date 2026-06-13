import { Component, inject } from '@angular/core';
import { Json } from '../../services/json';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-token-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './token-modal.html',
  styleUrl: './token-modal.scss',
})
export class TokenModal {
    jsonService = inject(Json)
    tokenForm = new FormGroup({
      token: new FormControl('')
    })

    onConfirm() {
      localStorage.setItem('githubToken', this.tokenForm.controls.token.value ?? '')
      this.jsonService.pushToGithub()
      this.jsonService.closeModal()
    }

    onCancel() {
      this.jsonService.closeModal()
    }
}
