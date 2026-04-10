'use client';

import { useGameStore } from '../store/gameStoreV2';
import IntroScreen from '../components/IntroScreen';
import CharacterCreationV2 from '../components/CharacterCreationV2';
import StoryScreenV2 from '../components/StoryScreenV2';
import ElectionScreen from '../components/ElectionScreen';
import EndingScreen from '../components/EndingScreen';

export default function Home() {
  const { currentScene } = useGameStore();

  return (
    <main className="min-h-screen">
      {currentScene === 'intro' && <IntroScreen />}
      {currentScene === 'character-creation' && <CharacterCreationV2 />}
      {currentScene === 'story' && <StoryScreenV2 />}
      {currentScene === 'election' && <ElectionScreen />}
      {currentScene === 'ending' && <EndingScreen />}
    </main>
  );
}
