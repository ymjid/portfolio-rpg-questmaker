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

    noChanges = signal(false)

    showChanges() {
      this.noChanges.set(true)
      setTimeout(() => this.noChanges.set(false), 2000)
    }

isUploading = signal(false)

showUploading() {
  this.isUploading.set(true)
}

hideUploading() {
  this.isUploading.set(false)
}
}
