'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { STORY_LEVELS } from '../data/gameData';
import TrumpAvatar from './TrumpAvatar';

export default function StoryScreen() {
  const { language, currentLevel, assets, prestige, investigation, attributes, makeChoice, nextLevel } = useGameStore();
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const level = STORY_LEVELS[currentLevel];
  if (!level) return null;

  const handleChoice = (option: any) => {
    if (option.requirement) {
      const attrValue = attributes[option.requirement.attribute as keyof typeof attributes];
      if (attrValue < option.requirement.minValue) return;
    }
    const result = option.results;
    makeChoice(level.id, option.id, result);
    setLastResult({ ...result, description: result.description[language] });
    setShowResult(true);
  };

  const handleContinue = () => { setShowResult(false); nextLevel(); };

  const formatMoney = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(2)}T`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div className="grid grid-cols-3 gap-4 mb-6" initial={{ y: -20 }} animate={{ y: 0 }}>
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-4 text-center">
            <p className="text-green-200 text-xs mb-1">{language === 'zh' ? '资产' : 'Assets'}</p>
            <p className="text-white font-bold text-lg">{formatMoney(assets)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 text-center">
            <p className="text-blue-200 text-xs mb-1">{language === 'zh' ? '威望' : 'Prestige'}</p>
            <p className="text-white font-bold text-lg">{prestige}%</p>
            <div className="w-full bg-blue-900 rounded-full h-2 mt-2"><div className="bg-blue-300 h-2 rounded-full" style={{ width: `${prestige}%` }} /></div>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-4 text-center">
            <p className="text-red-200 text-xs mb-1">{language === 'zh' ? '调查' : 'Investigation'}</p>
            <p className="text-white font-bold text-lg">{investigation}%</p>
            <div className="w-full bg-red-900 rounded-full h-2 mt-2"><div className="bg-red-300 h-2 rounded-full" style={{ width: `${investigation}%` }} /></div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div key="story" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-yellow-500 text-red-900 font-bold px-3 py-1 rounded-full text-sm">{language === 'zh' ? `第${level.chapter}幕` : `Act ${level.chapter}`}</span>
                <span className="text-white/50 text-sm">{level.scene[language]}</span>
              </div>
              <h2 className="text-3xl font-black text-yellow-400 mb-4">{level.title[language]}</h2>
              <div className="flex gap-4 mb-6">
                <TrumpAvatar size="md" expression={level.id.includes('war') ? 'angry' : level.id.includes('deal') ? 'smug' : 'neutral'} />
                <p className="text-white text-lg leading-relaxed flex-1">{level.background[language]}</p>
              </div>
              <div className="space-y-3">
                {level.options.map((option, index) => {
                  const meetsRequirement = !option.requirement || attributes[option.requirement.attribute as keyof typeof attributes] >= option.requirement.minValue;
                  return (
                    <motion.button key={option.id} onClick={() => handleChoice(option)} disabled={!meetsRequirement}
                      className={`w-full p-4 rounded-xl text-left ${meetsRequirement ? 'bg-white/10 hover:bg-white/20 border border-white/30' : 'bg-white/5 border border-white/10 opacity-50'}`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                    >
                      <p className={`font-semibold ${meetsRequirement ? 'text-white' : 'text-white/40'}`}>{option.text[language]}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-6 border-2 border-yellow-400">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{language === 'zh' ? '决策结果' : 'Decision Result'}</h3>
              <p className="text-white text-lg mb-6 text-center">{lastResult?.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`text-center p-3 rounded-lg ${lastResult?.assetsChange >= 0 ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                  <p className="text-sm text-white/70">{language === 'zh' ? '资产变化' : 'Assets'}</p>
                  <p className={`text-xl font-bold ${lastResult?.assetsChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>{lastResult?.assetsChange >= 0 ? '+' : ''}{formatMoney(lastResult?.assetsChange || 0)}</p>
                </div>
                <div className={`text-center p-3 rounded-lg ${lastResult?.prestigeChange >= 0 ? 'bg-blue-500/30' : 'bg-red-500/30'}`}>
                  <p className="text-sm text-white/70">{language === 'zh' ? '威望变化' : 'Prestige'}</p>
                  <p className={`text-xl font-bold ${lastResult?.prestigeChange >= 0 ? 'text-blue-400' : 'text-red-400'}`}>{lastResult?.prestigeChange >= 0 ? '+' : ''}{lastResult?.prestigeChange}%</p>
                </div>
                <div className={`text-center p-3 rounded-lg ${lastResult?.investigationChange > 0 ? 'bg-red-500/30' : 'bg-green-500/30'}`}>
                  <p className="text-sm text-white/70">{language === 'zh' ? '调查风险' : 'Risk'}</p>
                  <p className={`text-xl font-bold ${lastResult?.investigationChange > 0 ? 'text-red-400' : 'text-green-400'}`}>{lastResult?.investigationChange > 0 ? '+' : ''}{lastResult?.investigationChange}%</p>
                </div>
              </div>
              {lastResult?.insiderTrading && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-6 text-center">
                  <p className="text-red-300 text-sm">⚠️ {language === 'zh' ? '本次操作涉及内幕交易，可能引发调查！' : 'This operation involved insider trading!'}</p>
                </div>
              )}
              <motion.button onClick={handleContinue} className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 font-bold py-3 rounded-xl">{language === 'zh' ? '继续 ➔' : 'Continue ➔'}</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
