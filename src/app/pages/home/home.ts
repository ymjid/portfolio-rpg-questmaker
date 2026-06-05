import { Component, inject, OnInit } from '@angular/core';
import { GithubService } from '../../services/github';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  githubService = inject(GithubService)
  isOnline = false
  commits: any[] = []
  release: any = null

  ngOnInit() {
    this.githubService.checkIfOnline().subscribe({
      next: () => this.isOnline = true,
      error: () => this.isOnline = false
    });
    this.githubService.getCommits().subscribe(data => {
      this.commits = data;
      console.log(this.commits)
    });
    this.githubService.getLatestRelease().subscribe(data => {
      this.release = data;
      console.log(this.release)
    });
  }
}
