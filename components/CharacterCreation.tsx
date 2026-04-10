'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { ATTRIBUTE_OPTIONS } from '../data/gameData';
import TrumpAvatar from './TrumpAvatar';

const TOTAL_POINTS = 100;
const INITIAL_FUNDS_BONUS = 3000000;

export default function CharacterCreation() {
  const { language, setAttributes } = useGameStore();
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, number>>({});
  
  const usedPoints = Object.values(selectedAttrs).reduce((a, b) => a + b, 0);
  const remainingPoints = TOTAL_POINTS - usedPoints;
  const initialFundsBonus = (selectedAttrs['initialFunds'] || 0) * (INITIAL_FUNDS_BONUS / (ATTRIBUTE_OPTIONS.find(a => a.id === 'initialFunds')?.cost || 15));

  const toggleAttribute = (attrId: string, cost: number) => {
    setSelectedAttrs(prev => {
      if (prev[attrId]) { const { [attrId]: _, ...rest } = prev; return rest; }
      if (remainingPoints >= cost) return { ...prev, [attrId]: cost };
      return prev;
    });
  };

  const handleConfirm = () => {
    const attributes = {
      mediaControl: selectedAttrs['mediaControl'] ? 20 : 0,
      businessIntuition: selectedAttrs['businessIntuition'] ? 25 : 0,
      politicalConnections: selectedAttrs['politicalConnections'] ? 20 : 0,
      speechTalent: selectedAttrs['speechTalent'] ? 15 : 0,
      secrecy: selectedAttrs['secrecy'] ? 20 : 0,
    };
    setAttributes(attributes, initialFundsBonus);
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-blue-900 via-slate-900 to-blue-900 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-8" initial={{ y: -20 }} animate={{ y: 0 }}>
          <TrumpAvatar size="lg" expression="neutral" className="mx-auto mb-4" />
          <h1 className="text-4xl font-black text-yellow-400 mb-2">{language === 'zh' ? '总统的底色' : 'The President\'s Colors'}</h1>
          <p className="text-white/70">{language === 'zh' ? '海湖庄园，就职前夜。' : 'Mar-a-Lago, eve of inauguration.'}</p>
        </motion.div>

        <motion.div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 mb-6 text-center">
          <p className="text-red-900 font-bold text-lg">{language === 'zh' ? '可用政治资本' : 'Available Points'}</p>
          <p className="text-5xl font-black text-red-900">{remainingPoints}</p>
        </motion.div>

        <div className="bg-white/10 rounded-lg p-4 mb-6 text-center">
          <p className="text-white/70 text-sm mb-1">{language === 'zh' ? '启动资金' : 'Starting Funds'}</p>
          <p className="text-3xl font-bold text-green-400">${(5000000 + initialFundsBonus).toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {ATTRIBUTE_OPTIONS.map((attr, index) => {
            const isSelected = !!selectedAttrs[attr.id];
            const canAfford = remainingPoints >= (attr.cost || 0) || isSelected;
            return (
              <motion.button key={attr.id} onClick={() => toggleAttribute(attr.id, attr.cost || 0)} disabled={!canAfford}
                className={`p-4 rounded-xl border-2 text-left ${isSelected ? 'bg-yellow-400/20 border-yellow-400' : canAfford ? 'bg-white/5 border-white/20' : 'bg-white/5 border-white/10 opacity-50'}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-white">{attr.name[language]}</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-bold ${isSelected ? 'bg-yellow-400 text-red-900' : 'bg-white/20 text-white'}`}>{attr.cost || 0} pts</span>
                </div>
                <p className="text-white/60 text-sm mb-2">{attr.description[language]}</p>
                <p className="text-yellow-400 text-xs font-semibold">{attr.effect[language]}</p>
              </motion.button>
            );
          })}
        </div>

        <motion.button onClick={handleConfirm} disabled={Object.keys(selectedAttrs).length === 0}
          className={`w-full py-4 rounded-xl font-bold text-xl ${Object.keys(selectedAttrs).length > 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900' : 'bg-white/10 text-white/40'}`}
        >
          {language === 'zh' ? '开始我的总统生涯 🚀' : 'Start My Presidency 🚀'}
        </motion.button>
      </div>
    </motion.div>
  );
}
