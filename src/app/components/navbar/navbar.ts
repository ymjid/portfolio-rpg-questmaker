import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Json } from '../../services/json';
import { tablerFile, tablerBook, tablerShield, tablerUser, tablerList } from '@ng-icons/tabler-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ tablerFile, tablerBook, tablerShield, tablerUser, tablerList})],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  jsonService = inject(Json)
}
