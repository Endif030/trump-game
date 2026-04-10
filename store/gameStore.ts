import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, GameHistory, EndingType, INITIAL_ASSETS, INITIAL_PRESTIGE } from '../types/game';

interface GameStore extends GameState {
  setLanguage: (lang: 'zh' | 'en') => void;
  startGame: () => void;
  setAttributes: (attributes: GameState['attributes'], initialFundsBonus: number) => void;
  makeChoice: (levelId: string, optionId: string, result: any) => void;
  nextLevel: () => void;
  triggerElection: (year: number) => void;
  checkEnding: () => EndingType | null;
  setEnding: (ending: EndingType) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  language: 'zh',
  currentScene: 'intro',
  currentLevel: 0,
  attributes: { mediaControl: 0, businessIntuition: 0, politicalConnections: 0, speechTalent: 0, secrecy: 0 },
  assets: INITIAL_ASSETS,
  prestige: INITIAL_PRESTIGE,
  investigation: 0,
  goodPresidentPoints: 0,
  insiderTradingCount: 0,
  discoveredCount: 0,
  history: [],
  choices: {},
  endingType: null,
};

export const useGameStore = create<GameStore>()(persist((set, get) => ({
  ...initialState,
  setLanguage: (lang) => set({ language: lang }),
  startGame: () => set({ currentScene: 'character-creation', currentLevel: 0 }),
  setAttributes: (attributes, initialFundsBonus) => set({
    attributes, assets: INITIAL_ASSETS + initialFundsBonus, currentScene: 'story', currentLevel: 0
  }),
  makeChoice: (levelId, optionId, result) => set((state) => {
    const newAssets = Math.max(0, state.assets + result.assetsChange);
    const newPrestige = Math.min(100, Math.max(0, state.prestige + result.prestigeChange));
    const newInvestigation = Math.min(100, Math.max(0, state.investigation + result.investigationChange));
    let newDiscoveredCount = state.discoveredCount;
    if (result.insiderTrading && Math.random() * 100 < (result.investigationChange + state.investigation * 0.5)) {
      newDiscoveredCount++;
    }
    return {
      assets: newAssets, prestige: newPrestige, investigation: newInvestigation,
      goodPresidentPoints: state.goodPresidentPoints + (result.goodPresidentPoint || 0),
      insiderTradingCount: state.insiderTradingCount + (result.insiderTrading ? 1 : 0),
      discoveredCount: newDiscoveredCount,
      history: [...state.history, { level: state.currentLevel, levelName: levelId, choice: optionId, assetsChange: result.assetsChange, prestigeChange: result.prestigeChange, investigationChange: result.investigationChange }],
      choices: { ...state.choices, [levelId]: optionId },
    };
  }),
  nextLevel: () => set((state) => {
    const nextLevel = state.currentLevel + 1;
    if (nextLevel === 3 || nextLevel === 6) return { currentScene: 'election', currentLevel: nextLevel };
    if (nextLevel >= 7) return { currentScene: 'ending', currentLevel: nextLevel };
    return { currentLevel: nextLevel };
  }),
  triggerElection: (year) => set({ currentScene: 'story' }),
  checkEnding: () => {
    const state = get();
    if (state.discoveredCount >= 3 || state.investigation >= 100) return 'arrested';
    if (state.prestige <= 0) return 'impeached';
    if (state.assets >= 1000000000000 && state.goodPresidentPoints <= 2) return 'greedy';
    if (state.prestige >= 80 && state.goodPresidentPoints >= 4 && state.insiderTradingCount === 0) return 'goodPresident';
    if (state.assets >= 500000000000 && state.goodPresidentPoints >= 2 && state.discoveredCount === 0) return 'doubleFace';
    if (state.assets < 500000000 && state.prestige < 60) return 'mediocre';
    return state.assets >= 100000000000 ? 'greedy' : 'mediocre';
  },
  setEnding: (ending) => set({ endingType: ending, currentScene: 'ending' }),
  resetGame: () => set(initialState),
}), { name: 'trump-game-storage' }));
