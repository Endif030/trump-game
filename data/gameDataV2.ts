import { AttributeOption, StoryLevel, ElectionCheck } from '../types/game';

// 新加点系统：35点自由分配，每项0-10
export const ATTRIBUTE_OPTIONS: AttributeOption[] = [
  { 
    id: 'mediaControl', 
    name: { zh: '📺 媒体操控', en: '📺 Media Manipulation' }, 
    description: { zh: '每条推文能在市场上掀起多大风浪', en: 'How much market impact each tweet can create' }, 
    maxValue: 5,
    effect: { zh: '每点增加消息传播效果20%', en: '+20% message spread per point' } 
  },
  { 
    id: 'businessIntuition', 
    name: { zh: '💰 商业嗅觉', en: '💰 Business Instinct' }, 
    description: { zh: '预判市场走向的野兽般直觉', en: 'Beast-like intuition for market trends' }, 
    maxValue: 5,
    effect: { zh: '每点增加投资成功率10%', en: '+10% investment success per point' } 
  },
  { 
    id: 'politicalConnections', 
    name: { zh: '🏛️ 政治人脉', en: '🏛️ Political Network' }, 
    description: { zh: '国会山走廊里有多少老朋友', en: 'How many old friends in Capitol Hill corridors' }, 
    maxValue: 5,
    effect: { zh: '解锁特殊幕后操作选项', en: 'Unlock special backroom deal options' } 
  },
  { 
    id: 'speechTalent', 
    name: { zh: '🎭 演讲魅力', en: '🎭 Oratory Charm' }, 
    description: { zh: '让民众相信"没人比我更懂"的能力', en: 'Ability to make people believe "nobody knows better"' }, 
    maxValue: 5,
    effect: { zh: '每点增加民众支持变化20%', en: '+20% prestige change per point' } 
  },
  { 
    id: 'secrecy', 
    name: { zh: '🔒 保密等级', en: '🔒 Secrecy Level' }, 
    description: { zh: '最好的交易是没人知道的交易', en: 'The best deals are the ones nobody knows about' }, 
    maxValue: 5,
    effect: { zh: '每点降低被发现概率20%', en: '-20% discovery chance per point' } 
  }
];

export const TOTAL_ATTRIBUTE_POINTS = 35;

