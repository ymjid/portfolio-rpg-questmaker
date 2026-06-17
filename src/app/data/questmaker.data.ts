export enum CharState {
    LOOKINGJOB = "Looking for job",
    WORKING = "Working",
}

export interface Character {
    name: string;
    class: string;
    img?: string;
    github?: string;
    linkedin?: string;
    state: CharState;
}

export type QuestStateType = {
    text: string;
    icon:  string;
}

export const QuestState = {
    PROGRESS: {
        text: "progress",
        icon:  "tablerProgress",
    },
    COMPLETED: {
        text: "completed",
        icon: "tablerCheck",
    },
    FAILED: {
        text: "failed",
        icon: "tablerSkull",
    },
    LOCKED: {
        text: "locked",
        icon: "tablerLock",
    },
}

export type QuestImage = {
    url: string,
    alt: string,
}

export interface SubQuest {
    name: string,
    state: QuestStateType
}

export interface Quest {
    id: string,
    name: string,
    description: string, 
    release: string
    tags: string[],
    subquests: SubQuest[],
    state: QuestStateType,
    preview?: string,
    theme?: string,
    images?: QuestImage[],
    code?: string,
}

export const SkillRate = {
    BASIC: { name: "Basic Knowledge", value: 1 },
    INTERMEDIATE: { name: "Intermediate", value: 2 },
    EASE: { name: "At ease", value: 3 },
}
export type SkillRateType = {
    name: string,
    value: number,
}

export interface Skill {
    name: string;
    rate: SkillRateType;
}

export enum Rarety  {
    COMMON = "common",
    RARE = "rare",
    EPIC = "epic",
    LEGENDARY = "legendary"
}

export interface Gear {
    name: string,
    logo: string,
    rarety: Rarety,
    description: string,
    slot: number,
    width: number,
    height: number,
}

export type ThemeVariableType = {
  "--portal-primary": string;
  "--portal-bg": string;
  "--portal-text": string;
  "--portal-card": string;
  "--portal-border": string;
}
export interface Theme {
    name: string,
    variables: ThemeVariableType
}