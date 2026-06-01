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

export enum TagsType {
    HTML = "HTML",
    CSS = "CSS",
    JAVASCRIPT = "JavaScript",
    TYPESCRIPT = "TypeScript",
    ANGULAR = "Angular",
    SCSS = "SCSS",
    PHP = "PHP",
}

export enum ThemeType {
    SNAKE = "theme-snake",
    VIDEO = "theme-video",
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
    tags: TagsType[],
    subquests: SubQuest[],
    state: QuestStateType,
    preview?: string,
    theme?: ThemeType,
    images?: QuestImage[],
    code?: string,
}

export enum SkillType {
    HTML_CSS = "HTML/CSS",
    JAVASCRIPT = "Javascript",
    TYPESCRIPT = "TypeScript",
    ANGULAR = "Angular",
    SCSS = "SCSS",
    GIT = "Git"
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
    name: SkillType;
    rate: SkillRateType;
}

export const GearIcons = {
    VSCode: "assets/gear-icons/vscode_icon.svg",
    GitHub: "assets/gear-icons/github_icon.svg",
    GWD: "assets/gear-icons/gwd_icon.svg",
    Chrome: "assets/gear-icons/chrome_icon.svg",
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