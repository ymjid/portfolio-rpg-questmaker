import { Routes } from '@angular/router';
import { Character } from './pages/character/character';
import { Quests } from './pages/quests/quests';
import { Skills } from './pages/skills/skills';
import { Gears } from './pages/gears/gears';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '',  component: Home},
  { path: 'character', component: Character },
  { path: 'quests', component: Quests },
  { path: 'skills', component: Skills },
  { path: 'gears', component: Gears },
];

