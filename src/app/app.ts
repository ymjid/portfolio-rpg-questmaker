import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Notif } from './services/notif';
import { GithubService } from './services/github';
import { Data } from './services/data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('portfolio-rpg-questmaker');
  notifService = inject(Notif)
  githubService = inject(GithubService)
  dataService = inject(Data)

  @HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  const cursor = document.querySelector('.cursor') as HTMLElement
  cursor.style.transform = `translate(${event.clientX - 5}px, ${event.clientY - 5}px)`
}

ngOnInit() {
  this.githubService.getDataJson().subscribe(data => {
      if (data.character) {
        this.dataService.updateCharacter(data.character)
      }
      this.dataService.setGears(data.gear)
      this.dataService.setQuests(data.quests)
      this.dataService.setSkills(data.skills)
      this.dataService.setTags(data.tags)
      this.dataService.setThemes(data.themes)
    });
}
}
