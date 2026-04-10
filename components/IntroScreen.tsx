'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { INTRO_TEXT } from '../data/endings';
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

        <motion.div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-yellow-400/50">
          <p className="text-2xl font-bold text-yellow-300 mb-4">{t.welcome}</p>
          <p className="text-white text-lg mb-4">{t.description}</p>
          <p className="text-red-300 font-semibold">{t.warning}</p>
        </motion.div>

        <motion.div className="bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-xl p-6 mb-8 border border-yellow-400">
          <h3 className="text-xl font-bold text-yellow-300 mb-4">{t.goals.title}</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3"><span className="text-2xl">💰</span><p className="text-white">{t.goals.greedy}</p></div>
            <div className="flex items-start gap-3"><span className="text-2xl">🕊️</span><p className="text-white">{t.goals.good}</p></div>
          </div>
        </motion.div>

        <motion.button onClick={startGame} className="bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 font-black text-2xl px-12 py-4 rounded-full shadow-2xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {language === 'zh' ? '开始总统生涯 🎮' : 'Start Presidency 🎮'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
