'use client';

import { useGameStore } from '../store/gameStore';
import IntroScreen from '../components/IntroScreen';
import CharacterCreation from '../components/CharacterCreation';
import StoryScreen from '../components/StoryScreen';
import ElectionScreen from '../components/ElectionScreen';
import EndingScreen from '../components/EndingScreen';

export default function Home() {
  const { currentScene } = useGameStore();

  return (
    <main className="min-h-screen">
      {currentScene === 'intro' && <IntroScreen />}
      {currentScene === 'character-creation' && <CharacterCreation />}
      {currentScene === 'story' && <StoryScreen />}
      {currentScene === 'election' && <ElectionScreen />}
      {currentScene === 'ending' && <EndingScreen />}
    </main>
  );
}
