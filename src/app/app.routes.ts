import { Routes } from '@angular/router';
import { Character } from './pages/character/character';
import { Quests } from './pages/quests/quests';
import { Skills } from './pages/skills/skills';
import { Gear } from './pages/gear/gear';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '',  component: Home},
  { path: 'character', component: Character },
  { path: 'quests', component: Quests },
  { path: 'skills', component: Skills },
  { path: 'gear', component: Gear },
];

