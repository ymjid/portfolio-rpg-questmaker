import { Injectable, signal, WritableSignal } from '@angular/core';
import { Character, CharState, Gear, Quest, Skill, SkillType, Theme } from "../data/questmaker.data"


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

  addSkill(skill: Skill) {
    this.skills.update(current => [...current, skill])
  }

  removeSkill(name: SkillType) {
    this.skills.update(current => current.filter(skill => skill.name !== name))
  }

  editSkill(editSkill: Skill) {
    this.skills.update(current => current.map(skill => {
      if (skill.name === editSkill.name) {
        return editSkill
      }
      return skill
    }
  ))
  }

  setSkills(skills: Skill[]) {
    this.skills.set(skills);
  }

  addQuest(quest: Quest) {
    this.quests.update(current => [...current, quest])
  }

  removeQuest(id: string) {
    this.quests.update(current => current.filter(quest => quest.id !== id))
  }

  editQuest(editQuest: Quest) {
    this.quests.update(current => current.map(quest => {
      if (quest.id === editQuest.id) {
        return editQuest
      }
      return quest
    }
  ))
  }

  addGear(gear: Gear) {
    this.gears.update(current => [...current, gear])
  }

  removeGear(slot: number) {
    this.gears.update(current => current.filter(gear => gear.slot !== slot))
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
