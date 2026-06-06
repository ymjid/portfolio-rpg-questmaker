import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Notif {
    saved = signal(false)

    showSaved() {
      this.saved.set(true)
      setTimeout(() => this.saved.set(false), 2000)
    }
}
