import { AttributeOption, StoryLevel, ElectionCheck } from '../types/game';

export const ATTRIBUTE_OPTIONS: AttributeOption[] = [
  { id: 'mediaControl', name: { zh: '📺 媒体掌控', en: '📺 Media Control' }, description: { zh: '你的Truth Social帖子影响力惊人', en: 'Your Truth Social posts have incredible influence' }, cost: 20, effect: { zh: '消息传播效果 +20%', en: 'Message spread +20%' } },
  { id: 'businessIntuition', name: { zh: '💰 商业直觉', en: '💰 Business Intuition' }, description: { zh: '你对市场时机有着野兽般的嗅觉', en: 'You have a beast-like sense of market timing' }, cost: 25, effect: { zh: '投资成功率 +25%', en: 'Success rate +25%' } },
  { id: 'politicalConnections', name: { zh: '🏛️ 政治人脉', en: '🏛️ Political Connections' }, description: { zh: '国会山的老朋友们会帮你', en: 'Old friends on Capitol Hill will help you' }, cost: 20, effect: { zh: '解锁特殊选项', en: 'Unlock special options' } },
  { id: 'speechTalent', name: { zh: '🎭 演讲天赋', en: '🎭 Speech Talent' }, description: { zh: '没有人比你更懂演讲', en: 'Nobody knows speeches better than you' }, cost: 15, effect: { zh: '民众支持率 +15%', en: 'Public support +15%' } },
  { id: 'secrecy', name: { zh: '🔒 保密能力', en: '🔒 Secrecy' }, description: { zh: '最好的交易是没人知道的交易', en: 'The best deals are the ones nobody knows about' }, cost: 20, effect: { zh: '被发现概率 -30%', en: 'Discovery chance -30%' } },
  { id: 'initialFunds', name: { zh: '💵 启动资金', en: '💵 Initial Funds' }, description: { zh: '竞选欠了债，需要更多本金', en: 'Campaign debts mean you need more capital' }, cost: 15, effect: { zh: '起始资金 +300万', en: 'Starting funds +$3M' } }
];

