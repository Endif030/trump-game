'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStoreV2';
import { INTRO_TEXT } from '../data/endingsV2';
import TrumpAvatar from './TrumpAvatar';

export default function IntroScreen() {
  const { language, setLanguage, startGame } = useGameStore();
  const t = INTRO_TEXT[language];

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-red-900 via-blue-900 to-red-900 flex flex-col items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={() => setLanguage('zh')} className={`px-3 py-1 rounded-full text-sm font-bold ${language === 'zh' ? 'bg-yellow-400 text-red-900' : 'bg-white/20 text-white'}`}>中文</button>
        <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-full text-sm font-bold ${language === 'en' ? 'bg-yellow-400 text-red-900' : 'bg-white/20 text-white'}`}>EN</button>
      </div>

      <motion.div className="text-center max-w-2xl" initial={{ y: 20 }} animate={{ y: 0 }}>
        <div className="flex justify-center mb-6"><TrumpAvatar size="xl" expression="smug" /></div>
        <motion.h1 className="text-5xl md:text-7xl font-black text-yellow-400 mb-2" style={{ textShadow: '3px 3px 0 #DC143C' }} initial={{ scale: 0.5 }} animate={{ scale: 1 }}>{t.title}</motion.h1>
        <p className="text-xl text-white/80 mb-8">{t.subtitle}</p>

        <motion.div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
          <p className="text-2xl font-bold text-yellow-300 mb-4">{t.welcome}</p>
          <p className="text-white text-lg mb-4">{t.description}</p>
          <p className="text-red-300 font-semibold">{t.warning}</p>
        </motion.div>

        {/* 游戏结局标题 */}
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
          {language === 'zh' ? '🎯 游戏结局' : '🎯 Game Endings'}
        </h2>

        {/* 游戏目标 - 两个分开的格子 */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-600/30 to-amber-700/30 rounded-xl p-6 border-2 border-yellow-500/50">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-4xl">💰</span>
              <h3 className="text-xl font-bold text-yellow-400">{language === 'zh' ? '贪婪总统' : 'Greedy President'}</h3>
            </div>
            <p className="text-white text-center">{language === 'zh' ? '任期内通过内幕交易赚取 1 万亿美元' : 'Make $1 TRILLION through insider trading during your term'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600/30 to-cyan-700/30 rounded-xl p-6 border-2 border-blue-500/50">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-4xl">🕊️</span>
              <h3 className="text-xl font-bold text-blue-400">{language === 'zh' ? '人民总统' : 'People\'s President'}</h3>
            </div>
            <p className="text-white text-center">{language === 'zh' ? '卸任时获得 80%+ 民众支持率（且从未进行内幕交易）' : 'Leave office with 80%+ approval (without any insider trading)'}</p>
          </div>
        </motion.div>

        <motion.button onClick={startGame} className="bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 font-black text-2xl px-12 py-4 rounded-full shadow-2xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {language === 'zh' ? '开始总统生涯 🎮' : 'Start Presidency 🎮'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
