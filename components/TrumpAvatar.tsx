'use client';

import { motion } from 'framer-motion';

interface TrumpAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'neutral' | 'smug' | 'angry' | 'surprised' | 'triumphant' | 'defeated';
  className?: string;
}

export default function TrumpAvatarV2({ size = 'md', expression = 'smug', className = '' }: TrumpAvatarProps) {
  const sizeMap = {
    sm: 'w-20 h-24',
    md: 'w-32 h-40',
    lg: 'w-48 h-60',
    xl: 'w-64 h-80'
  };

  const getExpressionFeatures = () => {
    switch (expression) {
      case 'smug':
        return { eyebrowY: 46, mouthD: 'M35 78 Q50 85 65 78', eyeScale: 1, smirk: true };
      case 'angry':
        return { eyebrowY: 48, mouthD: 'M40 82 Q50 78 60 82', eyeScale: 1.1, furrow: true };
      case 'surprised':
        return { eyebrowY: 42, mouthD: 'M45 80 Q50 88 55 80 Q50 75 45 80', eyeScale: 1.2, wide: true };
      case 'triumphant':
        return { eyebrowY: 44, mouthD: 'M38 75 Q50 90 62 75', eyeScale: 1, grin: true };
      case 'defeated':
        return { eyebrowY: 48, mouthD: 'M42 85 Q50 82 58 85', eyeScale: 0.9, droop: true };
      default:
        return { eyebrowY: 46, mouthD: 'M40 80 Q50 82 60 80', eyeScale: 1 };
    }
  };

  const features = getExpressionFeatures();

  return (
    <motion.div className={`relative ${sizeMap[size]} ${className}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
        <defs>
          <filter id="vintage">
            <feColorMatrix type="saturate" values="0.8"/>
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.1" intercept="-0.05"/>
              <feFuncG type="linear" slope="0.9"/>
              <feFuncB type="linear" slope="0.7"/>
            </feComponentTransfer>
          </filter>
        </defs>
        
        {/* Vintage style portrait frame */}
        <rect x="5" y="5" width="90" height="110" rx="5" fill="#f4e4bc" stroke="#8b4513" strokeWidth="3"/>
        
        {/* Hair - iconic swooping style */}
        <path d="M10 40 Q5 25 20 18 Q30 8 50 10 Q70 8 85 20 Q95 30 90 45 Q92 55 85 52 L80 48 Q75 55 70 48 Q65 55 60 48 Q55 52 50 48 Q45 52 40 48 Q35 55 30 48 Q25 55 20 48 L15 52 Q8 50 10 40" 
              fill="#ffcc00" stroke="#daa520" strokeWidth="1.5"/>
        
        {/* Sideburns */}
        <path d="M12 45 L12 65 L18 60 Z" fill="#ffcc00"/>
        <path d="M88 45 L88 65 L82 60 Z" fill="#ffcc00"/>
        
        {/* Face - more realistic proportions */}
        <ellipse cx="50" cy="60" rx="32" ry="36" fill="#ffdbac" stroke="#d4a574" strokeWidth="1"/>
        
        {/* Tan lines from golf goggles */}
        <ellipse cx="50" cy="48" rx="28" ry="14" fill="#e8c4a0" opacity="0.7"/>
        
        {/* Eyes - more expressive */}
        <g transform={`scale(${features.eyeScale})`} style={{ transformOrigin: '50px 55px' }}>
          <ellipse cx="38" cy="55" rx="7" ry="5" fill="white" stroke="#d4a574" strokeWidth="0.5"/>
          <ellipse cx="62" cy="55" rx="7" ry="5" fill="white" stroke="#d4a574" strokeWidth="0.5"/>
          <circle cx="38" cy="55" r="3" fill="#4a90d9"/>
          <circle cx="62" cy="55" r="3" fill="#4a90d9"/>
          <circle cx="38" cy="55" r="1.5" fill="#1a1a1a"/>
          <circle cx="62" cy="55" r="1.5" fill="#1a1a1a"/>
          {/* Eye shine */}
          <circle cx="39" cy="54" r="0.8" fill="white"/>
          <circle cx="63" cy="54" r="0.8" fill="white"/>
        </g>
        
        {/* Eyebrows - thick and expressive */}
        <path d={`M30 ${features.eyebrowY} Q38 ${features.eyebrowY - 2} 45 ${features.eyebrowY}`} stroke="#ffcc00" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d={`M55 ${features.eyebrowY} Q62 ${features.eyebrowY - 2} 70 ${features.eyebrowY}`} stroke="#ffcc00" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        {/* Furrow lines for angry */}
        {features.furrow && (
          <>
            <path d="M45 48 L48 52" stroke="#d4a574" strokeWidth="1"/>
            <path d="M55 48 L52 52" stroke="#d4a574" strokeWidth="1"/>
          </>
        )}
        
        {/* Nose - prominent */}
        <path d="M50 58 L46 72 L50 76 L54 72 Z" fill="#e8c4a0"/>
        <ellipse cx="50" cy="74" rx="5" ry="3" fill="#d4a574" opacity="0.5"/>
        
        {/* Mouth */}
        <path d={features.mouthD} stroke="#c4846c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Smirk line */}
        {features.smirk && <path d="M60 78 Q65 80 62 83" stroke="#c4846c" strokeWidth="1.5" fill="none"/>}
        
        {/* Chin dimple */}
        <ellipse cx="50" cy="88" rx="3" ry="2" fill="#d4a574" opacity="0.3"/>
        
        {/* Neck */}
        <rect x="38" y="92" width="24" height="12" fill="#ffdbac"/>
        <path d="M38 100 L38 105 L62 105 L62 100" fill="#e8c4a0" opacity="0.5"/>
        
        {/* Suit collar */}
        <path d="M25 105 L38 100 L38 115 L25 110 Z" fill="#1a237e"/>
        <path d="M75 105 L62 100 L62 115 L75 110 Z" fill="#1a237e"/>
        
        {/* White shirt */}
        <path d="M38 100 L50 95 L62 100 L62 120 L38 120 Z" fill="white"/>
        
        {/* Red power tie */}
        <path d="M45 95 L55 95 L53 112 L47 112 Z" fill="#dc143c"/>
        <path d="M47 112 L53 112 L54 120 L46 120 Z" fill="#b71c1c"/>
        
        {/* Tie knot */}
        <polygon points="46,95 54,95 52,102 48,102" fill="#dc143c"/>
        
        {/* Suit shoulders */}
        <path d="M15 105 L25 105 L25 120 L15 120 Z" fill="#0d1642"/>
        <path d="M85 105 L75 105 L75 120 L85 120 Z" fill="#0d1642"/>
        
        {/* Vintage photo effect overlay */}
        <rect x="5" y="5" width="90" height="110" rx="5" fill="url(#vintageOverlay)" opacity="0.1"/>
      </svg>
    </motion.div>
  );
}
