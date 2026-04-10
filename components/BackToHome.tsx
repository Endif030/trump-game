'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStoreV2';

interface BackToHomeProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  label?: { zh: string; en: string };
}

export default function BackToHome({ 
  position = 'top-left',
  label = { zh: '返回首页', en: 'Home' }
}: BackToHomeProps) {
  const { language, resetGame } = useGameStore();

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      // 清除游戏状态
      resetGame();
      // 刷新页面回到首页
      window.location.reload();
    }
  };

  return (
    <motion.button
      onClick={handleGoHome}
      className={`fixed ${positionClasses[position]} z-50 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full font-semibold border border-white/30 transition-all flex items-center gap-2 shadow-lg`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      {label[language]}
    </motion.button>
  );
}
