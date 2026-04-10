'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { ENDINGS } from '../data/endings';
import TrumpAvatar from './TrumpAvatar';

export default function EndingScreen() {
  const { language, endingType, assets, prestige, checkEnding, setEnding, resetGame } = useGameStore();
  const [showShare, setShowShare] = useState(false);
  const [selectedText, setSelectedText] = useState(0);

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
      case 'goodPresident': return 'happy';
      case 'arrested': return 'surprised';
      case 'impeached': return 'angry';
      case 'doubleFace': return 'smug';
      default: return 'neutral';
    }
  };

  return (
    <motion.div className={`min-h-screen bg-gradient-to-b ${ending.bgColor} p-4`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {!showShare ? (
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

          <motion.div className="bg-black/20 rounded-xl p-4 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="text-white/70 text-center mb-3">{language === 'zh' ? '选择分享文案' : 'Choose share text'}</p>
            <div className="space-y-2">
              {ending.shareTexts.map((text, index) => (
                <button key={index} onClick={() => setSelectedText(index)}
                  className={`w-full p-3 rounded-lg text-left text-sm ${selectedText === index ? 'bg-yellow-400/30 border-2 border-yellow-400' : 'bg-white/5 border-2 border-transparent hover:bg-white/10'}`}
                >
                  <p className="text-white/80">{text.text[language]}</p>
                  {text.meme && <span className="text-xs text-yellow-400 mt-1 inline-block">🔥 Meme</span>}
                </button>
              ))}
            </div>          </motion.div>

          <motion.div className="flex gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <button onClick={() => setShowShare(true)} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl">
              {language === 'zh' ? '📸 生成分享卡片' : '📸 Generate Share Card'}
            </button>
            <button onClick={resetGame} className="flex-1 bg-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/30">
              {language === 'zh' ? '🔄 再玩一次' : '🔄 Play Again'}
            </button>
          </motion.div>
        </div>
      ) : (
        <ShareCardView ending={ending} shareText={ending.shareTexts[selectedText].text[language]} stats={{ assets, prestige }} onBack={() => setShowShare(false)} />
      )}
    </motion.div>
  );
}

// Simplified Share Card View (without html2canvas for now)
function ShareCardView({ ending, shareText, stats, onBack }: { ending: any; shareText: string; stats: any; onBack: () => void }) {
  const formatMoney = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(2)}T`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
      <div className={`bg-gradient-to-br ${ending.bgColor} rounded-3xl p-6 mb-6 aspect-[4/5]`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-20"><TrumpAvatar size="sm" expression="smug" /></div>
            <div>
              <h2 className="text-xl font-black text-white">{ending.title.zh}</h2>
              <p className="text-white/70 text-xs">{ending.subtitle.zh}</p>
            </div>
          </div>

          <div className="bg-black/30 rounded-xl p-4 mb-4 flex-1">
            <p className="text-white text-sm leading-relaxed">{shareText}</p>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <div className="text-center">
              <p className="text-white/60 text-xs">资产</p>
              <p className="text-white font-bold">{formatMoney(stats.assets)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs">威望</p>
              <p className="text-white font-bold">{stats.prestige}%</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs">评价</p>
              <p className="text-white font-bold">{ending.rating}</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/80 text-xs font-bold">特朗普模拟器</p>
            <p className="text-white/60 text-xs">扫码体验，你能比我做得更好吗？</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 bg-white/20 text-white font-bold py-3 rounded-xl">← 返回</button>
        <button onClick={() => alert('截图保存功能需部署后使用')} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl">💾 保存截图</button>
      </div>
    </motion.div>
  );
}
