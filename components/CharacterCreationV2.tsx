'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStoreV2';
import { ATTRIBUTE_OPTIONS, TOTAL_ATTRIBUTE_POINTS } from '../data/gameDataV2';
import TrumpAvatar from './TrumpAvatar';
import BackToHome from './BackToHome';

// 根据当前值计算实际效果描述
function getEffectDescription(attr: any, value: number, language: 'zh' | 'en') {
  if (value === 0) {
    return language === 'zh' ? '无加成' : 'No bonus';
  }
  
  // 政治人脉特殊处理
  if (attr.id === 'politicalConnections') {
    return attr.effect[language];
  }
  
  // 其他属性：根据数值计算总效果
  const baseEffect = attr.effect[language];
  const match = baseEffect.match(/(\d+)%/);
  if (match) {
    const perPoint = parseInt(match[1]);
    const totalEffect = perPoint * value;
    
    if (language === 'zh') {
      // 根据属性类型返回不同的描述
      if (attr.id === 'mediaControl') {
        return `增加消息传播效果 ${totalEffect}%`;
      } else if (attr.id === 'businessIntuition') {
        return `增加投资成功率 ${totalEffect}%`;
      } else if (attr.id === 'speechTalent') {
        return `增加民众支持变化 ${totalEffect}%`;
      } else if (attr.id === 'secrecy') {
        return `降低被发现概率 ${totalEffect}%`;
      }
      return `增加 ${totalEffect}%`;
    } else {
      return `+${totalEffect}% effect`;
    }
  }
  return baseEffect;
}

