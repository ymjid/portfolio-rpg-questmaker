import { Injectable, signal, WritableSignal } from '@angular/core';
import { Character, CharState, Quest, Rarety, Skill, SkillType, TagsType } from "../data/questmaker.data"
import { Gear } from '../pages/gear/gear';

@Injectable({
  providedIn: 'root',
})
export class Data {
  hero: WritableSignal<Character> = signal({
    name: "",
    class: "",
    state: CharState.LOOKINGJOB,
  })

  skills: WritableSignal<Skill[]> = signal([])

  quests: WritableSignal<Quest[]> = signal([])

  gear: WritableSignal<Gear[]> = signal([])
}
