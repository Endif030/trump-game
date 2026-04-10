'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStoreV2';
import { ATTRIBUTE_OPTIONS, TOTAL_ATTRIBUTE_POINTS } from '../data/gameDataV2';
import TrumpAvatar from './TrumpAvatar';
import BackToHome from './BackToHome';

export default function CharacterCreationV2() {
  const { language, setAttributes } = useGameStore();
  const [attributes, setAttrs] = useState({
    mediaControl: 0,
    businessIntuition: 0,
    politicalConnections: 0,
    speechTalent: 0,
    secrecy: 0,
  });

  const usedPoints = Object.values(attributes).reduce((a, b) => a + b, 0);
  const remainingPoints = TOTAL_ATTRIBUTE_POINTS - usedPoints;

  const handleIncrement = (attrId: string) => {
    const currentValue = attributes[attrId as keyof typeof attributes];
    if (currentValue < 5 && remainingPoints > 0) {
      setAttrs(prev => ({ ...prev, [attrId]: currentValue + 1 }));
    }
  };

  const handleDecrement = (attrId: string) => {
    const currentValue = attributes[attrId as keyof typeof attributes];
    if (currentValue > 0) {
      setAttrs(prev => ({ ...prev, [attrId]: currentValue - 1 }));
    }
  };

  const handleConfirm = () => {
    const initialFundsBonus = remainingPoints * 200000;
    setAttributes(attributes, initialFundsBonus);
  };

  const getBuildDescription = () => {
    const maxAttr = Object.entries(attributes).sort((a, b) => b[1] - a[1])[0];
    if (maxAttr[1] < 3) return language === 'zh' ? '🎲 均衡发展型' : '🎲 Balanced Build';
    
    const descriptions: Record<string, { zh: string; en: string }> = {
      mediaControl: { zh: '📱 媒体操盘手', en: '📱 Media Manipulator' },
      businessIntuition: { zh: '💼 华尔街之狼', en: '💼 Wall Street Wolf' },
      politicalConnections: { zh: '🏛️ 国会山玩家', en: '🏛️ Capitol Hill Player' },
      speechTalent: { zh: '🎭 群众煽动者', en: '🎭 Crowd Instigator' },
      secrecy: { zh: '🔐 幕后操盘手', en: '🔐 Shadow Operator' },
    };
    
    return descriptions[maxAttr[0]]?.[language] || '';
  };

  return (
    <motion.div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80)' }}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Back to Home Button */}
      <BackToHome position="top-right" />
      
      <div className="relative z-10 max-w-4xl mx-auto p-4">
        {/* Header */}
        <motion.div className="text-center mb-6" initial={{ y: -20 }} animate={{ y: 0 }}>
          <TrumpAvatar size="lg" expression="neutral" className="mx-auto mb-4" />
          <h1 className="text-4xl font-black text-yellow-400 mb-2">{language === 'zh' ? '塑造你的总统' : 'Shape Your President'}</h1>
          <p className="text-white/70">{language === 'zh' ? '海湖庄园，就职前夜。分配你的政治资本。' : 'Mar-a-Lago, eve of inauguration. Allocate your political capital.'}</p>
        </motion.div>

        {/* Points Display */}
        <motion.div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 mb-6 text-center">
          <p className="text-red-900 font-bold text-lg">{language === 'zh' ? '可用政治资本' : 'Available Political Capital'}</p>
          <p className="text-5xl font-black text-red-900">{remainingPoints}</p>
          <p className="text-red-800 text-sm">/ {TOTAL_ATTRIBUTE_POINTS} pts</p>
        </motion.div>

        {/* Starting Funds Display */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6 text-center border border-white/20">
          <p className="text-white/70 text-sm mb-1">{language === 'zh' ? '启动资金 (剩余点数 × $20万)' : 'Starting Funds (Remaining × $200K)'}</p>
          <p className="text-3xl font-bold text-green-400">${(5000000 + remainingPoints * 200000).toLocaleString()}</p>
        </div>

        {/* Attribute Cards - 2x3 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {ATTRIBUTE_OPTIONS.map((attr, index) => {
            const value = attributes[attr.id as keyof typeof attributes];
            const canIncrease = value < 5 && remainingPoints > 0;
            const canDecrease = value > 0;
            
            return (
              <motion.div 
                key={attr.id} 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-center mb-3">
                  <span className="font-bold text-white text-lg">{attr.name[language]}</span>
                  <p className="text-white/60 text-xs mt-1">{attr.description[language]}</p>
                </div>
                
                {/* +/- Controls */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <button
                    onClick={() => handleDecrement(attr.id)}
                    disabled={!canDecrease}
                    className={`w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-all ${
                      canDecrease 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    −
                  </button>
                  
                  <span className={`text-3xl font-black w-12 text-center ${
                    value > 0 ? 'text-yellow-400' : 'text-white/40'
                  }`}>
                    {value}
                  </span>
                  
                  <button
                    onClick={() => handleIncrement(attr.id)}
                    disabled={!canIncrease}
                    className={`w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-all ${
                      canIncrease 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    +
                  </button>
                </div>
                
                {/* Progress Bar - Solid when has value */}
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      value > 0 ? 'bg-yellow-400' : 'bg-transparent'
                    }`} 
                    style={{ width: `${(value / 5) * 100}%` }} 
                  />
                </div>
                
                <p className="text-yellow-400 text-xs mt-2 text-center">{attr.effect[language]}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Build Type Indicator */}
        {usedPoints > 5 && (
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mb-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-white/80 text-sm mb-1">{language === 'zh' ? '检测到的游戏风格' : 'Detected Playstyle'}</p>
            <p className="text-2xl font-black text-white">{getBuildDescription()}</p>
          </motion.div>
        )}

        {/* Warning if points remain */}
        {remainingPoints > 0 && (
          <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 mb-6 text-center">
            <p className="text-yellow-300 text-sm">
              ⚠️ {language === 'zh' ? `还有 ${remainingPoints} 点未分配，将转化为启动资金` : `${remainingPoints} points unallocated, will convert to starting funds`}
            </p>
          </div>
        )}

        {/* Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={usedPoints === 0}
          className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
            usedPoints > 0
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 hover:shadow-lg'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
          whileHover={usedPoints > 0 ? { scale: 1.02 } : {}}
          whileTap={usedPoints > 0 ? { scale: 0.98 } : {}}
        >
          {language === 'zh' ? '开始我的总统生涯 🚀' : 'Start My Presidency 🚀'}
        </motion.button>
      </div>
    </motion.div>
  );
}
