'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStoreV2';
import { ENDINGS } from '../data/endingsV2';
import TrumpAvatar from './TrumpAvatar';

export default function EndingScreen() {
  const { language, endingType, assets, prestige, checkEnding, setEnding, resetGame } = useGameStore();

  useEffect(() => {
    if (!endingType) {
      const calculatedEnding = checkEnding();
      if (calculatedEnding) setEnding(calculatedEnding);
    }
  }, [endingType, checkEnding, setEnding]);

  if (!endingType) return null;

  const ending = ENDINGS.find(e => e.type === endingType);
  if (!ending) return null;

  const formatMoney = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(2)}T`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
  };

  const getExpression = () => {
    switch (endingType) {
      case 'greedy': return 'smug';
      case 'goodPresident': return 'triumphant';
      case 'arrested': return 'surprised';
      case 'impeached': return 'angry';
      case 'doubleFace': return 'smug';
      default: return 'neutral';
    }
  };

  return (
    <motion.div className={`min-h-screen bg-gradient-to-b ${ending.bgColor} p-4`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-8" initial={{ y: -30 }} animate={{ y: 0 }}>
          <div className="flex justify-center mb-4"><TrumpAvatar size="xl" expression={getExpression()} /></div>
          <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">{ending.title[language]}</h1>
          <p className="text-xl text-white/80 italic">{ending.subtitle[language]}</p>
        </motion.div>

        <motion.div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-white/60 text-sm">{language === 'zh' ? '最终资产' : 'Final Assets'}</p>
              <p className="text-3xl font-bold text-green-400">{formatMoney(assets)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">{language === 'zh' ? '最终威望' : 'Final Prestige'}</p>
              <p className="text-3xl font-bold text-blue-400">{prestige}%</p>
            </div>
          </div>
          <div className="text-center pt-4 border-t border-white/20">
            <p className="text-white/60 text-sm mb-1">{language === 'zh' ? '历史评价' : 'Historical Rating'}</p>
            <p className="text-4xl">{ending.rating}</p>
          </div>
        </motion.div>

        <motion.div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <p className="text-white text-lg leading-relaxed mb-4">{ending.description[language]}</p>
          <div className="bg-yellow-400/20 rounded-lg p-3 text-center">
            <p className="text-yellow-300 font-bold">{ending.achievement[language]}</p>
          </div>
        </motion.div>

        {/* 只保留再玩一次按钮 */}
        <motion.button 
          onClick={resetGame} 
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 font-bold py-4 rounded-xl text-xl"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {language === 'zh' ? '🔄 再玩一次' : '🔄 Play Again'}
        </motion.button>
      </div>
    </motion.div>
  );
}