// 含蓄双关风格的故事关卡
export const STORY_LEVELS: StoryLevel[] = [
  {
    id: 'tariff-bomb', 
    chapter: 1, 
    title: { zh: '关税风云 💣', en: 'Tariff Tempest 💣' },
    scene: { zh: '2025年2月，椭圆形办公室', en: 'February 2025, Oval Office' },
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    background: { 
      zh: '你的贸易顾问刚刚离开，留下一份标着"机密"的文件夹。你注意到，在正式公告前72小时，有几家进口商的期权交易量突然激增。窗外的华盛顿天色阴沉，就像市场即将到来的情绪。海湖庄园的高尔夫球友们昨晚似乎对经济政策特别感兴趣...', 
      en: 'Your trade advisor just left, leaving a folder marked "Classified". You notice option trading volume for several importers surged 72 hours before any official announcement. Outside, Washington skies are as gloomy as the market sentiment to come. Your golf buddies at Mar-a-Lago seemed unusually interested in economic policy last night...' 
    },
    options: [
      { 
        id: 'insider-tip', 
        title: { zh: '内幕交易', en: 'Insider Trading' },
        text: { 
          zh: '市场总会奖励那些有准备的人。我的高尔夫球友们似乎对经济很有研究，也许该听听他们的建议。', 
          en: 'The market always rewards those who are prepared. My golf buddies seem to know a lot about economics—perhaps I should hear them out.' 
        }, 
        requirement: { attribute: 'mediaControl', minValue: 3 }, 
        results: { 
          assetsChange: 15000000, 
          prestigeChange: -12, 
          investigationChange: 8, 
          insiderTrading: true, 
          description: { 
            zh: '你"恰好"在宣布前调整了投资组合。当关税消息引发市场恐慌时，你的做空头寸带来了1500万美元收益。华尔街日报开始质疑"巧合"的频率。', 
            en: 'You "happened" to adjust your portfolio before the announcement. When tariff news sparked panic, your short positions gained $15M. The WSJ starts questioning the frequency of such "coincidences".' 
          } 
        } 
      },
      { 
        id: 'social-hint', 
        title: { zh: '放风试探', en: 'Trial Hint' },
        text: { 
          zh: '有时候，最好的政策就是先听听民众的声音。当然，是用我自己的方式——在Truth Social上。', 
          en: 'Sometimes the best policy is to listen to the people first. In my own way, of course—on Truth Social.' 
        }, 
        requirement: { attribute: 'mediaControl', minValue: 2 }, 
        results: { 
          assetsChange: 8000000, 
          prestigeChange: -6, 
          investigationChange: 4, 
          insiderTrading: true, 
          description: { 
            zh: '你发布了一条模棱两可的帖子，市场立刻震荡。在其他人还在解读你的"covfefe"时刻，你已经精准抄底。800万美元入账，虽然有人质疑这是否算"政策透明"。', 
            en: 'You posted something ambiguous, markets immediately shook. While others decoded your "covfefe" moment, you bought the dip. $8M gained, though some question if this counts as "policy transparency".' 
          } 
        } 
      },
      { 
        id: 'steady-approach', 
        title: { zh: '稳重观望', en: 'Wait and See' },
        text: { 
          zh: '稳定是市场的基石。先让子弹飞一会儿，看看风向再说。总统这个位置，需要的是耐心。', 
          en: 'Stability is the cornerstone of markets. Let the dust settle first, see which way the wind blows. The presidency requires patience.' 
        }, 
        results: { 
          assetsChange: 0, 
          prestigeChange: 8, 
          investigationChange: 0, 
          goodPresidentPoint: 1, 
          description: { 
            zh: '你展现了罕见的克制。市场因你的稳重而安心，虽然没有暴利，但你的支持率上升了。传统保守派媒体难得地赞扬了你。', 
            en: 'You showed rare restraint. Markets calmed at your stability. No windfall profits, but your approval rose. Traditional conservative media actually praised you for once.' 
          } 
        } 
      }
    ]
  },
  {
    id: 'crypto-gambit', 
    chapter: 1, 
    title: { zh: '数字黄金迷局 🪙', en: 'Digital Gold Gambit 🪙' },
    scene: { zh: '2025年3月，海湖庄园', en: 'March 2025, Mar-a-Lago' },
    backgroundImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1920&q=80',
    background: { 
      zh: '家族办公室的财务报表摆在桌上。你"恰好"注意到，就在国会讨论"美国战略比特币储备"法案的前一周，几个离岸账户的持仓结构发生了微妙变化。你的大儿子昨晚提到，某些加密行业领袖很愿意"支持总统的愿景"。', 
      en: 'The family office financials are on the table. You "happen" to notice that just a week before Congress discusses the "US Strategic Bitcoin Reserve" bill, several offshore accounts subtly shifted positions. Your eldest mentioned last night that certain crypto leaders are eager to "support the President\'s vision".' 
    },
    options: [
      { 
        id: 'family-office', 
        text: { 
          zh: '作为总统，我有责任让美国成为数字创新的领导者。这个愿景值得大力推广。', 
          en: 'As President, I have a duty to make America a digital innovation leader. This vision deserves strong promotion.' 
        }, 
        results: { 
          assetsChange: 35000000, 
          prestigeChange: -10, 
          investigationChange: 15, 
          insiderTrading: true, 
          description: { 
            zh: '你公开支持法案后，比特币价格暴涨40%。家族持仓浮盈3500万美元。但SEC主席的眼神变得耐人寻味，几家媒体开始深挖"巧合"。', 
            en: 'After your public support, Bitcoin surged 40%. Family holdings gained $35M. But the SEC Chairman\'s gaze became meaningful, and media started digging into "coincidences".' 
          } 
        } 
      },
      { 
        id: 'behind-scenes', 
        text: { 
          zh: '真正的领导力往往在聚光灯之外。有些事，私下推动比公开表态更有效。', 
          en: 'True leadership often happens outside the spotlight. Some things work better when pushed privately than declared publicly.' 
        }, 
        results: { 
          assetsChange: 15000000, 
          prestigeChange: -3, 
          investigationChange: 5, 
          insiderTrading: true, 
          description: { 
            zh: '你在幕后为法案疏通关系，同时保持公开中立。币圈感恩你的"默默支持"，你的钱包也鼓了起来。这种方式风险更低，但收益也相应减少。', 
            en: 'You greased wheels behind the scenes while staying publicly neutral. Crypto circles appreciate your "quiet support", and your wallet swelled. Lower risk, but also lower returns.' 
          } 
        } 
      },
      { 
        id: 'conflict-concern', 
        text: { 
          zh: '总统的职位要求我把国家利益置于个人利益之上。这个法案，我需要回避。', 
          en: 'The presidency requires putting national interest above personal gain. On this bill, I must recuse myself.' 
        }, 
        results: { 
          assetsChange: -8000000, 
          prestigeChange: 12, 
          investigationChange: 0, 
          goodPresidentPoint: 1, 
          description: { 
            zh: '你公开宣布回避并反对该法案，家族持仓账面亏损800万。但主流媒体破天荒地赞扬了你的"总统风范"，你的支持率创下任期新高。', 
            en: 'You publicly recused yourself and opposed the bill; family holdings lost $8M on paper. But mainstream media surprisingly praised your "presidential conduct", and your approval hit a term high.' 
          } 
        } 
      }
    ]
  },
  {
    id: 'fed-war', 
    chapter: 1, 
    title: { zh: '美联储的博弈 🏦', en: 'Fed Gambit 🏦' },
    scene: { zh: '2025年4月，美联储大楼会议室', en: 'April 2025, Federal Reserve Boardroom' },
    backgroundImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80',
    background: { 
      zh: '鲍威尔再次拒绝降息。你看着他的眼睛，想起华尔街老友们最近的抱怨："如果市场预期降息，长债价格会很有意思。"你的财政部部长"恰好"是某债券交易巨头的校友。窗外的雨，像市场的眼泪，也像机会的前奏。', 
      en: 'Powell refuses rate cuts again. You look into his eyes, recalling Wall Street friends\' recent complaints: "If markets expect cuts, long bonds could get interesting." Your Treasury Secretary "happens" to be alumni with a major bond trading house. The rain outside, like market tears, also like opportunity\'s prelude.' 
    },
    options: [
      { 
        id: 'pressure-play', 
        text: { 
          zh: '总统有权表达自己的经济观点。鲍威尔需要听听来自宾夕法尼亚大街1600号的声音。', 
          en: 'The President has every right to express economic views. Powell needs to hear from 1600 Pennsylvania Avenue.' 
        }, 
        requirement: { attribute: 'speechTalent', minValue: 6 }, 
        results: { 
          assetsChange: 20000000, 
          prestigeChange: -8, 
          investigationChange: 10, 
          insiderTrading: true, 
          description: { 
            zh: '你公开炮轰鲍威尔后，降息预期飙升，长债价格暴涨。你的"提前布局"带来2000万美元收益。但《经济学人》开始质疑央行独立性是否已成为历史。', 
            en: 'After your public attack on Powell, cut expectations soared, long bond prices jumped. Your "early positioning" gained $20M. But The Economist questions if central bank independence is history.' 
          } 
        } 
      },
      { 
        id: 'dual-message', 
        text: { 
          zh: '公开场合，我尊重美联储的独立性。私下里嘛...老朋友们总是需要一些"指导"。', 
          en: 'Publicly, I respect Fed independence. Privately... old friends always need some "guidance".' 
        }, 
        results: { 
          assetsChange: 10000000, 
          prestigeChange: 2, 
          investigationChange: 6, 
          insiderTrading: true, 
          description: { 
            zh: '你玩了精致的双面游戏：公开赞扬鲍威尔，私下向市场释放"预期管理"信号。1000万美元入账，支持率还有所上升。这是艺术。', 
            en: 'You played an exquisite double game: publicly praising Powell, privately signaling "expectation management" to markets. $10M gained, approval even rose. This is art.' 
          } 
        } 
      },
      { 
        id: 'institutional-respect', 
        text: { 
          zh: '美联储的独立性是金融市场的基石。即使我不同意，也要尊重这个制度。', 
          en: 'Fed independence is the bedrock of financial markets. Even when I disagree, I must respect this institution.' 
        }, 
        results: { 
          assetsChange: 0, 
          prestigeChange: 10, 
          investigationChange: 0, 
          goodPresidentPoint: 1, 
          description: { 
            zh: '你没有干预货币政策。华尔街分析师们震惊地在报告中写下："特朗普尊重了央行独立性。"你的支持率稳步上升，虽然账户没有。', 
            en: 'You didn\'t interfere with monetary policy. Wall Street analysts shockingly wrote in reports: "Trump respected central bank independence." Your approval rose steadily, though your account didn\'t.' 
          } 
        } 
      }
    ]
  }
];

