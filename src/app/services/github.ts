import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
   httpClient = inject(HttpClient)

  public getCommits(): Observable<any[]> {
    return this.httpClient.get<any[]>(`https://api.github.com/repos/ymjid/portfolio-rpg/commits`);
  }

  public getLatestRelease(): Observable<any> {
    return this.httpClient.get<any[]>(`https://api.github.com/repos/ymjid/portfolio-rpg/releases/latest`);
  }

  public checkIfOnline(): Observable<any>{
    return this.httpClient.head<any[]>(`https://ymjid.github.io/portfolio-rpg/`);
  }

  public getDataJson(): Observable<any> {
    return this.httpClient.get<any[]>(`https://raw.githubusercontent.com/ymjid/portfolio-rpg-data/main/data.json`);
  }

  getFileSha(path: string): Observable<any> {
  return this.httpClient.get(`https://api.github.com/repos/ymjid/portfolio-rpg-data/contents/${path}`)
 }
}