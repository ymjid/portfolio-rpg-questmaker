import { inject, Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root',
})
export class Json {
  dataService = inject(Data)

  buildJson() {
    return {
      "character": this.dataService.hero(),
      "skills": this.dataService.skills(),
      "quests": this.dataService.quests(),
      "gear": this.dataService.gears()
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
}
