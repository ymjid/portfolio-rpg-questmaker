import { Component, effect, inject } from '@angular/core';
import { GithubService } from '../../services/github';
import { DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DatePipe, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home  {
  githubService = inject(GithubService)
  isOnline = false
  commits: any[] = []
  release: any = null

  constructor() {
    effect(() => {
    this.githubService.checkIfOnline().subscribe({
      next: () => this.isOnline = true,
      error: () => this.isOnline = false
    });
    this.githubService.getCommits().subscribe(data => {
      this.commits = data;
    });
    this.githubService.getLatestRelease().subscribe(data => {
      this.release = data;
    });
  })
  }
}
