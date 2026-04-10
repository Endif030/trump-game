'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStoreV2';
import { STORY_LEVELS } from '../data/gameDataV2';
import TrumpAvatar from './TrumpAvatar';
import BackToHome from './BackToHome';

// 属性名称映射
const ATTRIBUTE_NAMES: Record<string, { zh: string; en: string }> = {
  mediaControl: { zh: '媒体操控', en: 'Media Control' },
  businessIntuition: { zh: '商业嗅觉', en: 'Business Intuition' },
  politicalConnections: { zh: '政治人脉', en: 'Political Connections' },
  speechTalent: { zh: '演讲魅力', en: 'Speech Talent' },
  secrecy: { zh: '保密等级', en: 'Secrecy' },
};

// 将文本中的 \n\n 转换为段落
function formatBackground(text: string) {
  return text.split('\n\n').map((paragraph, index) => (
    <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
  ));
}

export default function StoryScreenV2() {
  const { 
    language, 
    currentLevel, 
    assets, 
    prestige, 
    investigation,
    attributes,
    goodPresidentPoints,
    insiderTradingCount,
    makeChoice, 
    nextLevel 
  } = useGameStore();
  
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);
  
  // 分步骤显示结果的状态
  const [resultStep, setResultStep] = useState(0);
  const [prevAssets, setPrevAssets] = useState(0);
  const [prevPrestige, setPrevPrestige] = useState(0);
  const [prevInvestigation, setPrevInvestigation] = useState(0);

  const level = STORY_LEVELS[currentLevel];
  
  // 安全检查：如果关卡不存在，返回首页
  if (!level) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">{language === 'zh' ? '游戏数据加载失败' : 'Game data failed to load'}</p>
          <BackToHome position="bottom-center" />
        </div>
      </div>
    );
  }

  // Shuffle options on mount and when level changes
  useEffect(() => {
    const options = [...level.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
    setShowResult(false);
    setResultStep(0);
  }, [currentLevel, level]);

  const handleChoice = (option: any) => {
    if (option.requirement) {
      const attrValue = attributes[option.requirement.attribute as keyof typeof attributes];
      if (attrValue < option.requirement.minValue) return;
    }
    
    // 先保存当前值（选择前的值）
    const currentAssets = assets;
    const currentPrestige = prestige;
    const currentInvestigation = investigation;
    
    const result = option.results;
    
    // 计算新值
    const newAssetsVal = Math.max(0, currentAssets + result.assetsChange);
    const newPrestigeVal = Math.min(100, Math.max(0, currentPrestige + result.prestigeChange));
    const newInvestigationVal = Math.min(100, Math.max(0, currentInvestigation + result.investigationChange));
    
    // 保存用于显示
    setPrevAssets(currentAssets);
    setPrevPrestige(currentPrestige);
    setPrevInvestigation(currentInvestigation);
    
    // 更新状态
    makeChoice(level.id, option.id, result);
    setLastResult({ 
      ...result, 
      description: result.description[language],
      _calculatedNewAssets: newAssetsVal,
      _calculatedNewPrestige: newPrestigeVal,
      _calculatedNewInvestigation: newInvestigationVal
    });
    setShowResult(true);
    setResultStep(0);
    
    // 自动推进步骤
    setTimeout(() => setResultStep(1), 800);
    setTimeout(() => setResultStep(2), 1600);
    setTimeout(() => setResultStep(3), 2400);
    if (result.insiderTrading) {
      setTimeout(() => setResultStep(4), 3200);
    }
  };

  const handleContinue = () => { 
    setShowResult(false); 
    setResultStep(0);
    nextLevel(); 
  };

  // Calculate progress to victory
  const greedyProgress = Math.min(100, (assets / 1000000000000) * 100);
  const goodPresidentProgress = Math.min(100, (prestige / 80) * 100);
  const isGoodPresidentRoute = goodPresidentPoints >= 2 || insiderTradingCount === 0;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${level.backgroundImage || ''})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />
      
      {/* Back to Home Button */}
      <BackToHome position="top-right" />
      
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Stats Panel */}
          <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" initial={{ y: -20 }} animate={{ y: 0 }}>
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-4 text-center">
              <p className="text-green-200 text-xs mb-1">{language === 'zh' ? '资产' : 'Assets'}</p>
              <p className="text-white font-mono font-bold text-sm md:text-base truncate">${assets.toLocaleString()}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 text-center">
              <p className="text-blue-200 text-xs mb-1">{language === 'zh' ? '威望' : 'Prestige'}</p>
              <p className="text-white font-bold text-lg">{prestige}%</p>
              <div className="w-full bg-blue-900 rounded-full h-2 mt-2"><div className="bg-blue-300 h-2 rounded-full transition-all" style={{ width: `${prestige}%` }} /></div>
            </div>
            
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-4 text-center">
              <p className="text-red-200 text-xs mb-1">{language === 'zh' ? '调查' : 'Investigation'}</p>
              <p className="text-white font-bold text-lg">{investigation}%</p>
              <div className="w-full bg-red-900 rounded-full h-2 mt-2"><div className="bg-red-300 h-2 rounded-full transition-all" style={{ width: `${investigation}%` }} /></div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 text-center">
              <p className="text-purple-200 text-xs mb-1">{isGoodPresidentRoute ? (language === 'zh' ? '好总统进度' : 'Good President') : (language === 'zh' ? '贪婪进度' : 'Greedy Route')}</p>
              <p className="text-white font-bold text-lg">{isGoodPresidentRoute ? goodPresidentProgress.toFixed(1) : greedyProgress.toFixed(1)}%</p>
              <div className="w-full bg-purple-900 rounded-full h-2 mt-2"><div className={`h-2 rounded-full transition-all ${isGoodPresidentRoute ? 'bg-blue-300' : 'bg-yellow-300'}`} style={{ width: `${isGoodPresidentRoute ? goodPresidentProgress : greedyProgress}%` }} /></div>
            </div>
          </motion.div>

          {/* Story Card */}
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div key="story" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-yellow-500 text-red-900 font-bold px-3 py-1 rounded-full text-sm">{language === 'zh' ? `第${level.chapter}幕` : `Act ${level.chapter}`}</span>
                  <span className="text-white/50 text-sm">{level.scene[language]}</span>
                </div>

                <h2 className="text-3xl font-black text-yellow-400 mb-4">{level.title[language]}</h2>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <TrumpAvatar size="md" expression={level.id.includes('war') ? 'angry' : level.id.includes('deal') ? 'smug' : 'neutral'} />
                  <div className="bg-white/10 rounded-xl p-4 flex-1">
                    <div className="text-white text-lg leading-relaxed">
                      {formatBackground(level.background[language])}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {shuffledOptions.map((option, index) => {
                    const meetsRequirement = !option.requirement || attributes[option.requirement.attribute as keyof typeof attributes] >= option.requirement.minValue;
                    return (
                      <motion.button key={option.id} onClick={() => handleChoice(option)} disabled={!meetsRequirement}
                        className={`w-full p-4 rounded-xl text-left transition-all ${meetsRequirement ? 'bg-white/10 hover:bg-white/20 border border-white/30' : 'bg-white/5 border border-white/10 opacity-50'}`}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                      >
                        {option.title && (
                          <p className={`font-bold text-lg mb-2 ${meetsRequirement ? 'text-yellow-400' : 'text-yellow-400/40'}`}>
                            {option.title[language]}
                          </p>
                        )}
                        <p className={`text-base ${meetsRequirement ? 'text-white' : 'text-white/40'}`}>{option.text[language]}</p>
                        {!meetsRequirement && option.requirement && (
                          <p className="text-red-400 text-sm mt-2">
                            {language === 'zh' ? `需要 ${ATTRIBUTE_NAMES[option.requirement.attribute]?.zh || option.requirement.attribute} ≥ ${option.requirement.minValue}` : `Requires ${ATTRIBUTE_NAMES[option.requirement.attribute]?.en || option.requirement.attribute} ≥ ${option.requirement.minValue}`}
                          </p>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-6 border-2 border-yellow-400"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{language === 'zh' ? '决策结果' : 'Decision Result'}</h3>
                
                {/* 步骤 0: 剧情描述 */}
                {resultStep >= 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-white text-lg mb-6 text-center bg-black/30 rounded-xl p-4"
                  >
                    {lastResult?.description}
                  </motion.div>
                )}
                
                {/* 步骤 1: 资产变化 */}
                {resultStep >= 1 && lastResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`mb-4 p-4 rounded-xl ${lastResult.assetsChange >= 0 ? 'bg-green-500/30' : 'bg-red-500/30'}`}
                  >
                    <p className="text-white/70 text-sm mb-2">{language === 'zh' ? '资产变化' : 'Assets'}</p>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                      <p className="text-white text-lg">${prevAssets.toLocaleString()}</p>
                      <span className={`text-2xl font-bold ${lastResult.assetsChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        → {lastResult.assetsChange >= 0 ? '+' : ''}${lastResult.assetsChange.toLocaleString()}
                      </span>
                      <p className={`text-xl font-bold ${lastResult.assetsChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${lastResult._calculatedNewAssets.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* 步骤 2: 威望变化 */}
                {resultStep >= 2 && lastResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`mb-4 p-4 rounded-xl ${lastResult.prestigeChange >= 0 ? 'bg-blue-500/30' : 'bg-red-500/30'}`}
                  >
                    <p className="text-white/70 text-sm mb-2">{language === 'zh' ? '威望变化' : 'Prestige'}</p>
                    <div className="flex justify-center items-center gap-4">
                      <p className="text-white text-lg">{prevPrestige}%</p>
                      <span className={`text-2xl font-bold ${lastResult.prestigeChange >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        {lastResult.prestigeChange >= 0 ? '↑' : '↓'} {lastResult.prestigeChange >= 0 ? '+' : ''}{lastResult.prestigeChange}%
                      </span>
                      <p className={`text-xl font-bold ${lastResult.prestigeChange >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        {lastResult._calculatedNewPrestige}%
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* 步骤 3: 调查风险 */}
                {resultStep >= 3 && lastResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`mb-4 p-4 rounded-xl ${lastResult.investigationChange > 0 ? 'bg-red-500/30' : 'bg-green-500/30'}`}
                  >
                    <p className="text-white/70 text-sm mb-2">{language === 'zh' ? '调查风险' : 'Investigation Risk'}</p>
                    <div className="flex justify-center items-center gap-4">
                      <p className="text-white text-lg">{prevInvestigation}%</p>
                      <span className={`text-2xl font-bold ${lastResult.investigationChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {lastResult.investigationChange > 0 ? '↑' : '→'} {lastResult.investigationChange > 0 ? '+' : ''}{lastResult.investigationChange}%
                      </span>
                      <p className={`text-xl font-bold ${lastResult._calculatedNewInvestigation >= 50 ? 'text-red-400' : lastResult._calculatedNewInvestigation >= 25 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {lastResult._calculatedNewInvestigation}%
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {/* 步骤 4: 内幕交易警告 */}
                {resultStep >= 4 && lastResult && lastResult.insiderTrading && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="bg-red-600/30 border-2 border-red-500 rounded-lg p-4 mb-6 text-center"
                  >
                    <p className="text-red-200 text-lg font-bold">
                      ⚠️ {language === 'zh' ? '本次操作涉及内幕交易，可能引发调查！' : 'This operation involved insider trading and may trigger investigation!'}
                    </p>
                  </motion.div>
                )}
                
                {/* 继续按钮 - 最后显示 */}
                {(resultStep >= 4 || (resultStep >= 3 && lastResult && !lastResult.insiderTrading)) && (
                  <motion.button 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    onClick={handleContinue} 
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-red-900 font-bold py-3 rounded-xl"
                  >
                    {language === 'zh' ? '继续 ➔' : 'Continue ➔'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
