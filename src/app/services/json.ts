import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Data } from './data';
import { GithubService } from './github';
import { Notif } from './notif';

@Injectable({
  providedIn: 'root',
})
export class Json {
  dataService = inject(Data)
  githubService = inject(GithubService)
  notifService = inject(Notif)
  isModalOpen = signal(false)
  token: WritableSignal<string | null> = signal(null)
  remoteJson = signal('')
  pendingImages = signal<{fileName: string, file: File}[]>([])

  buildJson() {
    return {
      "character": this.dataService.hero(),
      "skills": this.dataService.skills(),
      "quests": this.dataService.quests(),
      "gear": this.dataService.gears(),
      "tags": this.dataService.tags(),
      "themes": this.dataService.themes()
    }
  }

  downloadJson() {
    const json = this.buildJson();
    const json_string = JSON.stringify(json, null, 2)
    const blob = new Blob([json_string], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  async pushToGithub() {
    if (localStorage.getItem('githubToken')) {
      this.token.set(localStorage.getItem('githubToken'))
      this.githubService.getDataJson().subscribe(async remoteData => {
          const localJson = JSON.stringify(this.buildJson())
          const remoteJson = JSON.stringify(remoteData)
  
          if (localJson === remoteJson && this.pendingImages().length > 0) {
          this.notifService.showChanges()
          return
        }
        this.notifService.showUploading()
        await Promise.all(this.pendingImages().map(async ({fileName, file}) => {
               this.uploadImage(fileName, file)
        }))
        this.notifService.hideUploading()
        this.pendingImages.set([])
      this.githubService.getFileSha("data.json").subscribe({
        next: (data) => {
          const sha = data.sha
          const url ="https://api.github.com/repos/ymjid/portfolio-rpg-data/contents/data.json"
          const body = {
            message: `update data.json - ${new Date().toLocaleDateString('en-EN')}`,
            content: btoa(unescape(encodeURIComponent(JSON.stringify(this.buildJson())))),
            sha: sha,
          }
          const headers = { Authorization: `Bearer ${this.token()}` }
          this.githubService.httpClient.put(url, body, {headers}).subscribe({
              next: () => {
                this.notifService.showSaved()
              },
              error: (err) => {
                if (err.status === 401) {
                  localStorage.removeItem('githubToken')
                  this.token.set(null)
                  this.openModal()
                }
              }
            }
          )
        },
        error: (err) => {
          if (err.status === 401) {
              localStorage.removeItem('githubToken')
              this.token.set(null)
              this.openModal()
        }
  }
})
})
    } else {
      this.openModal()
      return
    }
  }

openModal() {
  this.isModalOpen.set(true)
}

closeModal() {
  this.isModalOpen.set(false)
}

setRemoteJson(data: any) {
  this.remoteJson.set(JSON.stringify(data))
}

hasChanges(): boolean {
  return JSON.stringify(this.buildJson()) !== this.remoteJson() || this.pendingImages().length > 0
}

addPendingImage(fileName: string, file: File) {
  this.pendingImages.update(current => [...current, {fileName, file}])
}

fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
  })
}

async uploadImage(fileName: string, file: File): Promise<void> {
   this.githubService.getFileSha(`assets/${fileName}`).subscribe({
        next: async (data) => {
          const sha = data.sha
          const url = `https://api.github.com/repos/ymjid/portfolio-rpg-data/contents/assets/${fileName}`
          const body = {
            message: `upload ${fileName} - ${new Date().toLocaleDateString('en-EN')}`,
            content: await this.fileToBase64(file),
            sha: sha,
          }
          const headers = { Authorization: `Bearer ${this.token()}` }
          this.githubService.httpClient.put(url, body, {headers}).subscribe({
              next: () => {
                this.notifService.showSaved()
              },
              error: (err) => {
                if (err.status === 401) {
                }
              }
            }
          )
        },
        error: async (err) => {
          if (err.status === 404) {
            const url = `https://api.github.com/repos/ymjid/portfolio-rpg-data/contents/assets/${fileName}`
            const body = {
                message: `upload ${fileName}`,
                content: await this.fileToBase64(file),
            }
            const headers = { Authorization: `Bearer ${this.token()}` }
            this.githubService.httpClient.put(url, body, { headers }).subscribe()
        }
  }
})
}
}
