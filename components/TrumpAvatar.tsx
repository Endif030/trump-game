'use client';

import { motion } from 'framer-motion';

interface TrumpAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'neutral' | 'happy' | 'angry' | 'surprised' | 'smug';
  className?: string;
}

export default function TrumpAvatar({ size = 'md', expression = 'neutral', className = '' }: TrumpAvatarProps) {
  const sizeMap = {
    sm: 'w-16 h-20',
    md: 'w-24 h-32',
    lg: 'w-32 h-40',
    xl: 'w-48 h-60'
  };

  const getExpressionColors = () => {
    switch (expression) {
      case 'happy': return { face: '#FFDBAC', blush: '#FFB6C1' };
      case 'angry': return { face: '#FFDBAC', blush: '#FF6B6B' };
      case 'surprised': return { face: '#FFE4C4', blush: '#FFB6C1' };
      case 'smug': return { face: '#FFDBAC', blush: '#FFD700' };
      default: return { face: '#FFDBAC', blush: 'transparent' };
    }
  };

  const colors = getExpressionColors();

  return (
    <motion.div className={`relative ${sizeMap[size]} ${className}`} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
      <svg viewBox="0 0 100 125" className="w-full h-full drop-shadow-lg">
        {/* Hair */}
        <motion.path
          d="M15 35 Q10 20 25 15 Q35 5 50 8 Q65 5 75 15 Q90 20 85 35 Q95 30 90 45 Q88 50 85 48 L80 45 Q75 50 70 45 Q65 52 60 45 Q55 50 50 45 Q45 50 40 45 Q35 52 30 45 Q25 50 20 45 L15 48 Q12 50 10 45 Q5 30 15 35"
          fill="#FFD700" stroke="#DAA520" strokeWidth="1"
          initial={{ y: -10 }} animate={{ y: 0 }}
        />
        <ellipse cx="12" cy="45" rx="8" ry="15" fill="#FFD700" />
        <ellipse cx="88" cy="45" rx="8" ry="15" fill="#FFD700" />
        
        {/* Face */}
        <ellipse cx="50" cy="60" rx="32" ry="38" fill={colors.face} stroke="#E6C2A0" strokeWidth="0.5" />
        <ellipse cx="50" cy="52" rx="28" ry="15" fill="#F4C2A1" opacity="0.6" />
        
        {/* Eyes */}
        <ellipse cx="38" cy="55" rx="6" ry="5" fill="white" />
        <circle cx="38" cy="55" r="3" fill="#4A90E2" />
        <circle cx="38" cy="55" r="1.5" fill="black" />
        <ellipse cx="62" cy="55" rx="6" ry="5" fill="white" />
        <circle cx="62" cy="55" r="3" fill="#4A90E2" />
        <circle cx="62" cy="55" r="1.5" fill="black" />
        
        {/* Eyebrows */}
        <path d={expression === 'angry' ? "M32 48 Q38 52 44 48 M56 48 Q62 52 68 48" : "M32 46 Q38 44 44 46 M56 46 Q62 44 68 46"}
          stroke="#DAA520" strokeWidth="2" fill="none" />
        
        {/* Nose */}
        <path d="M50 58 Q46 68 50 72 Q54 68 50 58" fill="#E6B89A" />
        
        {/* Mouth */}
        <path d={expression === 'happy' ? "M38 78 Q50 88 62 78" : expression === 'angry' ? "M42 82 Q50 78 58 82" : expression === 'surprised' ? "M45 78 Q50 85 55 78 Q50 72 45 78" : expression === 'smug' ? "M42 80 Q50 82 58 78" : "M40 80 Q50 82 60 80"}
          stroke="#CC8E69" strokeWidth="2" fill={expression === 'surprised' ? '#FF6B6B' : 'none'} strokeLinecap="round" />
        
        {/* Blush */}
        {colors.blush !== 'transparent' && (
          <>
            <ellipse cx="28" cy="68" rx="6" ry="4" fill={colors.blush} opacity="0.5" />
            <ellipse cx="72" cy="68" rx="6" ry="4" fill={colors.blush} opacity="0.5" />
          </>
        )}
        
        {/* Suit */}
        <path d="M18 95 L25 85 L35 88 L50 85 L65 88 L75 85 L82 95 L85 125 L15 125 Z" fill="#1a237e" />
        <path d="M35 88 L50 85 L65 88 L50 125 Z" fill="white" />
        
        {/* Red tie */}
        <path d="M45 88 L55 88 L52 110 L48 110 Z" fill="#DC143C" />
        <path d="M48 110 L52 110 L54 125 L46 125 Z" fill="#B22222" />
        <polygon points="47,88 53,88 52,95 48,95" fill="#DC143C" />
        
        {/* Collar */}
        <path d="M25 85 L35 88 L35 95 L25 90 Z" fill="#0d1642" />
        <path d="M75 85 L65 88 L65 95 L75 90 Z" fill="#0d1642" />
      </svg>
    </motion.div>
  );
}
