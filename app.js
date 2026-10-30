(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const translations = {
    skip:'跳转到正文', navigation:'主导航', mobileNavigation:'手机导航', openMenu:'打开菜单',
    navExperience:'相遇', navHow:'如何开始', navFind:'找到我', sayHello:'打个招呼',
    heroEyebrow:'虚拟的她，此刻与你对话。', heroLine:'霓虹深处，', heroEm:'有个声音。',
    heroDescription:'在你的世界，和她的世界之间。<br>认识 Lapwing，一位 AI 虚拟主播。<br>留一点时间，随意聊聊。',
    startConversation:'和 Lapwing 聊聊', watchStream:'去看直播', heroNote:'一个浏览器，一支麦克风，约三分钟。',
    scroll:'向下，认识她', stripAI:'AI 虚拟角色', stripVoice:'实时语音对话', stripFresh:'每次见面，都从头开始', stripBrowser:'无需下载',
    chapterExperience:'一次相遇', experienceAside:'给日常留一个小小的岔路口',
    experienceLine:'因为好奇而来，', experienceEm:'因为聊天多待一会。',
    experienceDescription:'一个突然冒出的念头，一个奇怪的问题，或是今天让你笑出声的小事。都可以带过来。Lapwing 是一个能和你实时聊天的 AI 角色，打开浏览器就能遇见她。',
    seeHow:'看看怎么开始', voiceArt:'双向语音对话示意图', you:'你', twoWay:'两个声音，同一个瞬间。',
    factShort:'给今天留一点空闲', factLiveValue:'你来，我往', factLive:'边听边说，随时打断', factFreshValue:'重新认识', factFresh:'每次到来，都是新的对话',
    chapterHow:'像聊天一样简单', howLine:'不用准备开场白，', howEm:'一句你好就够了。',
    howDescription:'不必想好该说些什么。<br>开始，其实很简单。',
    micNotice:'语音对话仅限 18 岁及以上。你的声音可能出现在直播中，请勿透露个人隐私。',
    stepOneTitle:'走进来，打个招呼。', stepOneDescription:'点击「和 Lapwing 聊聊」进入语音房间。准备好了，再在那里允许使用麦克风。不用安装应用，一个浏览器标签页就够了。', enterRoom:'进入语音房间',
    stepTwoTitle:'聊到哪儿，就算哪儿。', stepTwoDescription:'说说此刻想到的事。Lapwing 说话时，你也可以开口，想插话就插话。无需等她说完，也不用每次回复都按一个按钮。', stepTwoDetail:'说话 · 聆听 · 插话 · 接着聊',
    stepThreeTitle:'短暂停留，随时再来。', stepThreeDescription:'聊上几分钟，然后继续你的日常。每个会话都会重新开始，Lapwing 不会记住之前的聊天。下次来时，再说一句新的你好。', stepThreeDetail:'一次短聊，一个新的开始。',
    invitation:'邀请你聊一聊', interludeEyebrow:'每段对话，都从一句话开始。', interludeLine:'“嘿，你现在', interludeEm:'在想什么？”',
    chapterCommunity:'对话之外', communityLine:'同一个小小世界，', communityEm:'还有这些相遇的方式。',
    communityDescription:'看看直播，认识同好。<br>或是路过，看看最近的新鲜事。',
    socialWatch:'看看直播', socialHangout:'一起闲聊', socialUpdates:'最近的动态', socialElsewhere:'另一片天空',
    communityNote:'一个 AI 角色，一片共享的空间。请善待这里真实的人。Lapwing 是娱乐体验，每段对话都会从空白开始。',
    lastEyebrow:'接下来的瞬间，交给你。', lastTitle:'说点什么吧。', ctaAria:'开始与 Lapwing 对话',
    footerAI:'AI 虚拟主播，并非真人。', backTop:'回到顶部'
  };
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const ariaNodes = [...document.querySelectorAll('[data-i18n-aria]')];
  const english = new Map(nodes.map(node => [node, node.innerHTML]));
  const englishAria = new Map(ariaNodes.map(node => [node, node.getAttribute('aria-label')]));
  const languageButton = document.querySelector('.language-button');
  const motionButton = document.querySelector('.motion-button');
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* Private storage can be unavailable. */ } }
  };
  let language = storage.get('lapwing-site-language') === 'zh' ? 'zh' : 'en';
  let motion = storage.get('lapwing-site-motion') !== 'off';
  function menuLabel() {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-label', language === 'zh' ? (open ? '关闭菜单' : '打开菜单') : (open ? 'Close menu' : 'Open menu'));
  }
  function updateMotion() {
    const active = motion && !reducedMotion.matches;
    root.classList.toggle('motion-off', !active);
    motionButton.setAttribute('aria-pressed', String(active));
    motionButton.disabled = reducedMotion.matches;
    document.querySelector('[data-motion-label]').textContent = reducedMotion.matches
      ? (language === 'zh' ? '已减少动态' : 'Reduced motion')
      : (language === 'zh' ? (active ? '动态 开' : '动态 关') : (active ? 'Motion on' : 'Motion off'));
  }
  function setLanguage() {
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    nodes.forEach(node => { node.innerHTML = language === 'zh' ? translations[node.dataset.i18n] : english.get(node); });
    ariaNodes.forEach(node => { node.setAttribute('aria-label', language === 'zh' ? translations[node.dataset.i18nAria] : englishAria.get(node)); });
    languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    languageButton.querySelector('.lang-en').classList.toggle('active', language === 'en');
    languageButton.querySelector('.lang-zh').classList.toggle('active', language === 'zh');
    document.title = language === 'zh' ? 'Lapwing — 霓虹深处，有个声音' : 'Lapwing — A voice in the neon';
    document.querySelector('meta[name="description"]').content = language === 'zh'
      ? '认识 Lapwing，一位能与你实时语音聊天的 AI 虚拟主播。打开浏览器，自然对话、随时打断，每次都是新的开始。'
      : 'Meet Lapwing, an AI virtual streamer. Step into a short browser voice conversation. Talk naturally, interrupt anytime, and start fresh.';
    menuLabel(); updateMotion();
  }
  function closeMenu(returnFocus = false) {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuLabel();
    if (returnFocus) menuButton.focus();
  }
  languageButton.addEventListener('click', () => { language = language === 'en' ? 'zh' : 'en'; storage.set('lapwing-site-language', language); setLanguage(); });
  motionButton.addEventListener('click', () => { motion = !motion; storage.set('lapwing-site-motion', motion ? 'on' : 'off'); updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; mobileNav.hidden = open; menuButton.setAttribute('aria-expanded', String(!open)); menuLabel(); });
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
  document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.addEventListener('visibilitychange', () => root.classList.toggle('page-hidden', document.hidden));
  document.getElementById('year').textContent = String(new Date().getFullYear());
  // Decorative rain only; no microphone, audio, backend connection or simulated live activity.
  const rain = document.getElementById('rain');
  for (let index = 0; index < 24; index++) {
    const streak = document.createElement('i');
    streak.style.cssText = `--x:${(index * 37.7) % 100}%;--length:${25 + (index * 13) % 70}px;--opacity:${.1 + (index % 4) * .05};--duration:${1.3 + (index % 7) * .2}s;--delay:${-index * .7}s`;
    rain.append(streak);
  }
  setLanguage();
})();
