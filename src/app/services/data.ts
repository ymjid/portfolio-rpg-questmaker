import { Injectable, signal, WritableSignal } from '@angular/core';
import { Character, CharState, Gear, Quest, Skill, Theme } from "../data/questmaker.data"


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

  gears: WritableSignal<Gear[]> = signal([])

  tags: WritableSignal<string[]> = signal([])

  themes: WritableSignal<Theme[]> = signal([])

  isLoaded = signal(false)

  setLoaded() {
    this.isLoaded.set(true)
  }

  updateCharacter(editHero: Character) {
        this.hero.set(editHero);
  }

  setSkills(skills: Skill[]) {
    this.skills.set(skills);
  }

  editGear(editGear: Gear) {
    this.gears.update(current => current.map(gear => {
      if (gear.slot === editGear.slot) {
        return editGear
      }
      return gear
    }
  ))
  }

  setGears(gears: Gear[]) {
    this.gears.set(gears);
  }

  setQuests(quests: Quest[]) {
    this.quests.set(quests)
  }

  setTags(tags: string[])  {
    this.tags.set(tags)
  }

  setThemes(themes: Theme[])  {
    this.themes.set(themes)
  }
}
