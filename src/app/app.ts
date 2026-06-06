import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Notif } from './services/notif';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio-rpg-questmaker');
  notifService = inject(Notif)

  @HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  const cursor = document.querySelector('.cursor') as HTMLElement
  cursor.style.transform = `translate(${event.clientX - 5}px, ${event.clientY - 5}px)`
}
}