export const STORY_LEVELS: StoryLevel[] = [
  {
    id: 'tariff-bomb', chapter: 1, title: { zh: '关税炸弹 💣', en: 'Tariff Bomb 💣' },
    scene: { zh: '2025年2月，白宫椭圆形办公室', en: 'February 2025, White House Oval Office' },
    background: { zh: '你的贸易顾问团队提交了一份报告：对全球盟友加征关税可以增加财政收入，但可能引发贸易战。', en: 'Your trade advisors submitted a report: tariffs on global allies could increase revenue, but might trigger trade wars.' },
    options: [
      { id: 'sudden-announcement', text: { zh: 'A. 突然宣布加征关税（需要媒体掌控≥20）', en: 'A. Sudden tariff announcement (requires Media Control ≥20)' }, requirement: { attribute: 'mediaControl', minValue: 20 }, results: { assetsChange: 8000000, prestigeChange: -10, investigationChange: 5, insiderTrading: true, description: { zh: '你提前做空进口商股票，市场恐慌时大赚一笔！', en: 'You shorted importer stocks in advance and made a fortune during the panic!' } } },
      { id: 'social-hint', text: { zh: 'B. 先在Truth Social放风（需要媒体掌控≥10）', en: 'B. Hint on Truth Social first (requires Media Control ≥10)' }, requirement: { attribute: 'mediaControl', minValue: 10 }, results: { assetsChange: 5000000, prestigeChange: -5, investigationChange: 3, insiderTrading: true, description: { zh: '你发了条模棱两可的推文，市场震荡中你精准抄底。', en: 'You posted a vague tweet and bought the dip during market volatility.' } } },
      { id: 'consult-advisors', text: { zh: 'C. 按兵不动，咨询顾问', en: 'C. Wait and consult advisors' }, results: { assetsChange: 0, prestigeChange: 5, investigationChange: 0, goodPresidentPoint: 1, description: { zh: '你展现了总统应有的稳重。没有内幕交易，但赢得了尊重。', en: 'You showed presidential composure. No insider trading, but earned respect.' } } }
    ]
  },
  {
    id: 'crypto-gambit', chapter: 1, title: { zh: '加密货币大棋 🪙', en: 'Crypto Gambit 🪙' },
    scene: { zh: '2025年3月，海湖庄园', en: 'March 2025, Mar-a-Lago' },
    background: { zh: '你的家族持仓中有大量比特币。现在国会正在讨论"美国战略比特币储备"法案。', en: 'Your family holds massive Bitcoin positions. Congress is now discussing the "US Strategic Bitcoin Reserve" bill.' },
    options: [
      { id: 'public-support', text: { zh: 'A. 公开支持比特币法案', en: 'A. Publicly support the Bitcoin bill' }, results: { assetsChange: 20000000, prestigeChange: -8, investigationChange: 10, insiderTrading: true, description: { zh: '币价暴涨，家族持仓获利2000万！SEC开始关注"利益冲突"问题...', en: 'Crypto prices soared, family holdings gained $20M! SEC is noticing "conflict of interest" issues...' } } },
      { id: 'secret-support', text: { zh: 'B. 私下支持，公开中立', en: 'B. Support secretly, stay neutral publicly' }, results: { assetsChange: 8000000, prestigeChange: 0, investigationChange: 2, insiderTrading: true, description: { zh: '你在幕后推动法案，表面上保持中立。安全但赚得少了些。', en: 'You pushed the bill behind the scenes while staying neutral publicly. Safe but less profitable.' } } },
      { id: 'oppose-crypto', text: { zh: 'C. 公开反对加密货币', en: 'C. Publicly oppose cryptocurrency' }, results: { assetsChange: -10000000, prestigeChange: 10, investigationChange: 0, goodPresidentPoint: 1, description: { zh: '家族持仓亏损1000万，但你赢得了传统金融界的尊重。', en: 'Family holdings lost $10M, but you earned respect from traditional finance.' } } }
    ]
  },
  {
    id: 'fed-war', chapter: 1, title: { zh: '美联储战争 🏦', en: 'Fed War 🏦' },
    scene: { zh: '2025年4月，美联储大楼', en: 'April 2025, Federal Reserve Building' },
    background: { zh: '美联储主席鲍威尔拒绝降息。你知道，如果你能让市场预期降息，长债价格会飙升...', en: 'Fed Chair Powell refuses to cut rates. You know, if you could make the market expect cuts, long-term bond prices would soar...' },
    options: [
      { id: 'attack-powell', text: { zh: 'A. 公开炮轰鲍威尔（需要演讲天赋≥15）', en: 'A. Publicly attack Powell (requires Speech Talent ≥15)' }, requirement: { attribute: 'speechTalent', minValue: 15 }, results: { assetsChange: 12000000, prestigeChange: -5, investigationChange: 8, insiderTrading: true, description: { zh: '你提前布局长债，降息预期推高债价，获利1200万！', en: 'You positioned in long bonds ahead of time, rate cut expectations pushed prices up, gained $12M!' } } },
      { id: 'two-face', text: { zh: 'B. 私下施压，公开赞扬', en: 'B. Pressure privately, praise publicly' }, results: { assetsChange: 6000000, prestigeChange: 3, investigationChange: 5, insiderTrading: true, description: { zh: '你玩了双面游戏，适度获利同时保持形象。', en: 'You played both sides, moderate profits while maintaining image.' } } },
      { id: 'respect-fed', text: { zh: 'C. 尊重美联储独立性', en: 'C. Respect Federal Reserve independence' }, results: { assetsChange: 0, prestigeChange: 8, investigationChange: 0, goodPresidentPoint: 1, description: { zh: '你没有干预货币政策。经济学家们惊呆了——特朗普尊重央行？', en: 'You didn\'t interfere with monetary policy. Economists are shocked—Trump respecting the central bank?' } } }
    ]
  },
  {
    id: 'musk-deal', chapter: 2, title: { zh: '马斯克交易 🤝💔', en: 'The Musk Deal 🤝💔' },
    scene: { zh: '2026年初，X总部', en: 'Early 2026, X Headquarters' },
    background: { zh: '马斯克又发推了。他说要"重新考虑"对政府合同的支持。等等...你们上周不是还一起打高尔夫吗？', en: 'Musk tweeted again. He said he\'d "reconsider" government contract support. Wait... didn\'t you golf together last week?' },
    options: [
      { id: 'public-breakup', text: { zh: 'A. 公开与马斯克决裂', en: 'A. Publicly break with Musk' }, results: { assetsChange: 15000000, prestigeChange: -10, investigationChange: 5, insiderTrading: true, description: { zh: '你提前做空特斯拉，决裂消息一出股价暴跌，获利1500万！', en: 'You shorted Tesla in advance, stock crashed on breakup news, gained $15M!' } } },
      { id: 'efficiency-dept', text: { zh: 'B. 任命马斯克为"政府效率部长"', en: 'B. Appoint Musk as "Secretary of Government Efficiency"' }, results: { assetsChange: 18000000, prestigeChange: -5, investigationChange: 15, insiderTrading: true, description: { zh: '你提前做多特斯拉，任命消息刺激股价暴涨，获利1800万！', en: 'You bought Tesla in advance, appointment news sent stock soaring, gained $18M!' } } },
      { id: 'professional-distance', text: { zh: 'C. 保持专业距离', en: 'C. Maintain professional distance' }, results: { assetsChange: 0, prestigeChange: 5, investigationChange: 0, goodPresidentPoint: 1, description: { zh: '你拒绝了利用马斯克的影响力。华尔街松了口气，但你错过了赚钱机会。', en: 'You refused to exploit Musk\'s influence. Wall Street breathes easy, but you missed the profit opportunity.' } } }
    ]
  },
  {
    id: 'war-edge', chapter: 2, title: { zh: '战争边缘 🚀', en: 'Edge of War 🚀' },
    scene: { zh: '2026年中，五角大楼战情室', en: 'Mid-2026, Pentagon War Room' },
    background: { zh: '伊朗核设施的情报摆在桌上。军事打击可以"解决问题"，但也会推高油价。', en: 'Intel on Iranian nuclear facilities is on the table. Military strikes could "solve the problem," but would also spike oil prices.' },
    options: [
      { id: 'war-threat', text: { zh: 'A. 发布战争威胁推文', en: 'A. Post war threat tweet' }, results: { assetsChange: 25000000, prestigeChange: -15, investigationChange: 10, insiderTrading: true, description: { zh: '油价暴涨，能源股投资组合获利2500万！国际局势紧张？那是下届总统的问题。', en: 'Oil prices soared, energy portfolio gained $25M! International tension? That\'s the next president\'s problem.' } } },
      { id: 'leak-plan', text: { zh: 'B. 安排"意外泄露"战争计划', en: 'B. Arrange "accidental leak" of war plans' }, results: { assetsChange: 20000000, prestigeChange: -5, investigationChange: 20, insiderTrading: true, description: { zh: '通过"消息人士"提前布局，获利2000万！但泄密调查开始了...', en: 'Positioned via "sources" ahead of time, gained $20M! But leak investigation begins...' } } },
      { id: 'diplomacy', text: { zh: 'C. 外交斡旋，避免战争', en: 'C. Diplomatic mediation to avoid war' }, results: { assetsChange: 0, prestigeChange: 12, investigationChange: 0, goodPresidentPoint: 1, description: { zh: '你选择了和平。诺贝尔和平奖提名正在路上，虽然你没赚到钱。', en: 'You chose peace. Nobel Peace Prize nomination is on the way, though you didn\'t make money.' } } }
    ]
  },
  {
    id: 'dollar-crisis', chapter: 2, title: { zh: '美元危机 💵', en: 'Dollar Crisis 💵' },
    scene: { zh: '2027年，财政部', en: '2027, Treasury Department' },
    background: { zh: '美元霸权地位动摇，人民币正在崛起。如果你能让美元贬值，黄金和新兴市场资产会暴涨...', en: 'Dollar hegemony is shaking, RMB is rising. If you could weaken the dollar, gold and emerging market assets would soar...' },
    options: [
      { id: 'weak-dollar', text: { zh: 'A. 公开支持弱美元政策', en: 'A. Publicly support weak dollar policy' }, results: { assetsChange: 30000000, prestigeChange: -12, investigationChange: 12, insiderTrading: true, description: { zh: '你提前做多黄金、做空美元，获利3000万！"损害美国利益"的批评声铺天盖地...', en: 'You bought gold and shorted dollars in advance, gained $30M! Criticism of "harming US interests" is overwhelming...' } } },
      { id: 'appoint-crony', text: { zh: 'B. 任命"自己人"进财政部', en: 'B. Appoint "your guy" to Treasury' }, results: { assetsChange: 25000000, prestigeChange: -8, investigationChange: 15, insiderTrading: true, description: { zh: '提前获知政策走向，精准操作获利2500万！若被发现，将面临严重后果...', en: 'Knew policy direction in advance, precise trading gained $25M! If discovered, will face serious consequences...' } } },
      { id: 'strong-dollar', text: { zh: 'C. 坚决维护强美元', en: 'C. Strongly defend strong dollar' }, results: { assetsChange: 0, prestigeChange: 8, investigationChange: 0, goodPresidentPoint: 1, description: { zh: '你维护了美元地位。华尔街为你鼓掌，虽然你的账户没有增长。', en: 'You defended dollar status. Wall Street applauds you, though your account didn\'t grow.' } } }
    ]
  },
  {
    id: 'final-deal', chapter: 3, title: { zh: '最后的大单 🎯', en: 'The Final Deal 🎯' },
    scene: { zh: '2028年末，白宫', en: 'Late 2028, White House' },
    background: { zh: '任期即将结束。某加密货币交易所CEO面临终身监禁，他的律师联系了你：一笔巨额"捐款"，换一个赦免承诺。', en: 'Term almost over. A crypto exchange CEO faces life in prison. His lawyer contacted you: a massive "donation" for a pardon promise.' },
    options: [
      { id: 'accept-bribe', text: { zh: 'A. 接受"捐款"，承诺赦免', en: 'A. Accept "donation," promise pardon' }, results: { assetsChange: 50000000, prestigeChange: -20, investigationChange: 40, insiderTrading: true, description: { zh: '加密行业"捐赠"5000万！这是赤裸裸的腐败，被发现概率极高...', en: 'Crypto industry "donated" $50M! This is blatant corruption, extremely high chance of discovery...' } } },
      { id: 'imply-pardon', text: { zh: 'B. 暗示性表态，市场操作', en: 'B. Hint at pardon, market trade' }, results: { assetsChange: 20000000, prestigeChange: -5, investigationChange: 10, insiderTrading: true, description: { zh: '你释放了模糊信号，币圈应声上涨，获利2000万。相对安全，但仍有风险。', en: 'You sent vague signals, crypto market rose, gained $20M. Relatively safe, but still risky.' } } },
      { id: 'refuse-interfere', text: { zh: 'C. 拒绝干预司法', en: 'C. Refuse to interfere with justice' }, results: { assetsChange: 0, prestigeChange: 10, investigationChange: 0, goodPresidentPoint: 1, description: { zh: '你拒绝了最后的诱惑。司法部对你刮目相看，虽然你错过了最后的暴富机会。', en: 'You resisted the final temptation. DOJ looks at you differently, though you missed the final jackpot.' } } }
    ]
  }
];

export const ELECTION_CHECKS: ElectionCheck[] = [
  { year: 2026, minPrestige: 50, success: { zh: '🎉 共和党保持国会优势！你的政策可以畅通无阻地推行。', en: '🎉 Republicans keep congressional majority!' }, warning: { zh: '⚠️ 失去众议院！部分政策将受阻。', en: '⚠️ Lost the House! Some policies will be blocked.' }, failure: { zh: '🔥 面临弹劾调查！国会失去信任。', en: '🔥 Facing impeachment inquiry! Congress lost trust.' } },
  { year: 2028, minPrestige: 55, success: { zh: '🎉 获得共和党提名！你可以争取连任了。', en: '🎉 Got Republican nomination!' }, warning: { zh: '⚠️ 党内出现挑战者！连任之路困难重重。', en: '⚠️ Challenger emerged in the party!' }, failure: { zh: '🔚 宣布不寻求连任。游戏提前进入结局阶段。', en: '🔚 Announced not seeking re-election.' } }
];
