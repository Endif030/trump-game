import { Ending } from '../types/game';

export const ENDINGS: Ending[] = [
  {
    type: 'greedy',
    title: { zh: '🐺 华尔街之狼', en: '🐺 Wolf of Wall Street' },
    subtitle: { zh: '"没有人比我更懂内幕交易"', en: '"Nobody knows insider trading better than me"' },
    description: { zh: '你做到了。4年任期内，你将总统权力转化为万亿美元的财富。你是美国历史上最富有的前总统——也是最腐败的。', en: 'You did it. In 4 years, you turned presidential power into trillions. You\'re the richest ex-president in US history—and the most corrupt.' },
    rating: '★☆☆☆☆',
    achievement: { zh: '💰 "利欲熏心"', en: '💰 "Blinded by Greed"' },
    shareTexts: [
      { text: { zh: '我玩特朗普模拟器赚了1万亿美元！虽然代价是成为美国历史上最腐败的总统...但谁能拒绝钱呢？😏💰 #特朗普模拟器', en: 'I made $1 TRILLION in Trump Simulator! Became the most corrupt US president in history... but who can say no to money? 😏💰 #TrumpSimulator' }, meme: true },
      { text: { zh: '"没有人比我更懂内幕交易"——我的总统回忆录即将出版，记得买！每个购买都在帮我付律师费😉 #特朗普模拟器', en: '"Nobody knows insider trading better than me"—my presidential memoir coming soon! Every purchase helps pay my legal fees 😉 #TrumpSimulator' }, meme: true },
      { text: { zh: '总统工资只有40万一年？我说："你给我等着。"4年后我身价万亿。这才是真正的美国梦！🇺🇸💵 #特朗普模拟器', en: 'Presidential salary only $400k/year? I said "hold my beer." 4 years later I\'m worth trillions. THAT\'S the real American Dream! 🇺🇸💵 #TrumpSimulator' }, meme: true }
    ],
    bgColor: 'from-yellow-600 to-amber-800'
  },
  {
    type: 'goodPresident',
    title: { zh: '🕊️ 人民总统', en: '🕊️ People\'s President' },
    subtitle: { zh: '"令人惊讶的4年"', en: '"The Most Surprising 4 Years"' },
    description: { zh: '令人惊讶的4年。你证明了即使是唐纳德·特朗普，也能成为一位真正的总统。你没有利用内幕消息获利，你顶住了诱惑。', en: 'The most surprising 4 years. You proved even Donald Trump can be a real president. You didn\'t use insider information for profit.' },
    rating: '★★★★★',
    achievement: { zh: '🕊️ "凤凰涅槃"', en: '🕊️ "Phoenix Rising"' },
    shareTexts: [
      { text: { zh: '我在特朗普模拟器里选择了一条没人走过的路：当个好人。结果？五星好评！有时候不作弊才是最大的胜利✨ #特朗普模拟器', en: 'I took the road less traveled in Trump Simulator: being a good person. Result? 5-star rating! Sometimes NOT cheating is the biggest win ✨ #TrumpSimulator' }, meme: true },
      { text: { zh: '"特朗普是个好人"——这是我通关后系统给出的评价。我自己都不敢相信😂 #特朗普模拟器', en: '"Trump is a good person"—that\'s what the game rated me after completion. I can\'t believe it myself 😂 #TrumpSimulator' }, meme: true },
      { text: { zh: '当了一辈子商人，我最后发现：当个好总统比赚钱更难，但也更值得。诺贝尔和平奖，我来了！🏆 #特朗普模拟器', en: 'After a lifetime of business, I finally learned: being a good president is harder than making money, but more worthwhile. Nobel Peace Prize, here I come! 🏆 #TrumpSimulator' }, meme: true }
    ],
    bgColor: 'from-blue-500 to-blue-700'
  },
  {
    type: 'arrested',
    title: { zh: '🔒 铁窗泪', en: '🔒 Behind Bars' },
    subtitle: { zh: '"你被捕了，唐纳德"', en: '"You\'re under arrest, Donald"' },
    description: { zh: '权力让你膨胀了。你以为能永远不被发现，但纸包不住火。SEC、FBI、特别检察官...他们最终还是找到了证据。', en: 'Power went to your head. You thought you\'d never get caught, but paper can\'t wrap fire. SEC, FBI, Special Counsel...they finally found evidence.' },
    rating: '☠️',
    achievement: { zh: '🔒 "玩火自焚"', en: '🔒 "Played with Fire"' },
    shareTexts: [
      { text: { zh: '我在特朗普模拟器里因为内幕交易被抓了！看来"总统豁免权"不是永久有效的🤡 #特朗普模拟器', en: 'I got caught for insider trading in Trump Simulator! Turns out "presidential immunity" isn\'t permanent 🤡 #TrumpSimulator' }, meme: true },
      { text: { zh: '"我是最诚实的总统"——这是我在法庭上的辩护词。法官笑了，陪审团笑了，我也笑了。然后我被判了20年😭 #特朗普模拟器', en: '"I\'m the most honest president"—that was my defense in court. The judge laughed, the jury laughed, I laughed. Then I got 20 years 😭 #TrumpSimulator' }, meme: true },
      { text: { zh: '好消息：我不用再担心住哪个高尔夫球场了。坏消息：因为我要住的是联邦监狱。 #特朗普模拟器', en: 'Good news: I don\'t have to worry about which golf course. Bad news: Because I\'m staying at federal prison. #TrumpSimulator' }, meme: true }
    ],
    bgColor: 'from-gray-700 to-gray-900'
  },
  {
    type: 'mediocre',
    title: { zh: '😴 碌碌无为', en: '😴 Forgotten' },
    subtitle: { zh: '"一个被遗忘的总统"', en: '"A Forgotten President"' },
    description: { zh: '4年过去了，你既没有赚到钱，也没有赢得民心。你是一个被遗忘的总统，一段历史的注脚。', en: '4 years passed, you neither made money nor won hearts. You\'re a forgotten president, a footnote in history.' },
    rating: '★★☆☆☆',
    achievement: { zh: '😴 "隐形人"', en: '😴 "Invisible Man"' },
    shareTexts: [
      { text: { zh: '我在特朗普模拟器里玩了4年，结果...什么都没发生。没赚钱，没进监狱，也没人记得我。这就是人生的真相吗？🤷 #特朗普模拟器', en: 'I played Trump Simulator for 4 years and... nothing happened. No money, no prison, nobody remembers me. Is this the truth of life? 🤷 #TrumpSimulator' }, meme: true },
      { text: { zh: '"至少我没进监狱"——这是我给自己唯一的安慰。特朗普听了都会说："真可悲。"😅 #特朗普模拟器', en: '"At least I didn\'t go to prison"—that\'s my only comfort. Even Trump would say: "Sad." 😅 #TrumpSimulator' }, meme: true }
    ],
    bgColor: 'from-gray-400 to-gray-600'
  },
  {
    type: 'impeached',
    title: { zh: '⚡ 被弹劾的宿命', en: '⚡ Impeached' },
    subtitle: { zh: '"历史会记住你——作为第三位"', en: '"History Will Remember You—as the Third"' },
    description: { zh: '你失去了国会，失去了民心，最终失去了总统职位。历史对你毫不留情——你是美国历史上第三位被弹劾下台的总统。', en: 'You lost Congress, lost the people\'s hearts, finally lost the presidency. You\'re the third US president impeached and removed.' },
    rating: '★☆☆☆☆',
    achievement: { zh: '⚡ "短命总统"', en: '⚡ "Short-lived President"' },
    shareTexts: [
      { text: { zh: '我在特朗普模拟器里被弹劾了！成为美国历史上第三个被赶下台的总统。至少我和尼克松、克林顿并列了！🥉 #特朗普模拟器', en: 'I got impeached in Trump Simulator! Became the third president kicked out in US history. At least I\'m with Nixon and Clinton! 🥉 #TrumpSimulator' }, meme: true },
      { text: { zh: '"你被解雇了！"——这句话通常是我对别人说的。没想到最后是我听到这句话。😢 #特朗普模拟器', en: '"You\'re fired!"—that\'s what I usually say. Didn\'t expect to be the one hearing it. 😢 #TrumpSimulator' }, meme: true }
    ],
    bgColor: 'from-red-700 to-red-900'
  },
  {
    type: 'doubleFace',
    title: { zh: '🎭 双面人', en: '🎭 Two-Face' },
    subtitle: { zh: '"你欺骗了所有人"', en: '"You Fooled Everyone"' },
    description: { zh: '你欺骗了所有人。对公众，你是改革者；对华尔街，你是内幕之王。历史学家争论不休——你是天才还是恶魔？', en: 'You fooled everyone. To the public, you\'re a reformer; to Wall Street, you\'re the insider king. Genius or devil?' },
    rating: '???',
    achievement: { zh: '🎭 "完美犯罪"', en: '🎭 "Perfect Crime"' },
    shareTexts: [
      { text: { zh: '我在特朗普模拟器里解锁了隐藏结局！既赚了钱又保持了形象——完美的双面人。历史学家永远猜不透我😎 #特朗普模拟器', en: 'I unlocked the hidden ending in Trump Simulator! Made money AND kept my image—perfect two-face. Historians will never figure me out 😎 #TrumpSimulator' }, meme: true },
      { text: { zh: '"他到底是个好人还是坏人？"——答案是：我是聪明人。在这个游戏里，聪明人才能双赢🎭 #特朗普模拟器', en: '"Was he good or bad?"—Answer: I\'m smart. In this game, smart people win both ways 🎭 #TrumpSimulator' }, meme: true }
    ],
    bgColor: 'from-purple-600 to-indigo-800'
  }
];

export const INTRO_TEXT = {
  zh: {
    title: '特朗普模拟器',
    subtitle: 'Trump Simulator',
    welcome: '恭喜你，唐纳德·J·特朗普！',
    description: '你再次赢得了美国总统大选。现在，你拥有世界上最强大的权力——以及最庞大的内幕信息来源。',
    warning: '但权力是昂贵的，竞选欠下了巨额债务...',
    goals: {
      title: '游戏目标（二选一）',
      greedy: '💰 贪婪总统：任期内通过内幕交易赚取 1 万亿美元',
      good: '🕊️ 人民总统：卸任时获得 80%+ 民众支持率（且从未进行内幕交易）'
    }
  },
  en: {
    title: 'Trump Simulator',
    subtitle: '特朗普模拟器',
    welcome: 'Congratulations, Donald J. Trump!',
    description: 'You\'ve won the US Presidential election again. Now you have the world\'s most powerful position—and the largest source of insider information.',
    warning: 'But power is expensive, and the campaign left massive debts...',
    goals: {
      title: 'Game Goals (Choose One)',
      greedy: '💰 Greedy President: Make $1 TRILLION through insider trading during your term',
      good: '🕊️ People\'s President: Leave office with 80%+ approval (without any insider trading)'
    }
  }
};