export default function CharacterCreationV2() {
  const { language, setAttributes } = useGameStore();
  const [attributes, setAttrs] = useState({
    mediaControl: 0,
    businessIntuition: 0,
    politicalConnections: 0,
    speechTalent: 0,
    secrecy: 0,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const usedPoints = Object.entries(attributes).reduce((total, [id, value]) => {
    if (id === 'politicalConnections') {
      return total + (value > 0 ? 5 : 0);
    }
    return total + value;
  }, 0);
  
  const remainingPoints = TOTAL_ATTRIBUTE_POINTS - usedPoints;

  const handleIncrement = (attrId: string, isBinary: boolean) => {
    const currentValue = attributes[attrId as keyof typeof attributes];
    
    if (isBinary) {
      if (currentValue === 0 && remainingPoints >= 5) {
        setAttrs(prev => ({ ...prev, [attrId]: 5 }));
      }
    } else {
      if (currentValue < 5 && remainingPoints > 0) {
        setAttrs(prev => ({ ...prev, [attrId]: currentValue + 1 }));
      }
    }
  };

  const handleDecrement = (attrId: string, isBinary: boolean) => {
    const currentValue = attributes[attrId as keyof typeof attributes];
    
    if (isBinary) {
      if (currentValue > 0) {
        setAttrs(prev => ({ ...prev, [attrId]: 0 }));
      }
    } else {
      if (currentValue > 0) {
        setAttrs(prev => ({ ...prev, [attrId]: currentValue - 1 }));
      }
    }
  };

  const handleConfirm = () => {
    const initialFundsBonus = remainingPoints * 200000;
    setAttributes(attributes, initialFundsBonus);
  };

  const getBuildDescription = () => {
    const maxAttr = Object.entries(attributes).sort((a, b) => b[1] - a[1])[0];
    if (maxAttr[1] < 3 && maxAttr[0] !== 'politicalConnections') return language === 'zh' ? '🎲 均衡发展型' : '🎲 Balanced Build';
    
    const descriptions: Record<string, { zh: string; en: string }> = {
      mediaControl: { zh: '📱 媒体操盘手', en: '📱 Media Manipulator' },
      businessIntuition: { zh: '💼 华尔街之狼', en: '💼 Wall Street Wolf' },
      politicalConnections: { zh: '🏛️ 国会山玩家', en: '🏛️ Capitol Hill Player' },
      speechTalent: { zh: '🎭 群众煽动者', en: '🎭 Crowd Instigator' },
      secrecy: { zh: '🔐 幕后操盘手', en: '🔐 Shadow Operator' },
    };
    
    return descriptions[maxAttr[0]]?.[language] || '';
  };

  const getSelectedAttributes = () => {
    return ATTRIBUTE_OPTIONS.filter(attr => attributes[attr.id as keyof typeof attributes] > 0)
      .map(attr => ({
        name: attr.name[language],
        value: attributes[attr.id as keyof typeof attributes],
        effect: getEffectDescription(attr, attributes[attr.id as keyof typeof attributes], language)
      }));
  };

  // 分离政治人脉
  const politicalAttr = ATTRIBUTE_OPTIONS.find(a => a.id === 'politicalConnections');
  const otherAttrs = ATTRIBUTE_OPTIONS.filter(a => a.id !== 'politicalConnections');
  const isPoliticalUnlocked = attributes.politicalConnections > 0;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <BackToHome position="top-right" />
      
      <div className="relative z-10 max-w-5xl mx-auto p-4">
        {/* Header */}
        <motion.div className="text-center mb-4" initial={{ y: -20 }} animate={{ y: 0 }}>
          <TrumpAvatar size="lg" expression="neutral" className="mx-auto mb-4" />
          <h1 className="text-4xl font-black text-yellow-400 mb-2">{language === 'zh' ? '塑造你的总统' : 'Shape Your President'}</h1>
          <p className="text-white/70">{language === 'zh' ? '海湖庄园，就职前夜。分配你的政治资本。' : 'Mar-a-Lago, eve of inauguration. Allocate your political capital.'}</p>
        </motion.div>

        {/* Starting Funds */}
        <motion.div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 text-center border border-white/20"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/70 text-sm mb-1">{language === 'zh' ? '启动资金 (剩余点数 × $20万)' : 'Starting Funds (Remaining × $200K)'}</p>
          <p className="text-3xl font-bold text-green-400">${(5000000 + remainingPoints * 200000).toLocaleString()}</p>
        </motion.div>

        {/* Points Display */}
        <motion.div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 mb-6 text-center">
          <p className="text-red-900 font-bold text-lg">{language === 'zh' ? '可用政治资本' : 'Available Political Capital'}</p>
          <p className="text-5xl font-black text-red-900">{remainingPoints}</p>
          <p className="text-red-800 text-sm">/ {TOTAL_ATTRIBUTE_POINTS} pts</p>
        </motion.div>

        {/* Attribute Grid - Left 2x2, Right political spans 2 rows */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          
          {/* Left: 4 attributes in 2x2 */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {otherAttrs.map((attr, index) => {
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
                  <div className="text-center mb-2">
                    <span className="font-bold text-white text-lg">{attr.name[language]}</span>
                    <p className="text-white/60 text-xs mt-1">{attr.description[language]}</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <button
                      onClick={() => handleDecrement(attr.id, false)}
                      disabled={!canDecrease}
                      className={`w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-all ${
                        canDecrease 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      −
                    </button>
                    
                    <span className={`text-3xl font-black w-12 text-center ${value > 0 ? 'text-yellow-400' : 'text-white/40'}`}>
                      {value}
                    </span>
                    
                    <button
                      onClick={() => handleIncrement(attr.id, false)}
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
                  
                  <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${value > 0 ? 'bg-yellow-400' : 'bg-transparent'}`} 
                      style={{ width: `${(value / 5) * 100}%` }} 
                    />
                  </div>
                  
                  <p className={`text-xs mt-1 text-center font-semibold ${value > 0 ? 'text-yellow-400' : 'text-white/40'}`}>
                    {getEffectDescription(attr, value, language)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Political Connections - spans 2 rows */}
          {politicalAttr && (
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex flex-col justify-center self-stretch"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3 }}
            >
              <div className="text-center mb-3">
                <span className="font-bold text-white text-lg">{politicalAttr.name[language]}</span>
                <p className="text-white/60 text-xs mt-1">{politicalAttr.description[language]}</p>
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-3">
                <button
                  onClick={() => handleDecrement('politicalConnections', true)}
                  disabled={!isPoliticalUnlocked}
                  className={`w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-all ${
                    isPoliticalUnlocked 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  −
                </button>
                
                <span className={`text-3xl font-black w-12 text-center ${isPoliticalUnlocked ? 'text-yellow-400' : 'text-white/40'}`}>
                  {isPoliticalUnlocked ? '✓' : '−'}
                </span>
                
                <button
                  onClick={() => handleIncrement('politicalConnections', true)}
                  disabled={isPoliticalUnlocked || remainingPoints < 5}
                  className={`w-10 h-10 rounded-full font-bold text-xl flex items-center justify-center transition-all ${
                    !isPoliticalUnlocked && remainingPoints >= 5
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  +
                </button>
              </div>
              
              <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all ${isPoliticalUnlocked ? 'bg-yellow-400' : 'bg-transparent'}`} 
                  style={{ width: isPoliticalUnlocked ? '100%' : '0%' }} 
                />
              </div>
              
              <p className={`text-sm text-center font-semibold mb-2 ${isPoliticalUnlocked ? 'text-yellow-400' : 'text-white/40'}`}>
                {isPoliticalUnlocked ? politicalAttr.effect[language] : (language === 'zh' ? '未解锁' : 'Locked')}
              </p>
              
              <p className="text-white/50 text-xs text-center">
                {language === 'zh' ? '(消耗 5 点)' : '(Costs 5 points)'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Build Type Indicator */}
        {usedPoints > 3 && (
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mb-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-white/80 text-sm mb-1">{language === 'zh' ? '检测到的游戏风格' : 'Detected Playstyle'}</p>
            <p className="text-2xl font-black text-white">{getBuildDescription()}</p>
          </motion.div>
        )}

        {/* Confirm Button */}
        <motion.button
          onClick={() => setShowConfirm(true)}
          disabled={usedPoints === 0}
          className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
            usedPoints > 0
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 hover:shadow-lg'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
          whileHover={usedPoints > 0 ? { scale: 1.02 } : {}}
          whileTap={usedPoints > 0 ? { scale: 0.98 } : {}}
        >
          {language === 'zh' ? '确认并开始游戏 🚀' : 'Confirm & Start 🚀'}
        </motion.button>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full border-2 border-yellow-400/50"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                {language === 'zh' ? '确认你的选择' : 'Confirm Your Selection'}
              </h3>
              
              <div className="space-y-3 mb-6">
                {getSelectedAttributes().map((attr, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">{attr.name}</span>
                      <span className="text-yellow-400 font-bold">
                        {attr.name.includes('政治') ? (attr.value > 0 ? '已解锁' : '未解锁') : `${attr.value} / 5`}
                      </span>
                    </div>
                    <p className="text-yellow-400/80 text-sm mt-1">{attr.effect}</p>
                  </div>
                ))}
                
                {remainingPoints > 0 && (
                  <div className="bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                    <p className="text-green-400 text-sm">
                      {language === 'zh' 
                        ? `剩余 ${remainingPoints} 点转化为启动资金: $${(remainingPoints * 200000).toLocaleString()}` 
                        : `Remaining ${remainingPoints} points converted: $${(remainingPoints * 200000).toLocaleString()}`}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-white/20 text-white font-bold hover:bg-white/30"
                >
                  {language === 'zh' ? '返回修改' : 'Go Back'}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 font-bold"
                >
                  {language === 'zh' ? '确定开始 🚀' : 'Start Game 🚀'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
