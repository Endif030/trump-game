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
    binary: true, // 二元选择：0或5
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

export const TOTAL_ATTRIBUTE_POINTS = 18;

// 含蓄双关风格的故事关卡
export const STORY_LEVELS: StoryLevel[] = [
  {
    id: 'tariff-bomb',
    chapter: 1,
    title: { zh: '关税风云 💣', en: 'Tariff Tempest 💣' },
    scene: { zh: '2025年2月，椭圆形办公室', en: 'February 2025, Oval Office' },
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    background: {
      zh: '你的贸易顾问刚刚离开，留下一份标着"机密"的文件夹。\n\n你注意到，在正式公告前72小时，有几家进口商的期权交易量突然激增。窗外的华盛顿天色阴沉，就像市场即将到来的情绪。\n\n海湖庄园的高尔夫球友们昨晚似乎对经济政策特别感兴趣...',
      en: 'Your trade advisor just left, leaving a folder marked "Classified".\n\nYou notice option trading volume for several importers surged 72 hours before any official announcement. Outside, Washington skies are as gloomy as the market sentiment to come.\n\nYour golf buddies at Mar-a-Lago seemed unusually interested in economic policy last night...'
    },
    options: [
      {
        id: 'insider-tip',
        title: { zh: '内幕交易', en: 'Insider Trading' },
        text: {
          zh: '市场总会奖励那些有准备的人。我的高尔夫球友们似乎对经济很有研究，也许该听听他们的建议。',
          en: 'The market always rewards those who are prepared. My golf buddies seem to know a lot about economics-perhaps I should hear them out.'
        },
        requirement: { attribute: 'mediaControl', minValue: 3 },
        results: {
          assetsChange: 1000000000,
          prestigeChange: -12,
          investigationChange: 8,
          insiderTrading: true,
          description: {
            zh: '你"恰好"在宣布前调整了投资组合。当关税消息引发市场恐慌时，你的做空头寸带来了10亿美元收益。华尔街日报开始质疑"巧合"的频率。',
            en: 'You "happened" to adjust your portfolio before the announcement. When tariff news sparked panic, your short positions gained $1B. The WSJ starts questioning the frequency of such "coincidences".'
          }
        }
      },
      {
        id: 'social-hint',
        title: { zh: '放风试探', en: 'Trial Hint' },
        text: {
          zh: '有时候，最好的政策就是先听听民众的声音。当然，是用我自己的方式--在Truth Social上。',
          en: 'Sometimes the best policy is to listen to the people first. In my own way, of course-on Truth Social.'
        },
        requirement: { attribute: 'mediaControl', minValue: 2 },
        results: {
          assetsChange: 400000000,
          prestigeChange: -6,
          investigationChange: 4,
          insiderTrading: true,
          description: {
            zh: '你发布了一条模棱两可的帖子，市场立刻震荡。在其他人还在解读你的"covfefe"时刻，你已经精准抄底。4亿美元入账，虽然有人质疑这是否算"政策透明"。',
            en: 'You posted something ambiguous, markets immediately shook. While others decoded your "covfefe" moment, you bought the dip. $400M gained, though some question if this counts as "policy transparency".'
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
      zh: '家族办公室的财务报表摆在桌上。\n\n你"恰好"注意到，就在国会讨论"美国战略比特币储备"法案的前一周，几个离岸账户的持仓结构发生了微妙变化。\n\n你的大儿子昨晚提到，某些加密行业领袖很愿意"支持总统的愿景"。',
      en: 'The family office financials are on the table.\n\nYou "happen" to notice that just a week before Congress discusses the "US Strategic Bitcoin Reserve" bill, several offshore accounts subtly shifted positions.\n\nYour eldest mentioned last night that certain crypto leaders are eager to "support the President\'s vision".'
    },
    options: [
      {
        id: 'family-office',
        title: { zh: '公开支持', en: 'Public Support' },
        text: {
          zh: '作为总统，我有责任让美国成为数字创新的领导者。这个愿景值得大力推广。',
          en: 'As President, I have a duty to make America a digital innovation leader. This vision deserves strong promotion.'
        },
        results: {
          assetsChange: 4000000000,
          prestigeChange: -10,
          investigationChange: 15,
          insiderTrading: true,
          description: {
            zh: '你公开支持法案后，比特币价格暴涨40%。家族持仓浮盈40亿美元。但SEC主席的眼神变得耐人寻味，几家媒体开始深挖"巧合"。',
            en: 'After your public support, Bitcoin surged 40%. Family holdings gained $4B. But the SEC Chairman\'s gaze became meaningful, and media started digging into "coincidences".'
          }
        }
      },
      {
        id: 'behind-scenes',
        title: { zh: '幕后操作', en: 'Behind the Scenes' },
        text: {
          zh: '真正的领导力往往在聚光灯之外。有些事，私下推动比公开表态更有效。',
          en: 'True leadership often happens outside the spotlight. Some things work better when pushed privately than declared publicly.'
        },
        results: {
          assetsChange: 1600000000,
          prestigeChange: -3,
          investigationChange: 5,
          insiderTrading: true,
          description: {
            zh: '你在幕后为法案疏通关系，同时保持公开中立。币圈感恩你的"默默支持"，你的钱包也鼓了起来。16亿美元入账。这种方式风险更低，但收益也相应减少。',
            en: 'You greased wheels behind the scenes while staying publicly neutral. Crypto circles appreciate your "quiet support", and your wallet swelled. $1.6B gained. Lower risk, but also lower returns.'
          }
        }
      },
      {
        id: 'conflict-concern',
        title: { zh: '主动回避', en: 'Recuse Self' },
        text: {
          zh: '总统的职位要求我把国家利益置于个人利益之上。这个法案，我需要回避。',
          en: 'The presidency requires putting national interest above personal gain. On this bill, I must recuse myself.'
        },
        results: {
          assetsChange: -400000000,
          prestigeChange: 12,
          investigationChange: 0,
          goodPresidentPoint: 1,
          description: {
            zh: '你公开宣布回避并反对该法案，家族持仓账面亏损4亿。但主流媒体破天荒地赞扬了你的"总统风范"，你的支持率创下任期新高。',
            en: 'You publicly recused yourself and opposed the bill; family holdings lost $400M on paper. But mainstream media surprisingly praised your "presidential conduct", and your approval hit a term high.'
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
      zh: '鲍威尔再次拒绝降息。\n\n你看着他的眼睛，想起华尔街老友们最近的抱怨："如果市场预期降息，长债价格会很有意思。"\n\n你的财政部部长"恰好"是某债券交易巨头的校友。窗外的雨，像市场的眼泪，也像机会的前奏。',
      en: 'Powell refuses rate cuts again.\n\nYou look into his eyes, recalling Wall Street friends\' recent complaints: "If markets expect cuts, long bonds could get interesting."\n\nYour Treasury Secretary "happens" to be alumni with a major bond trading house. The rain outside, like market tears, also like opportunity\'s prelude.'
    },
    options: [
      {
        id: 'pressure-play',
        title: { zh: '公开施压', en: 'Public Pressure' },
        text: {
          zh: '总统有权表达自己的经济观点。鲍威尔需要听听来自宾夕法尼亚大街1600号的声音。',
          en: 'The President has every right to express economic views. Powell needs to hear from 1600 Pennsylvania Avenue.'
        },
        requirement: { attribute: 'speechTalent', minValue: 3 },
        results: {
          assetsChange: 10000000000,
          prestigeChange: -8,
          investigationChange: 10,
          insiderTrading: true,
          description: {
            zh: '你公开炮轰鲍威尔后，降息预期飙升，长债价格暴涨。你的"提前布局"带来100亿美元收益。但《经济学人》开始质疑央行独立性是否已成为历史。',
            en: 'After your public attack on Powell, cut expectations soared, long bond prices jumped. Your "early positioning" gained $10B. But The Economist questions if central bank independence is history.'
          }
        }
      },
      {
        id: 'dual-message',
        title: { zh: '双面策略', en: 'Dual Strategy' },
        text: {
          zh: '公开场合，我尊重美联储的独立性。私下里嘛...老朋友们总是需要一些"指导"。',
          en: 'Publicly, I respect Fed independence. Privately... old friends always need some "guidance".'
        },
        results: {
          assetsChange: 4000000000,
          prestigeChange: 2,
          investigationChange: 6,
          insiderTrading: true,
          description: {
            zh: '你玩了精致的双面游戏：公开赞扬鲍威尔，私下向市场释放"预期管理"信号。40亿美元入账，支持率还有所上升。这是艺术。',
            en: 'You played an exquisite double game: publicly praising Powell, privately signaling "expectation management" to markets. $4B gained, approval even rose. This is art.'
          }
        }
      },
      {
        id: 'institutional-respect',
        title: { zh: '尊重制度', en: 'Respect Institution' },
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
  },
  // 第4关：马斯克交易
  {
    id: 'musk-deal',
    chapter: 2,
    title: { zh: '马斯克交易 🤝💔', en: 'The Musk Deal 🤝💔' },
    scene: { zh: '2026年初，X总部', en: 'Early 2026, X Headquarters' },
    backgroundImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80',
    background: {
      zh: '马斯克又发推了。他说要"重新考虑"对政府合同的支持。特斯拉股价应声下跌。\n\n等等...你们上周不是还一起打高尔夫吗？\n\n你记得当时他"不经意"提到他最近在看哪些股票...',
      en: 'Musk tweeted again. He said he\'d "reconsider" government contract support. Tesla stock dropped immediately.\n\nWait... didn\'t you golf together last week?\n\nYou remember him "casually" mentioning which stocks he\'s been watching lately...'
    },
    options: [
      {
        id: 'public-breakup',
        title: { zh: '公开决裂', en: 'Public Breakup' },
        text: {
          zh: '有些人需要明白，总统不是你的朋友，而是你的老板。马斯克需要学习这一点。',
          en: 'Some people need to understand that the President is not your friend, but your boss. Musk needs to learn this lesson.'
        },
        results: {
          assetsChange: 20000000000,
          prestigeChange: -10,
          investigationChange: 8,
          insiderTrading: true,
          description: {
            zh: '你提前做空特斯拉，决裂消息一出股价暴跌，获利200亿！利用总统权力打击个人恩怨？这叫执行力。',
            en: 'You shorted Tesla in advance, stock crashed on breakup news, gained $20B! Using presidential power for personal vendetta? That\'s execution.'
          }
        }
      },
      {
        id: 'efficiency-dept',
        title: { zh: '任命部长', en: 'Appoint Secretary' },
        text: {
          zh: '马斯克是个天才。如果他能为政府效力，为什么不给他这个机会呢？',
          en: 'Musk is a genius. If he can serve the government, why not give him the opportunity?'
        },
        results: {
          assetsChange: 30000000000,
          prestigeChange: -8,
          investigationChange: 18,
          insiderTrading: true,
          description: {
            zh: '你提前做多特斯拉，任命消息刺激股价暴涨，获利300亿！但"利益冲突"的质疑铺天盖地...',
            en: 'You bought Tesla in advance, appointment news sent stock soaring, gained $30B! But "conflict of interest" questions are everywhere...'
          }
        }
      },
      {
        id: 'professional-distance',
        title: { zh: '保持距离', en: 'Keep Distance' },
        text: {
          zh: '商业就是商业，政治就是政治。总统不应该和亿万富翁走得太近。',
          en: 'Business is business, politics is politics. The President shouldn\'t get too close to billionaires.'
        },
        results: {
          assetsChange: 0,
          prestigeChange: 6,
          investigationChange: 0,
          goodPresidentPoint: 1,
          description: {
            zh: '你拒绝了利用马斯克的影响力。华尔街松了口气，但你错过了赚钱机会。',
            en: 'You refused to exploit Musk\'s influence. Wall Street breathes easy, but you missed the profit opportunity.'
          }
        }
      }
    ]
  },
  // 第5关：战争边缘
  {
    id: 'war-edge',
    chapter: 2,
    title: { zh: '战争边缘 🚀', en: 'Edge of War 🚀' },
    scene: { zh: '2026年中，五角大楼战情室', en: 'Mid-2026, Pentagon War Room' },
    backgroundImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80',
    background: {
      zh: '伊朗核设施的情报摆在桌上。军事打击可以"解决问题"，但也会推高油价。\n\n你看着自己的能源股投资组合...\n\n国防部长提醒你有72小时的时间窗口。',
      en: 'Intel on Iranian nuclear facilities is on the table. Military strikes could "solve the problem," but would also spike oil prices.\n\nYou look at your energy stock portfolio...\n\nThe Defense Secretary reminds you of a 72-hour window.'
    },
    options: [
      {
        id: 'war-threat',
        title: { zh: '战争威胁', en: 'War Threat' },
        text: {
          zh: '有时候，最好的外交就是让对方相信你会按下按钮。让伊朗尝尝后果。',
          en: 'Sometimes the best diplomacy is making the other side believe you\'ll press the button. Let Iran taste the consequences.'
        },
        results: {
          assetsChange: 80000000000,
          prestigeChange: -15,
          investigationChange: 12,
          insiderTrading: true,
          description: {
            zh: '油价暴涨，能源股投资组合获利800亿！国际局势紧张？那是下届总统的问题。',
            en: 'Oil prices soared, energy portfolio gained $80B! International tension? That\'s the next president\'s problem.'
          }
        }
      },
      {
        id: 'leak-plan',
        title: { zh: '泄露计划', en: 'Leak Plans' },
        text: {
          zh: '战争机器需要润滑剂。让市场提前知道会发生什么，对大家都有好处。',
          en: 'The war machine needs lubrication. Letting the market know what\'s coming in advance benefits everyone.'
        },
        results: {
          assetsChange: 56000000000,
          prestigeChange: -8,
          investigationChange: 22,
          insiderTrading: true,
          description: {
            zh: '通过"消息人士"提前布局，获利560亿！但泄密调查开始了，军方对你失去信任...',
            en: 'Positioned via "sources" ahead of time, gained $56B! But leak investigation begins, military loses trust in you...'
          }
        }
      },
      {
        id: 'diplomacy',
        title: { zh: '外交斡旋', en: 'Diplomacy' },
        text: {
          zh: '战争永远是最后的手段。让我们先谈谈，看看能不能找到共同点。',
          en: 'War is always the last resort. Let\'s talk first and see if we can find common ground.'
        },
        results: {
          assetsChange: 0,
          prestigeChange: 15,
          investigationChange: 0,
          goodPresidentPoint: 1,
          description: {
            zh: '你选择了和平。诺贝尔和平奖提名正在路上，虽然你没赚到钱。',
            en: 'You chose peace. Nobel Peace Prize nomination is on the way, though you didn\'t make money.'
          }
        }
      }
    ]
  },
  // 第6关：美元危机
  {
    id: 'dollar-crisis',
    chapter: 2,
    title: { zh: '美元危机 💵', en: 'Dollar Crisis 💵' },
    scene: { zh: '2027年，财政部', en: '2027, Treasury Department' },
    backgroundImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80',
    background: {
      zh: '美元霸权地位动摇，人民币正在崛起。如果你能让美元贬值，黄金和新兴市场资产会暴涨...\n\n你的私人银行家在瑞士等你电话。\n\n财政部部长今天的简报"恰好"提到了货币政策的可能调整。',
      en: 'Dollar hegemony is shaking, RMB is rising. If you could weaken the dollar, gold and emerging market assets would soar...\n\nYour private banker in Switzerland is waiting for your call.\n\nThe Treasury Secretary\'s briefing today "happened" to mention possible monetary policy adjustments.'
    },
    options: [
      {
        id: 'weak-dollar',
        title: { zh: '弱美元政策', en: 'Weak Dollar Policy' },
        text: {
          zh: '强势美元伤害了我们的出口竞争力。是时候让美元回归合理价位了。',
          en: 'The strong dollar is hurting our export competitiveness. It\'s time to bring the dollar back to a reasonable level.'
        },
        results: {
          assetsChange: 320000000000,
          prestigeChange: -15,
          investigationChange: 15,
          insiderTrading: true,
          description: {
            zh: '你提前做多黄金、做空美元，获利3200亿！"损害美国利益"的批评声铺天盖地...',
            en: 'You bought gold and shorted dollars in advance, gained $320B! Criticism of "harming US interests" is overwhelming...'
          }
        }
      },
      {
        id: 'appoint-crony',
        title: { zh: '安插亲信', en: 'Appoint Crony' },
        text: {
          zh: '财政部需要新鲜血液。我的老朋友约翰对经济有独到见解，他会是完美的财政部长。',
          en: 'The Treasury needs fresh blood. My old friend John has unique insights on the economy, he\'d be the perfect Treasury Secretary.'
        },
        results: {
          assetsChange: 240000000000,
          prestigeChange: -10,
          investigationChange: 18,
          insiderTrading: true,
          description: {
            zh: '提前获知政策走向，精准操作获利2400亿！若被发现，将面临严重后果...',
            en: 'Knew policy direction in advance, precise trading gained $240B! If discovered, will face serious consequences...'
          }
        }
      },
      {
        id: 'strong-dollar',
        title: { zh: '维护强美元', en: 'Defend Strong Dollar' },
        text: {
          zh: '美元是世界储备货币，这是我们的超级武器。我不会为了一己私利放弃这个优势。',
          en: 'The dollar is the world\'s reserve currency, that\'s our superweapon. I won\'t give up this advantage for personal gain.'
        },
        results: {
          assetsChange: 0,
          prestigeChange: 10,
          investigationChange: 0,
          goodPresidentPoint: 1,
          description: {
            zh: '你维护了美元地位。华尔街为你鼓掌，虽然你的账户没有增长。',
            en: 'You defended dollar status. Wall Street applauds you, though your account didn\'t grow.'
          }
        }
      }
    ]
  },
  // 第7关：最后的大单
  {
    id: 'final-deal',
    chapter: 3,
    title: { zh: '最后的大单 🎯', en: 'The Final Deal 🎯' },
    scene: { zh: '2028年末，白宫', en: 'Late 2028, White House' },
    backgroundImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1920&q=80',
    background: {
      zh: '任期即将结束。某加密货币交易所CEO面临终身监禁，他的律师联系了你：\n\n一笔巨额"捐款"，换一个赦免承诺。\n\n这是最后的机会...你的政治遗产，还是你的钱包？',
      en: 'Term almost over. A crypto exchange CEO faces life in prison. His lawyer contacted you:\n\nA massive "donation" for a pardon promise.\n\nThis is the last chance... your political legacy, or your wallet?'
    },
    options: [
      {
        id: 'accept-bribe',
        title: { zh: '接受贿赂', en: 'Accept Bribe' },
        text: {
          zh: '总统有权赦免。这是宪法赋予的权力，怎么使用是我的自由。',
          en: 'The President has the power to pardon. It\'s a constitutional power, how I use it is my freedom.'
        },
        results: {
          assetsChange: 800000000000,
          prestigeChange: -25,
          investigationChange: 45,
          insiderTrading: true,
          description: {
            zh: '加密行业"捐赠"8000亿！这是赤裸裸的腐败，被发现概率极高...',
            en: 'Crypto industry "donated" $800B! This is blatant corruption, extremely high chance of discovery...'
          }
        }
      },
      {
        id: 'imply-pardon',
        title: { zh: '暗示赦免', en: 'Hint at Pardon' },
        text: {
          zh: '我不会做出任何承诺。但如果某些事情发生，我也不会感到意外...',
          en: 'I won\'t make any promises. But if certain things happen, I won\'t be surprised...'
        },
        results: { 
          assetsChange: 320000000000, 
          prestigeChange: -8, 
          investigationChange: 12, 
          insiderTrading: true, 
          description: { 
            zh: '你释放了模糊信号，币圈应声上涨，获利3200亿。相对安全，但仍有风险。', 
            en: 'You sent vague signals, crypto market rose, gained $320B. Relatively safe, but still risky.' 
          } 
        }
      },
      {
        id: 'refuse-interfere',
        title: { zh: '拒绝干预', en: 'Refuse to Interfere' },
        text: {
          zh: '司法独立是美国制度的基石。我不会干预司法程序，即使这意味着失去一笔钱。',
          en: 'Judicial independence is the cornerstone of the American system. I won\'t interfere with judicial proceedings, even if it means losing money.'
        },
        results: {
          assetsChange: 0,
          prestigeChange: 15,
          investigationChange: 0,
          goodPresidentPoint: 1,
          description: {
            zh: '你拒绝了最后的诱惑。司法部对你刮目相看，虽然你错过了最后的暴富机会。',
            en: 'You resisted the final temptation. DOJ looks at you differently, though you missed the final jackpot.'
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