export const ELECTION_CHECKS: ElectionCheck[] = [
  { 
    year: 2026, 
    minPrestige: 50, 
    success: { zh: '🎉 共和党保持国会优势！反对党开始质疑你的民调数字。', en: '🎉 Republicans keep Congress! Opposition questions your poll numbers.' }, 
    warning: { zh: '⚠️ 失去众议院！部分激进议程将受阻，但基本盘依然稳固。', en: '⚠️ Lost the House! Some radical agendas blocked, but base remains solid.' }, 
    failure: { zh: '🔥 国会变天！弹劾调查声浪四起，你的第二个任期岌岌可危。', en: '🔥 Congressional shakeup! Impeachment calls mount. Your second term is at risk.' } 
  },
  { 
    year: 2028, 
    minPrestige: 55, 
    success: { zh: '🎉 党内初选民调领先！你可以展望连任了。', en: '🎉 Leading primary polls! You can look toward re-election.' }, 
    warning: { zh: '⚠️ 党内出现挑战者！佛罗里达的那位州长似乎很活跃。', en: '⚠️ Challenger emerged! The Florida governor seems quite active.' }, 
    failure: { zh: '🔚 民调惨淡，党内劝退声浪高涨。你的政治生涯似乎要提前结束了。', en: '🔚 Polls dismal, party urging withdrawal. Your political career may end early.' } 
  }
];
