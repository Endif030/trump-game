export interface GameState {
  language: 'zh' | 'en';
  currentScene: 'intro' | 'character-creation' | 'story' | 'election' | 'ending';
  currentLevel: number;
  attributes: {
    mediaControl: number;
    businessIntuition: number;
    politicalConnections: number;
    speechTalent: number;
    secrecy: number;
  };
  assets: number;
  prestige: number;
  investigation: number;
  goodPresidentPoints: number;
  insiderTradingCount: number;
  discoveredCount: number;
  history: GameHistory[];
  choices: Record<string, string>;
  endingType: EndingType | null;
}

export interface GameHistory {
  level: number;
  levelName: string;
  choice: string;
  assetsChange: number;
  prestigeChange: number;
  investigationChange: number;
}

export type EndingType = 
  | 'greedy'
  | 'goodPresident'
  | 'arrested'
  | 'mediocre'
  | 'impeached'
  | 'doubleFace';

export interface AttributeOption {
  id: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  cost?: number;
  maxValue?: number;
  effect: { zh: string; en: string };
}

export interface StoryLevel {
  id: string;
  chapter: number;
  title: { zh: string; en: string };
  scene: { zh: string; en: string };
  backgroundImage?: string;
  background: { zh: string; en: string };
  options: StoryOption[];
}

export interface StoryOption {
  id: string;
  text: { zh: string; en: string };
  requirement?: {
    attribute?: keyof GameState['attributes'];
    minValue: number;
  };
  results: OptionResult;
}

export interface OptionResult {
  assetsChange: number;
  prestigeChange: number;
  investigationChange: number;
  goodPresidentPoint?: number;
  insiderTrading?: boolean;
  description: { zh: string; en: string };
}

export interface ElectionCheck {
  year: number;
  minPrestige: number;
  success: { zh: string; en: string };
  warning: { zh: string; en: string };
  failure: { zh: string; en: string };
}

export interface Ending {
  type: EndingType;
  title: { zh: string; en: string };
  subtitle: { zh: string; en: string };
  description: { zh: string; en: string };
  rating: string;
  achievement: { zh: string; en: string };
  backgroundImage?: string;
  shareTexts: { text: { zh: string; en: string }; meme: boolean }[];
  bgColor: string;
}

export const INITIAL_ASSETS = 5000000;
export const INITIAL_PRESTIGE = 50;
export const TARGET_ASSETS = 1000000000000;
export const TARGET_PRESTIGE = 80;
export const MAX_INVESTIGATION = 100;
