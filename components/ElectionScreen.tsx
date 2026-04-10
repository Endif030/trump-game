'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { ELECTION_CHECKS } from '../data/gameData';
import TrumpAvatar from './TrumpAvatar';

export default function ElectionScreen() {
  const { language, currentLevel, prestige, triggerElection, nextLevel, setEnding } = useGameStore();
  const electionIndex = currentLevel === 3 ? 0 : 1;
  const election = ELECTION_CHECKS[electionIndex];

  useEffect(() => { triggerElection(election.year); }, []);

  const getResult = () => {
    if (prestige >= election.minPrestige + 10) return 'success';
    if (prestige >= election.minPrestige) return 'warning';
    return 'failure';
  };

  const result = getResult();
  const resultText = election[result][language];

  const handleContinue = () => {
    if (result === 'failure' && electionIndex === 1) setEnding('impeached');
    else nextLevel();
  };

  const getExpression = () => result === 'success' ? 'happy' : result === 'warning' ? 'surprised' : 'angry';

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 text-center" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <motion.div className="inline-block bg-yellow-500 text-red-900 font-black text-2xl px-6 py-2 rounded-full mb-6">{election.year} {language === 'zh' ? '年中期选举' : 'Midterm Election'}</motion.div>
        <div className="flex justify-center mb-6"><TrumpAvatar size="xl" expression={getExpression()} /></div>
        <motion.div className="mb-6">
          <p className="text-white/70 mb-2">{language === 'zh' ? '当前民众支持率' : 'Current Approval Rating'}</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-5xl font-black text-blue-400">{prestige}%</div>
            <div className="text-white/50">{language === 'zh' ? '需要' : 'Need'} {election.minPrestige}%</div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 mt-4 overflow-hidden">
            <motion.div className={`h-full rounded-full ${result === 'success' ? 'bg-green-500' : result === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} initial={{ width: 0 }} animate={{ width: `${prestige}%` }} transition={{ duration: 1, delay: 0.5 }} />
          </div>
        </motion.div>
        <motion.div className={`text-xl font-bold mb-8 p-4 rounded-xl ${result === 'success' ? 'bg-green-500/30 text-green-300' : result === 'warning' ? 'bg-yellow-500/30 text-yellow-300' : 'bg-red-500/30 text-red-300'}`}>{resultText}</motion.div>
        
        {result === 'failure' && electionIndex === 1 && (
          <motion.div className="bg-red-600/30 border-2 border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-200">{language === 'zh' ? '连续两次中期选举失败，你的总统任期到此结束。' : 'Two consecutive midterm failures. Your presidency ends here.'}</p>
          </motion.div>
        )}
        
        <motion.button onClick={handleContinue} className="bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 font-bold text-xl px-8 py-3 rounded-full">{result === 'failure' && electionIndex === 1 ? (language === 'zh' ? '查看结局 📜' : 'View Ending 📜') : (language === 'zh' ? '继续执政 ➔' : 'Continue ➔')}</motion.button>
      </motion.div>
    </motion.div>
  );
}
