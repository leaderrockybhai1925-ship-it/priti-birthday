(() => {
  const pad = (value) => String(value).padStart(2, '0');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const birthdayText = window.BIRTHDAY_SITE_CONFIG;
  const animationSpeed = Math.min(2, Math.max(0.5, Number(birthdayText.animationSpeed) || 1));
  const safeRichText = (element, value) => {
    const template = document.createElement('template');
    template.innerHTML = String(value ?? '');
    const copyAllowedNodes = (source, target) => {
      Array.from(source.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const lines = node.textContent.split('\n');
          lines.forEach((line, index) => {
            if (index) target.append(document.createElement('br'));
            target.append(document.createTextNode(line));
          });
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
          target.append(document.createElement('br'));
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'EM') {
          const emphasis = document.createElement('em');
          copyAllowedNodes(node, emphasis);
          target.append(emphasis);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          copyAllowedNodes(node, target);
        }
      });
    };
    const fragment = document.createDocumentFragment();
    copyAllowedNodes(template.content, fragment);
    element.replaceChildren(fragment);
  };

  function applyBirthText() {
    const wordmark = document.getElementById('chapter-home');
    if (wordmark) {
      const mark = document.createElement('span');
      mark.className = 'wordmark-mark';
      mark.textContent = String(birthdayText.personalName || '?').slice(0, 1).toUpperCase();
      const label = document.createElement('span');
      label.append(`for ${birthdayText.personalName || 'you'} `);
      const heart = document.createElement('span');
      heart.className = 'wordmark-heart';
      heart.innerHTML = '&#10084;';
      label.append(heart);
      wordmark.replaceChildren(mark, label);
    }

    const siteFooter = document.querySelector('.site-footer span');
    if (siteFooter) {
      siteFooter.textContent = `Made for ${birthdayText.personalName}, with love.`;
    }
    document.title = `For ${birthdayText.personalName}, with love`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `A birthday surprise made with love for ${birthdayText.personalName}.`;

    const heroEyebrow = document.querySelector('.hero .eyebrow');
    if (heroEyebrow) {
      const line = document.createElement('span');
      line.className = 'eyebrow-line';
      heroEyebrow.replaceChildren(line, document.createTextNode(` ${birthdayText.home.eyebrow}`));
    }

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) safeRichText(heroTitle, birthdayText.home.title);

    const heroIntro = document.querySelector('.hero-intro');
    if (heroIntro) heroIntro.textContent = birthdayText.home.intro;
    const heroCaption = document.querySelector('.hero-caption');
    if (heroCaption) heroCaption.textContent = birthdayText.home.heroCaption;

    const textLink = document.querySelector('.text-link');
    if (textLink) {
      const heart = document.createElement('span');
      heart.setAttribute('aria-hidden', 'true');
      heart.innerHTML = '&#10084;';
      textLink.replaceChildren(document.createTextNode(birthdayText.home.callout), heart);
    }

    const countdownCaption = document.getElementById('countdown-caption');
    if (countdownCaption) countdownCaption.textContent = birthdayText.home.countdownCaption;

    const countdownNote = document.getElementById('countdown-note');
    if (countdownNote) countdownNote.textContent = birthdayText.home.countdownNote;
    const setSectionKicker = (section, text) => {
      const label = document.querySelector(`${section} .section-kicker span:last-child`);
      if (label) label.textContent = text;
    };

    setSectionKicker('#letter', birthdayText.letter.sectionKicker);
    setSectionKicker('#gallery', birthdayText.gallery.sectionKicker);
    setSectionKicker('#memories', birthdayText.memories.sectionKicker);
    setSectionKicker('#surprise', birthdayText.surprise.sectionKicker);
    setSectionKicker('#cake', birthdayText.cake.sectionKicker);

    const letterTitle = document.getElementById('letter-title');
    if (letterTitle) safeRichText(letterTitle, birthdayText.letter.title);

    const letterEyebrow = document.querySelector('#letter .eyebrow');
    if (letterEyebrow) letterEyebrow.textContent = birthdayText.letter.eyebrow;

    const letterAside = document.querySelector('#letter .section-aside');
    if (letterAside) letterAside.textContent = birthdayText.letter.aside;

    const letterButton = document.getElementById('letter-button-label');
    if (letterButton) letterButton.textContent = birthdayText.letter.buttonOpen;

    const letterPaper = document.querySelector('#love-letter .letter-paper');
    if (letterPaper) {
      const dateEl = letterPaper.querySelector('.letter-date');
      if (dateEl) {
        dateEl.replaceChildren(document.createTextNode(birthdayText.letter.date));
        const star = document.createElement('span');
        star.setAttribute('aria-hidden', 'true');
        star.innerHTML = '&#10022;';
        dateEl.append(' ', star);
      }
      const greeting = letterPaper.querySelector('.letter-greeting');
      if (greeting) greeting.textContent = birthdayText.letter.greeting;
      const paperInner = letterPaper.querySelector('.letter-paper-inner');
      const paragraphs = Array.from(paperInner.querySelectorAll(':scope > p:not(.letter-date):not(.letter-greeting):not(.letter-signoff)'));
      paragraphs.forEach((paragraph) => paragraph.remove());
      const signoff = letterPaper.querySelector('.letter-signoff');
      const configuredParagraphs = birthdayText.letter.paragraphs.map((text) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        return paragraph;
      });
      signoff.before(...configuredParagraphs);
      if (signoff) {
        const heart = document.createElement('span');
        heart.innerHTML = '&#10084;';
        signoff.replaceChildren(document.createTextNode(birthdayText.letter.signoff), document.createElement('br'), heart);
      }
    }

    const galleryTitle = document.getElementById('gallery-title');
    if (galleryTitle) safeRichText(galleryTitle, birthdayText.gallery.title);
    setSectionKicker('#gallery', birthdayText.gallery.sectionKicker);
    const galleryEyebrow = document.querySelector('#gallery .eyebrow');
    if (galleryEyebrow) galleryEyebrow.textContent = birthdayText.gallery.eyebrow;
    const galleryAside = document.querySelector('#gallery .section-aside');
    if (galleryAside) galleryAside.textContent = birthdayText.gallery.aside;

    const memoriesTitle = document.getElementById('memories-title');
    if (memoriesTitle) safeRichText(memoriesTitle, birthdayText.memories.title);
    const memoriesEyebrow = document.querySelector('#memories .eyebrow');
    if (memoriesEyebrow) memoriesEyebrow.textContent = birthdayText.memories.eyebrow;
    const memoriesAside = document.querySelector('#memories .section-aside');
    if (memoriesAside) memoriesAside.textContent = birthdayText.memories.aside;
    document.querySelectorAll('#memories .timeline-entry').forEach((entry, index) => {
      const item = birthdayText.memories.timeline[index];
      if (!item) return;
      const marker = entry.querySelector('.timeline-date');
      const title = entry.querySelector('h3');
      const body = entry.querySelector('p:last-of-type');
      if (marker) marker.textContent = item.marker;
      if (title) title.textContent = item.title;
      if (body) body.textContent = item.body;
    });

    const surpriseTitle = document.getElementById('surprise-title');
    if (surpriseTitle) safeRichText(surpriseTitle, birthdayText.surprise.title);
    const surpriseEyebrow = document.querySelector('#surprise .eyebrow');
    if (surpriseEyebrow) surpriseEyebrow.textContent = birthdayText.surprise.eyebrow;
    const surpriseAside = document.querySelector('#surprise .section-aside');
    if (surpriseAside) surpriseAside.textContent = birthdayText.surprise.aside;

    const giftLetterCopy = document.getElementById('gift-letter-copy');
    if (giftLetterCopy) {
      giftLetterCopy.replaceChildren(...birthdayText.surprise.letterParagraphs.map((text) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        return paragraph;
      }));
    }
    const giftHint = document.getElementById('gift-hint');
    if (giftHint) giftHint.textContent = birthdayText.surprise.hintOpen;

    const cakeTitle = document.getElementById('cake-title');
    if (cakeTitle) safeRichText(cakeTitle, birthdayText.cake.title);
    const cakeEyebrow = document.querySelector('#cake .eyebrow');
    if (cakeEyebrow) cakeEyebrow.textContent = birthdayText.cake.eyebrow;
    const cakeAside = document.querySelector('#cake .section-aside');
    if (cakeAside) cakeAside.textContent = birthdayText.cake.aside;
    const cakeStatus = document.getElementById('cake-status');
    if (cakeStatus) cakeStatus.textContent = birthdayText.cake.statusOn;

    const finaleNote = document.getElementById('finale-note');
    if (finaleNote) finaleNote.textContent = birthdayText.finale.note;
    const finaleCredit = document.querySelector('.finale-credit');
    if (finaleCredit) finaleCredit.textContent = birthdayText.creatorCredit || '';
    document.getElementById('countdown-caption').textContent = birthdayText.home.countdownCaption;
    document.getElementById('countdown-note').textContent = birthdayText.home.countdownNote;
  }

  function nextBirthday(now = new Date()) {
    let year = now.getFullYear();
    const birthdayMonth = Math.min(11, Math.max(0, Number(birthdayText.birthday.month) || 0));
    const birthdayDay = Math.min(31, Math.max(1, Number(birthdayText.birthday.day) || 1));
    let target = new Date(year, birthdayMonth, birthdayDay, 0, 0, 0, 0);
    const isBirthday = now.getMonth() === birthdayMonth && now.getDate() === birthdayDay;
    if (target <= now && !isBirthday) target = new Date(year + 1, birthdayMonth, birthdayDay, 0, 0, 0, 0);
    return target;
  }

  const countdownTarget = nextBirthday();
  const birthdayLabel = countdownTarget.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const caption = document.getElementById('countdown-caption');
  const countdownNote = document.getElementById('countdown-note');
  birthdayText.home.countdownCaption = `Counting down to ${birthdayLabel}`;
  applyBirthText();
  caption.textContent = birthdayText.home.countdownCaption;

  function updateCountdown() {
    const remaining = Math.max(0, countdownTarget.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    document.getElementById('days').textContent = pad(Math.floor(totalSeconds / 86400));
    document.getElementById('hours').textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    document.getElementById('minutes').textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    document.getElementById('seconds').textContent = pad(totalSeconds % 60);
    if (remaining === 0) {
      caption.textContent = birthdayText.home.birthdayCaption;
      countdownNote.textContent = birthdayText.home.birthdayNote;
    }
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3600);
  }

  const letterToggle = document.getElementById('letter-toggle');
  const loveLetter = document.getElementById('love-letter');
  const letterLabel = document.getElementById('letter-button-label');
  const initialLetterOpen = false;
  letterToggle.setAttribute('aria-expanded', String(initialLetterOpen));
  loveLetter.hidden = !initialLetterOpen;
  letterLabel.textContent = initialLetterOpen ? birthdayText.letter.buttonClose : birthdayText.letter.buttonOpen;
  letterToggle.addEventListener('click', () => {
    const open = letterToggle.getAttribute('aria-expanded') !== 'true';
    letterToggle.setAttribute('aria-expanded', String(open));
    loveLetter.hidden = !open;
    letterLabel.textContent = open ? birthdayText.letter.buttonClose : birthdayText.letter.buttonOpen;
  });

  document.querySelectorAll('[data-photo-frame]').forEach((frame) => {
    const input = frame.querySelector('input[type="file"]');
    if (!input) return;
    const image = frame.querySelector('img');
    const placeholder = frame.querySelector('.photo-placeholder');
    let activeUrl = null;
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast(birthdayText.toast.invalidImage);
        input.value = '';
        return;
      }
      if (activeUrl) URL.revokeObjectURL(activeUrl);
      const objectUrl = URL.createObjectURL(file);
      activeUrl = objectUrl;
      image.src = objectUrl;
      image.hidden = false;
      placeholder.hidden = true;
      image.onload = () => URL.revokeObjectURL(objectUrl);
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        image.hidden = true;
        placeholder.hidden = false;
        showToast(birthdayText.toast.imageError);
      };
    });
  });

  // One audio controller prevents tracks overlapping and keeps mute state global.
  const audioTracks = {
    happy: new Audio('assets/audio/happy-birthday.mp3'),
    gift: new Audio('assets/audio/gift-music.mp3'),
    candle: new Audio('assets/audio/candle-music.mp3'),
    fireworks: new Audio('assets/audio/fireworks.mp3')
  };
  Object.values(audioTracks).forEach((track) => { track.preload = 'auto'; track.volume = 0.72; });
  audioTracks.happy.loop = true;
  let audioMuted = false;
  let currentAudioMode = 'happy';
  let attemptedAutoplay = false;
  let lastAudioWarning = '';

  function pauseAllAudio(reset = false) {
    Object.values(audioTracks).forEach((track) => {
      track.pause();
      if (reset) { try { track.currentTime = 0; } catch (_) {} }
    });
  }

  async function playAudioMode(mode, restart = false) {
    currentAudioMode = audioTracks[mode] ? mode : 'happy';
    if (audioMuted) { pauseAllAudio(); return false; }
    const chosen = audioTracks[currentAudioMode];
    Object.entries(audioTracks).forEach(([name, track]) => {
      if (track !== chosen) { track.pause(); try { track.currentTime = 0; } catch (_) {} }
    });
    if (restart) { try { chosen.currentTime = 0; } catch (_) {} }
    try {
      await chosen.play();
      lastAudioWarning = '';
      return true;
    } catch (_) {
      // Missing files and browser autoplay restrictions must never break the page.
      if (lastAudioWarning !== currentAudioMode && chosen.error) {
        lastAudioWarning = currentAudioMode;
      }
      return false;
    }
  }

  function playHappyBirthdayClip() { return playAudioMode('happy', true); }
  audioTracks.gift.addEventListener('ended', () => {
    if (!audioMuted && currentAudioMode === 'gift') playAudioMode('happy', true);
  });
  audioTracks.candle.addEventListener('ended', () => {
    if (!audioMuted && currentAudioMode === 'candle') playAudioMode('happy', true);
  });
  Object.values(audioTracks).forEach((track) => {
    track.addEventListener('error', () => { /* Audio is optional; visuals continue normally. */ });
  });

  const giftBox = document.getElementById('gift-box');
  const giftReveal = document.getElementById('gift-reveal');
  const flyingKissGif = document.getElementById('flying-kiss-gif');
  const kissFallback = document.getElementById('kiss-fallback');
  const giftHint = document.getElementById('gift-hint');
  const giftDurationMs = Math.min(120000, Math.max(5000, Number(birthdayText.surprise.durationMs) || 35000));
  let giftOpened = false;
  let giftTimer = null;
  let giftTimerInterval = null;
  let giftDeadline = 0;
  let giftRun = 0;
  let giftTransitioning = false;

  function clearGiftTimer() {
    giftRun += 1;
    window.clearTimeout(giftTimer);
    window.clearInterval(giftTimerInterval);
    giftTimer = null;
    giftTimerInterval = null;
  }

  function resetGiftExperience() {
    clearGiftTimer();
    giftOpened = false;
    giftTransitioning = false;
    giftBox.classList.remove('open');
    giftBox.setAttribute('aria-expanded', 'false');
    giftReveal.hidden = true;
    flyingKissGif.hidden = true;
    flyingKissGif.removeAttribute('src');
    kissFallback.hidden = true;
    giftHint.textContent = birthdayText.surprise.hintOpen;
  }

  function updateGiftTimer() {
    if (!giftOpened || chapterIndex !== 4 || chapters[4].hidden || !chapters[4].classList.contains('active')) return;
    const remaining = Math.max(0, giftDeadline - Date.now());
    const secondsLeft = Math.ceil(remaining / 1000);
    chapterNext.disabled = false;
    chapterNextLabel.textContent = 'Next';
    chapterWait.textContent = `Continuing in ${secondsLeft} seconds.`;
  }

  function openGiftExperience() {
    if (giftOpened || chapterIndex !== 4 || chapters[4].hidden) return;
    giftOpened = true;
    playAudioMode('gift', true);
    giftBox.classList.add('open');
    giftBox.setAttribute('aria-expanded', 'true');
    giftReveal.hidden = false;
    giftHint.textContent = birthdayText.surprise.hintClosed;

    const activeRun = giftRun;
    kissFallback.hidden = false;
    flyingKissGif.onload = () => {
      if (activeRun !== giftRun || !giftOpened) return;
      flyingKissGif.hidden = false;
      kissFallback.hidden = true;
    };
    flyingKissGif.onerror = () => {
      if (activeRun !== giftRun || !giftOpened) return;
      flyingKissGif.hidden = true;
      kissFallback.hidden = false;
    };
    if (birthdayText.surprise.flyingKissGif) {
      flyingKissGif.src = birthdayText.surprise.flyingKissGif;
    } else {
      flyingKissGif.hidden = true;
      kissFallback.hidden = false;
    }

    giftDeadline = Date.now() + giftDurationMs;
    updateGiftTimer();
    giftTimerInterval = window.setInterval(updateGiftTimer, 250);
    giftTimer = window.setTimeout(() => {
      if (activeRun !== giftRun || giftTransitioning || !giftOpened || chapterIndex !== 4 || chapters[4].hidden || !chapters[4].classList.contains('active')) return;
      giftTransitioning = true;
      clearGiftTimer();
      showChapter(5);
    }, giftDurationMs);
  }

  giftBox.addEventListener('click', openGiftExperience);

  const cakeSection = document.getElementById('cake');
  const candleStage = document.getElementById('candle-stage');
  const cakeStatus = document.getElementById('cake-status');
  const wishButton = document.getElementById('wish-button');
  const lightsToggle = document.getElementById('lights-toggle');
  const blowCandleButton = document.getElementById('blow-candle');
  let candleSequenceTimeout = null;
  let candleExtinguishTimeout = null;
  let candleAutoAdvanceTimeout = null;
  let candleSequenceRun = 0;
  let candleLit = false;
  let wishHasBeenMade = false;
  let candleExtinguishing = false;
  let candleTransitioning = false;

  function stopCandleScene() {
    candleSequenceRun += 1;
    window.clearTimeout(candleSequenceTimeout);
    window.clearTimeout(candleExtinguishTimeout);
    window.clearTimeout(candleAutoAdvanceTimeout);
    candleSequenceTimeout = null;
    candleExtinguishTimeout = null;
    candleAutoAdvanceTimeout = null;
    candleStage.classList.remove('is-active', 'lighting-sequence', 'is-lit', 'is-blowing', 'is-extinguished', 'is-smoking', 'lights-off');
    cakeSection.classList.remove('lights-off');
    lightsToggle.setAttribute('aria-pressed', 'false');
    lightsToggle.querySelector('span').textContent = 'Turn Off the Lights';
    lightsToggle.disabled = true;
    wishButton.setAttribute('aria-pressed', 'false');
    wishButton.disabled = true;
    wishHasBeenMade = false;
    blowCandleButton.disabled = true;
    candleLit = false;
    candleExtinguishing = false;
    candleTransitioning = false;
    cakeStatus.textContent = birthdayText.cake.statusOn;
  }

  function startCandleScene() {
    playAudioMode('candle', true);
    if (chapterIndex !== 5 || chapters[5].hidden) return;
    stopCandleScene();
    const lightingDuration = Math.min(20000, Math.max(1000, Number(birthdayText.cake.lightingDurationMs) || 6400)) / animationSpeed;
    candleStage.style.setProperty('--candle-lighting-duration', `${lightingDuration}ms`);
    candleStage.style.setProperty('--candle-match-duration', `${lightingDuration * 0.96875}ms`);
    candleStage.style.setProperty('--candle-ignite-delay', `${lightingDuration * 0.65625}ms`);
    candleStage.style.setProperty('--candle-ignite-duration', `${lightingDuration * 0.1015625}ms`);
    candleStage.style.setProperty('--candle-core-delay', `${lightingDuration * 0.7421875}ms`);
    candleStage.style.setProperty('--candle-spark-delay', `${lightingDuration * 0.1640625}ms`);
    candleStage.style.setProperty('--candle-spark-duration', `${lightingDuration * 0.0859375}ms`);
    candleStage.style.setProperty('--candle-match-flame-delay', `${lightingDuration * 0.2}ms`);
    candleStage.style.setProperty('--candle-match-flame-duration', `${lightingDuration * 0.0625}ms`);
    candleStage.style.setProperty('--candle-flame-flicker-delay', `${lightingDuration * 0.2625}ms`);
    candleStage.style.setProperty('--candle-blow-duration', `${Math.min(10000, Math.max(300, Number(birthdayText.cake.extinguishDurationMs) || 1800)) / animationSpeed}ms`);
    const activeRun = candleSequenceRun;
    candleStage.classList.add('is-active', 'lighting-sequence');
    candleSequenceTimeout = window.setTimeout(() => {
      if (activeRun !== candleSequenceRun || chapterIndex !== 5 || chapters[5].hidden || !chapters[5].classList.contains('active')) return;
      candleSequenceTimeout = null;
      candleStage.classList.remove('lighting-sequence');
      candleStage.classList.add('is-lit');
      candleLit = true;
      wishButton.disabled = false;
      lightsToggle.disabled = false;
      blowCandleButton.disabled = false;
    }, lightingDuration);
  }

  wishButton.addEventListener('click', () => {
    if (!candleLit || candleExtinguishing || chapterIndex !== 5 || chapters[5].hidden || wishHasBeenMade) return;
    wishHasBeenMade = true;
    wishButton.setAttribute('aria-pressed', 'true');
    cakeStatus.textContent = birthdayText.cake.statusOff;
    showToast(birthdayText.toast.wish);
  });

  lightsToggle.addEventListener('click', () => {
    if (!candleLit || candleExtinguishing || chapterIndex !== 5 || chapters[5].hidden) return;
    const lightsOff = lightsToggle.getAttribute('aria-pressed') !== 'true';
    lightsToggle.setAttribute('aria-pressed', String(lightsOff));
    lightsToggle.querySelector('span').textContent = lightsOff ? 'Turn On the Lights' : 'Turn Off the Lights';
    candleStage.classList.toggle('lights-off', lightsOff);
    cakeSection.classList.toggle('lights-off', lightsOff);
  });

  blowCandleButton.addEventListener('click', () => {
    if (!candleLit || candleExtinguishing || chapterIndex !== 5 || chapters[5].hidden) return;
    candleExtinguishing = true;
    playAudioMode('candle', true);
    blowCandleButton.disabled = true;
    wishButton.disabled = true;
    lightsToggle.disabled = true;
    const activeRun = candleSequenceRun;
    candleStage.classList.add('is-blowing');

    candleExtinguishTimeout = window.setTimeout(() => {
      if (activeRun !== candleSequenceRun || !candleExtinguishing || chapterIndex !== 5 || chapters[5].hidden || !chapters[5].classList.contains('active')) return;
      candleLit = false;
      candleStage.classList.remove('is-lit', 'is-blowing');
      candleStage.classList.add('is-extinguished', 'is-smoking');
      cakeStatus.textContent = birthdayText.cake.statusOff;
      candleExtinguishTimeout = null;
    }, Math.min(10000, Math.max(300, Number(birthdayText.cake.extinguishDurationMs) || 1800)) / animationSpeed);

    candleAutoAdvanceTimeout = window.setTimeout(() => {
      if (activeRun !== candleSequenceRun || candleTransitioning || !candleExtinguishing || candleLit || chapterIndex !== 5 || chapters[5].hidden || !chapters[5].classList.contains('active') || !candleStage.classList.contains('is-extinguished') || !candleStage.classList.contains('is-smoking')) return;
      candleTransitioning = true;
      window.clearTimeout(candleExtinguishTimeout);
      candleExtinguishTimeout = null;
      window.clearTimeout(candleAutoAdvanceTimeout);
      candleAutoAdvanceTimeout = null;
      showChapter(6);
    }, Math.min(20000, Math.max(1000, Number(birthdayText.cake.transitionDurationMs) || 6500)) / animationSpeed);
  });

  const gallerySlideImage = document.getElementById('gallery-slide-image');
  const gallerySlideCaption = document.getElementById('gallery-slide-caption');
  let gallerySlideIndex = 0;
  let galleryLoopTimer = null;
  let galleryAutoAdvanceBlocked = false;

  function stopGallerySlideshow() {
    if (galleryLoopTimer) {
      window.clearTimeout(galleryLoopTimer);
      galleryLoopTimer = null;
    }
  }

  function renderGallerySlide(index) {
    if (!gallerySlideImage || !gallerySlideCaption) return;
    const slides = birthdayText.gallerySlideshow.slides;
    const slide = slides[index] || slides[0];
    if (!slide) return;

    const fallbackImage = 'assets/photos/placeholder-photo.svg';
    gallerySlideImage.onerror = () => {
      gallerySlideImage.hidden = true;
      gallerySlideCaption.textContent = 'This photo is unavailable.';
    };
    const image = new Image();
    image.onload = () => {
      gallerySlideImage.classList.remove('is-visible');
      gallerySlideImage.src = slide.src;
      gallerySlideImage.hidden = false;
      gallerySlideImage.alt = slide.caption || 'Birthday memory';
      gallerySlideCaption.textContent = slide.caption || 'Replace with your caption';
      requestAnimationFrame(() => gallerySlideImage.classList.add('is-visible'));
    };
    image.onerror = () => {
      gallerySlideImage.classList.remove('is-visible');
      gallerySlideImage.src = fallbackImage;
      gallerySlideImage.alt = 'Photo missing';
      gallerySlideCaption.textContent = slide.caption || 'Add your own photo to this slide.';
      gallerySlideImage.hidden = false;
      requestAnimationFrame(() => gallerySlideImage.classList.add('is-visible'));
    };
    image.src = slide.src || fallbackImage;
  }

  function scheduleGalleryAdvance() {
    const slides = birthdayText.gallerySlideshow.slides;
    if (!slides.length) return;

    stopGallerySlideshow();
    galleryLoopTimer = window.setTimeout(() => {
      if (!galleryAutoAdvanceBlocked) {
        if (gallerySlideIndex >= slides.length - 1) {
          galleryAutoAdvanceBlocked = true;
          stopGallerySlideshow();
          showChapter(3);
          return;
        }

        gallerySlideIndex += 1;
        renderGallerySlide(gallerySlideIndex);
        scheduleGalleryAdvance();
      }
    }, birthdayText.gallerySlideshow.durationMs);
  }

  function startGallerySlideshow() {
    const slides = birthdayText.gallerySlideshow.slides;
    if (!slides.length) return;

    galleryAutoAdvanceBlocked = false;
    gallerySlideIndex = 0;
    stopGallerySlideshow();
    renderGallerySlide(gallerySlideIndex);
    scheduleGalleryAdvance();
  }

  const musicButton = document.getElementById('music-toggle');
  const musicLabel = musicButton.querySelector('.music-label');

  function updateMusicButton() {
    musicButton.setAttribute('aria-pressed', String(audioMuted));
    musicButton.title = audioMuted ? 'Unmute music' : 'Mute music';
    musicLabel.textContent = audioMuted ? 'Unmute music' : 'Mute music';
    musicButton.querySelector('.music-icon').textContent = audioMuted ? '♪̸' : '♫';
  }

  musicButton.addEventListener('click', async () => {
    audioMuted = !audioMuted;
    updateMusicButton();
    if (audioMuted) pauseAllAudio();
    else await playAudioMode(currentAudioMode, false);
  });

  // Try immediately; if the browser blocks sound autoplay, retry on the first visitor gesture.
  function attemptInitialAudio() {
    if (attemptedAutoplay || audioMuted) return;
    attemptedAutoplay = true;
    playAudioMode('happy', false);
  }
  updateMusicButton();
  attemptInitialAudio();
  ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
    document.addEventListener(eventName, () => {
      if (!audioMuted && audioTracks[currentAudioMode].paused) playAudioMode(currentAudioMode, false);
    }, { once: true, passive: true });
  });

  const starCanvas = document.getElementById('starfield');
  const starContext = starCanvas.getContext('2d');
  let stars = [];
  let starWidth = 0;
  let starHeight = 0;
  let starFrame;

  function resizeStars() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    starWidth = window.innerWidth;
    starHeight = window.innerHeight;
    starCanvas.width = starWidth * ratio;
    starCanvas.height = starHeight * ratio;
    starCanvas.style.width = `${starWidth}px`;
    starCanvas.style.height = `${starHeight}px`;
    starContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(115, Math.floor((starWidth * starHeight) / 11000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * starWidth,
      y: Math.random() * starHeight,
      radius: Math.random() * 1.35 + 0.35,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0015 + 0.00045
    }));
  }

  function drawStars(time) {
    if (document.hidden || document.body.classList.contains('finale-active')) {
      starFrame = null;
      return;
    }
    starContext.clearRect(0, 0, starWidth, starHeight);
    stars.forEach((star) => {
      const alpha = reducedMotion ? 0.55 : 0.23 + (Math.sin(time * star.speed + star.phase) + 1) * 0.28;
      starContext.beginPath();
      starContext.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starContext.fillStyle = `rgba(255, 232, 208, ${alpha})`;
      starContext.fill();
    });
    if (!reducedMotion) starFrame = window.requestAnimationFrame(drawStars);
    else starFrame = null;
  }

  function refreshStars() {
    window.cancelAnimationFrame(starFrame);
    starFrame = null;
    if (document.hidden || document.body.classList.contains('finale-active')) return;
    if (reducedMotion) drawStars(0);
    else starFrame = window.requestAnimationFrame(drawStars);
  }

  resizeStars();
  refreshStars();
  window.addEventListener('resize', () => {
    resizeStars();
    refreshStars();
  }, { passive: true });
  document.addEventListener('visibilitychange', refreshStars);

  const heartContainer = document.getElementById('floating-hearts');
  if (!reducedMotion) {
    window.setInterval(() => {
      if (document.hidden || heartContainer.childElementCount > 7) return;
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = Math.random() > 0.5 ? '\u2665' : '\u2661';
      heart.style.left = `${Math.random() * 96}%`;
      heart.style.setProperty('--size', `${12 + Math.random() * 11}px`);
      heart.style.setProperty('--duration', `${8 + Math.random() * 5}s`);
      heart.style.setProperty('--drift', `${Math.round(Math.random() * 100 - 50)}px`);
      heart.addEventListener('animationend', () => heart.remove(), { once: true });
      heartContainer.append(heart);
    }, 1900);
  }

  const fireworksCanvas = document.getElementById('fireworks');
  const fireworkContext = fireworksCanvas.getContext('2d', { alpha: true, desynchronized: true });
  const finaleMessage = document.getElementById('finale-note');
  const fireworkColors = (Array.isArray(birthdayText.fireworks.colors) ? birthdayText.fireworks.colors : [])
    .filter((color) => /^#[0-9a-f]{6}$/i.test(color))
    .map((color) => {
      const red = parseInt(color.slice(1, 3), 16) / 255;
      const green = parseInt(color.slice(3, 5), 16) / 255;
      const blue = parseInt(color.slice(5, 7), 16) / 255;
      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      const difference = max - min;
      let hue = 0;
      if (difference) {
        if (max === red) hue = ((green - blue) / difference) % 6;
        else if (max === green) hue = (blue - red) / difference + 2;
        else hue = (red - green) / difference + 4;
      }
      return (hue * 60 + 360) % 360;
    });
  if (!fireworkColors.length) fireworkColors.push(330, 292, 45);
  const fireworkEffect = ['classic', 'sparkle', 'willow'].includes(birthdayText.fireworks.effect) ? birthdayText.fireworks.effect : 'classic';
  const fireworkParticleCount = Math.min(140, Math.max(30, Number(birthdayText.fireworks.particleCount) || 92));
  let fireworkFrame = null;
  let fireworkParticles = [];
  let fireworkRockets = [];
  let finaleFireworksActive = false;
  let fireworkNextLaunchAt = 0;
  let fireworkLastFrame = 0;

  function resizeFireworks() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    fireworksCanvas.width = Math.round(window.innerWidth * ratio);
    fireworksCanvas.height = Math.round(window.innerHeight * ratio);
    fireworksCanvas.style.width = `${window.innerWidth}px`;
    fireworksCanvas.style.height = `${window.innerHeight}px`;
    fireworkContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (finaleFireworksActive && reducedMotion) drawStaticFinale();
  }
  resizeFireworks();
  window.addEventListener('resize', resizeFireworks, { passive: true });

  let finaleMessageTimerOne = null;
  let finaleMessageTimerTwo = null;

  function showFinaleMessage() {
    // The finale copy is revealed by the timed sequence in startFinaleFireworks().
  }

  function drawStaticBurst(x, y, radius, hue, amount = 56) {
    fireworkContext.strokeStyle = `hsla(${hue}, 100%, 77%, 0.7)`;
    fireworkContext.fillStyle = `hsla(${hue}, 100%, 82%, 0.95)`;
    fireworkContext.lineWidth = 1.2;
    for (let index = 0; index < amount; index += 1) {
      const angle = (Math.PI * 2 * index) / amount;
      const distance = radius * (0.72 + Math.random() * 0.28);
      const endX = x + Math.cos(angle) * distance;
      const endY = y + Math.sin(angle) * distance;
      fireworkContext.beginPath();
      fireworkContext.moveTo(x, y);
      fireworkContext.lineTo(endX, endY);
      fireworkContext.stroke();
      fireworkContext.beginPath();
      fireworkContext.arc(endX, endY, 1.5 + Math.random() * 1.4, 0, Math.PI * 2);
      fireworkContext.fill();
    }
  }

  function drawStaticFinale() {
    fireworkContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    fireworkContext.globalCompositeOperation = 'lighter';
    drawStaticBurst(window.innerWidth * 0.23, window.innerHeight * 0.32, Math.min(window.innerWidth * 0.13, 110), fireworkColors[0]);
    drawStaticBurst(window.innerWidth * 0.76, window.innerHeight * 0.26, Math.min(window.innerWidth * 0.16, 130), fireworkColors[3 % fireworkColors.length]);
    drawStaticBurst(window.innerWidth * 0.52, window.innerHeight * 0.58, Math.min(window.innerWidth * 0.11, 90), fireworkColors[1 % fireworkColors.length], 44);
    fireworkContext.globalCompositeOperation = 'source-over';
  }

  function explodeFirework(rocket) {
    const mobile = window.innerWidth < 600;
    const amount = mobile ? Math.max(30, Math.round(fireworkParticleCount * 54 / 92)) : fireworkParticleCount;
    const maxParticles = mobile ? 650 : 1500;
    for (let index = 0; index < amount; index += 1) {
      const angle = (Math.PI * 2 * index) / amount + (Math.random() - 0.5) * 0.035;
      const speed = 1.15 + Math.random() * (mobile ? 2.8 : 4.1);
      const hue = fireworkEffect === 'classic'
        ? index % 17 === 0 ? 45 : index % 23 === 0 ? 0 : rocket.hue + (Math.random() - 0.5) * 10
        : rocket.hue + (Math.random() - 0.5) * 10;
      fireworkParticles.push({
        x: rocket.x,
        y: rocket.y,
        previousX: rocket.x,
        previousY: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: fireworkEffect === 'willow' ? 0.07 : index % 9 === 0 ? 0.075 : 0.032,
        drag: fireworkEffect === 'willow' ? 0.979 : 0.986,
        life: 1,
        decay: (fireworkEffect === 'willow' ? 0.006 : 0.008) + Math.random() * 0.011,
        size: 0.8 + Math.random() * (mobile ? 1.5 : 2.1) * (fireworkEffect === 'sparkle' ? 1.25 : 1),
        hue
      });
    }
    if (fireworkParticles.length > maxParticles) fireworkParticles.splice(0, fireworkParticles.length - maxParticles);
    showFinaleMessage();
  }

  function launchFirework() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = width * (0.12 + Math.random() * 0.76);
    const targetX = Math.max(width * 0.08, Math.min(width * 0.92, x + (Math.random() - 0.5) * width * 0.16));
    fireworkRockets.push({
      x,
      y: height + 8,
      previousX: x,
      previousY: height + 8,
      targetX,
      targetY: height * (0.16 + Math.random() * 0.43),
      vx: (targetX - x) / 75,
      vy: -(4.8 + Math.random() * 1.8),
      hue: fireworkColors[Math.floor(Math.random() * fireworkColors.length)]
    });
    showFinaleMessage();
  }

  function animateFireworks(time) {
    if (!finaleFireworksActive || document.hidden) {
      fireworkFrame = null;
      return;
    }
    fireworkFrame = window.requestAnimationFrame(animateFireworks);
    if (time - fireworkLastFrame < 30) return;
    const delta = Math.min((time - fireworkLastFrame) / 16.67, 2) * animationSpeed;
    fireworkLastFrame = time;

    fireworkContext.globalCompositeOperation = 'source-over';
    fireworkContext.fillStyle = 'rgba(3, 3, 11, 0.2)';
    fireworkContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
    fireworkContext.globalCompositeOperation = 'lighter';

    if (time >= fireworkNextLaunchAt && fireworkRockets.length < 3) {
      launchFirework();
      const launchInterval = Math.min(3000, Math.max(250, Number(birthdayText.fireworks.launchIntervalMs) || 975)) / animationSpeed;
      fireworkNextLaunchAt = time + launchInterval * (2 / 3 + Math.random() * 2 / 3);
    }

    for (let index = fireworkRockets.length - 1; index >= 0; index -= 1) {
      const rocket = fireworkRockets[index];
      rocket.previousX = rocket.x;
      rocket.previousY = rocket.y;
      rocket.x += rocket.vx * delta;
      rocket.y += rocket.vy * delta;
      rocket.vy += 0.035 * delta;
      fireworkContext.beginPath();
      fireworkContext.moveTo(rocket.previousX, rocket.previousY);
      fireworkContext.lineTo(rocket.x, rocket.y);
      fireworkContext.strokeStyle = `hsla(${rocket.hue}, 100%, 76%, 0.86)`;
      fireworkContext.lineWidth = 2;
      fireworkContext.stroke();
      fireworkContext.beginPath();
      fireworkContext.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2);
      fireworkContext.fillStyle = '#fff4d9';
      fireworkContext.fill();
      if (rocket.y <= rocket.targetY || rocket.vy > -0.8) {
        fireworkRockets.splice(index, 1);
        explodeFirework(rocket);
      }
    }

    for (let index = fireworkParticles.length - 1; index >= 0; index -= 1) {
      const particle = fireworkParticles[index];
      particle.previousX = particle.x;
      particle.previousY = particle.y;
      particle.vx *= particle.drag;
      particle.vy = particle.vy * particle.drag + particle.gravity * delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.life -= particle.decay * delta;
      if (particle.life <= 0) {
        fireworkParticles.splice(index, 1);
        continue;
      }
      fireworkContext.beginPath();
      fireworkContext.moveTo(particle.previousX, particle.previousY);
      fireworkContext.lineTo(particle.x, particle.y);
      fireworkContext.strokeStyle = `hsla(${particle.hue}, 100%, 76%, ${particle.life * 0.7})`;
      fireworkContext.lineWidth = particle.size;
      fireworkContext.stroke();
      fireworkContext.beginPath();
      fireworkContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      fireworkContext.fillStyle = `hsla(${particle.hue}, 100%, 84%, ${particle.life})`;
      fireworkContext.fill();
    }
    fireworkContext.globalCompositeOperation = 'source-over';
  }

  function startFinaleFireworks() {
    playAudioMode('fireworks', true);
    finaleFireworksActive = true;
    fireworksCanvas.classList.add('active');
    fireworkParticles = [];
    fireworkRockets = [];
    fireworkContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    window.clearTimeout(finaleMessageTimerOne);
    window.clearTimeout(finaleMessageTimerTwo);
    finaleMessage.classList.remove('is-visible');
    finaleMessage.textContent = '';
    finaleMessageTimerOne = window.setTimeout(() => {
      if (!finaleFireworksActive) return;
      finaleMessage.textContent = 'I love u janeman 💕';
      finaleMessage.classList.add('is-visible');
    }, 3000);
    finaleMessageTimerTwo = window.setTimeout(() => {
      if (!finaleFireworksActive) return;
      finaleMessage.classList.remove('is-visible');
      window.setTimeout(() => {
        if (!finaleFireworksActive) return;
        finaleMessage.textContent = 'Happy Birthday to You 🥳';
        finaleMessage.classList.add('is-visible');
      }, 250);
    }, 5000);
    if (reducedMotion) {
      drawStaticFinale();
      return;
    }
    fireworkLastFrame = 0;
    fireworkNextLaunchAt = performance.now() + 100;
    if (!document.hidden) fireworkFrame = window.requestAnimationFrame(animateFireworks);
  }

  function stopFinaleFireworks() {
    finaleFireworksActive = false;
    window.clearTimeout(finaleMessageTimerOne);
    window.clearTimeout(finaleMessageTimerTwo);
    window.cancelAnimationFrame(fireworkFrame);
    fireworkFrame = null;
    fireworkParticles = [];
    fireworkRockets = [];
    fireworksCanvas.classList.remove('active');
    finaleMessage.classList.remove('is-visible');
    fireworkContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  document.addEventListener('visibilitychange', () => {
    if (!finaleFireworksActive || reducedMotion) return;
    if (document.hidden) {
      window.cancelAnimationFrame(fireworkFrame);
      fireworkFrame = null;
    } else if (fireworkFrame === null) {
      fireworkLastFrame = 0;
      fireworkFrame = window.requestAnimationFrame(animateFireworks);
    }
  });

  const particleCanvas = document.getElementById('birthday-particles');
  const particleContext = particleCanvas.getContext('2d', { alpha: true, desynchronized: true });
  const particleStatus = document.getElementById('birthday-scene-status');
  const finalMessage = 'Happy Birthday to you, Jaan 😘';
  const sceneStages = ['3', '2', '1', finalMessage];
  const rainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-<>/';
  let sceneWidth = 0;
  let sceneHeight = 0;
  let sceneParticles = [];
  let rainStreams = [];
  let sceneStageIndex = reducedMotion ? 3 : 0;
  let sceneStageStartedAt = 0;
  let sceneFrame = null;
  let sceneLastFrame = 0;
  let sceneWanted = false;
  let sceneComplete = reducedMotion;
  let homeSequenceRun = 0;
  let homeSequenceTimers = [];
  let homeSequenceManual = false;

  function isPhonePortrait() {
    return window.matchMedia('(max-width: 900px)').matches && window.matchMedia('(orientation: portrait)').matches;
  }

  function clearHomeSequence() {
    homeSequenceTimers.forEach((timer) => window.clearTimeout(timer));
    homeSequenceTimers = [];
    homeSequenceManual = false;
    homeSequenceRun += 1;
  }

  function startHomeCountdownSequence() {
    if (chapterIndex !== 0 || isPhonePortrait()) return;
    clearHomeSequence();
    const runId = ++homeSequenceRun;
    homeSequenceManual = true;
    sceneComplete = false;
    sceneStageIndex = 0;
    sceneStageStartedAt = performance.now();
    setSceneTargets('3', true);
    particleStatus.textContent = '3';

    const sequence = [
      { delay: 0, value: '3' },
      { delay: 1000, value: '2' },
      { delay: 2000, value: '1' },
      { delay: 3000, value: finalMessage, final: true }
    ];

    sequence.forEach((entry) => {
      const timeoutId = window.setTimeout(() => {
        if (runId !== homeSequenceRun || chapterIndex !== 0 || isPhonePortrait()) return;
        const nextStageIndex = entry.final ? sceneStages.length - 1 : sceneStages.indexOf(entry.value);
        sceneStageIndex = nextStageIndex;
        setSceneTargets(entry.value, true);
        particleStatus.textContent = entry.value;

        if (entry.final) {
          sceneComplete = true;
          const leaveTimer = window.setTimeout(() => {
            if (runId !== homeSequenceRun || chapterIndex !== 0 || isPhonePortrait()) return;
            showChapter(1);
          }, 2000);
          homeSequenceTimers.push(leaveTimer);
        }
      }, entry.delay);
      homeSequenceTimers.push(timeoutId);
    });
  }

  function updateHomeOrientationPrompt() {
    let prompt = document.querySelector('.home-orientation-prompt');
    if (!prompt) {
      const hero = document.querySelector('.chapter.hero');
      if (!hero) return;
      prompt = document.createElement('div');
      prompt.className = 'home-orientation-prompt';
      prompt.textContent = 'Jaan, turn your phone sideways for a little surprise! ❤️';
      prompt.hidden = true;
      hero.insertBefore(prompt, hero.firstChild);
    }

    const showPrompt = chapterIndex === 0 && isPhonePortrait();
    prompt.hidden = !showPrompt;

    if (showPrompt) {
      clearHomeSequence();
      sceneParticles = [];
      sceneStageIndex = 0;
      sceneComplete = false;
      particleStatus.textContent = '';
      return;
    }

    if (chapterIndex === 0 && !homeSequenceManual && !sceneComplete) {
      startHomeCountdownSequence();
    }
  }

  function textLinesFor(text, context, fontSize, maxWidth) {
    context.font = `900 ${fontSize}px Arial, sans-serif`;
    const words = text.trim().split(/\s+/);
    const lines = [];
    let line = '';
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (line && context.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function makeTextTargets(text) {
    const mask = document.createElement('canvas');
    mask.width = Math.max(1, Math.round(sceneWidth));
    mask.height = Math.max(1, Math.round(sceneHeight));
    const maskContext = mask.getContext('2d', { willReadFrequently: true });
    const maxWidth = sceneWidth * 0.9;
    let fontSize = text === '3' || text === '2' || text === '1'
      ? Math.min(sceneWidth * 0.52, sceneHeight * 0.55, 340)
      : Math.min(sceneWidth * 0.28, sceneHeight * 0.2, 118);
    let lines = [text];

    if (text.length > 1) {
      let low = 12;
      let high = fontSize;
      for (let attempt = 0; attempt < 12; attempt += 1) {
        const candidateSize = (low + high) / 2;
        const candidateLines = textLinesFor(text, maskContext, candidateSize, maxWidth);
        if (candidateLines.length <= 2) {
          low = candidateSize;
          lines = candidateLines;
        } else {
          high = candidateSize;
        }
      }
      fontSize = low;
      lines = textLinesFor(text, maskContext, fontSize, maxWidth);
    }

    maskContext.clearRect(0, 0, mask.width, mask.height);
    maskContext.fillStyle = '#fff';
    maskContext.textAlign = 'center';
    maskContext.textBaseline = 'middle';
    maskContext.font = `900 ${fontSize}px Arial, sans-serif`;
    const lineHeight = fontSize * 1.08;
    const firstY = sceneHeight / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => maskContext.fillText(line, sceneWidth / 2, firstY + index * lineHeight));

    const pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data;
    const step = sceneWidth < 600 ? 4 : 5;
    const targets = [];
    for (let y = 0; y < mask.height; y += step) {
      for (let x = 0; x < mask.width; x += step) {
        if (pixels[(y * mask.width + x) * 4 + 3] > 100) targets.push({ x, y });
      }
    }

    const limit = sceneWidth < 600 ? 1100 : 2600;
    const stride = Math.max(1, Math.ceil(targets.length / limit));
    return targets.filter((_, index) => index % stride === 0);
  }

  function setSceneTargets(text, scatter = false) {
    const targets = makeTextTargets(text);
    sceneParticles = targets.map((target, index) => {
      const particle = sceneParticles[index] || {
        x: Math.random() * sceneWidth,
        y: Math.random() * sceneHeight,
        vx: 0,
        vy: 0
      };
      particle.targetX = target.x;
      particle.targetY = target.y;
      if (scatter) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        particle.vx += Math.cos(angle) * speed;
        particle.vy += Math.sin(angle) * speed;
      }
      return particle;
    });
  }

  function resizeParticleScene() {
    const bounds = particleCanvas.getBoundingClientRect();
    sceneWidth = Math.max(1, bounds.width);
    sceneHeight = Math.max(1, bounds.height);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    particleCanvas.width = Math.round(sceneWidth * ratio);
    particleCanvas.height = Math.round(sceneHeight * ratio);
    particleContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    rainStreams = Array.from({ length: Math.ceil(sceneWidth / 17) }, () => ({
      x: Math.random() * sceneWidth,
      y: Math.random() * sceneHeight,
      speed: 24 + Math.random() * 46,
      length: 10 + Math.floor(Math.random() * 13),
      chars: Array.from({ length: 24 }, () => rainAlphabet[Math.floor(Math.random() * rainAlphabet.length)])
    }));
    setSceneTargets(sceneStages[sceneStageIndex]);
    if (reducedMotion && sceneWanted && !document.hidden) drawParticleScene(performance.now());
  }

  function drawParticleScene(time) {
    if (!sceneWanted || document.hidden) {
      sceneFrame = null;
      return;
    }
    if (!reducedMotion) sceneFrame = window.requestAnimationFrame(drawParticleScene);
    else sceneFrame = null;
    if (time - sceneLastFrame < 32) return;
    const delta = Math.min((time - sceneLastFrame) / 1000, 0.05);
    sceneLastFrame = time;

    particleContext.fillStyle = 'rgba(18, 8, 15, 0.34)';
    particleContext.fillRect(0, 0, sceneWidth, sceneHeight);
    particleContext.font = '11px monospace';
    rainStreams.forEach((stream) => {
      if (!reducedMotion) stream.y += stream.speed * delta;
      for (let row = 0; row < stream.length; row += 1) {
        const y = stream.y - row * 14;
        if (y < 0 || y > sceneHeight) continue;
        if (!reducedMotion && Math.random() < 0.008) {
          stream.chars[row] = rainAlphabet[Math.floor(Math.random() * rainAlphabet.length)];
        }
        particleContext.globalAlpha = Math.max(0.08, 0.68 - row * 0.035);
        particleContext.fillStyle = '#fff5fb';
        particleContext.fillText(stream.chars[row], stream.x, y);
      }
      if (stream.y - stream.length * 14 > sceneHeight) {
        stream.y = -Math.random() * sceneHeight * 0.5;
        stream.speed = 24 + Math.random() * 46;
      }
    });
    particleContext.globalAlpha = 1;

    const glow = 0.68 + Math.sin(time * 0.0025) * 0.16;
    sceneParticles.forEach((particle, index) => {
      if (!reducedMotion) {
        particle.x += (particle.targetX - particle.x) * 0.045 + particle.vx;
        particle.y += (particle.targetY - particle.y) * 0.045 + particle.vy;
        particle.vx *= 0.88;
        particle.vy *= 0.88;
        if (sceneComplete) {
          particle.x += Math.sin(time * 0.0015 + index) * 0.12;
          particle.y += Math.cos(time * 0.0017 + index) * 0.12;
        }
      } else {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
      }
      particleContext.beginPath();
      particleContext.arc(particle.x, particle.y, 2.1, 0, Math.PI * 2);
      particleContext.fillStyle = `rgba(255, 66, 170, ${glow * 0.2})`;
      particleContext.fill();
      particleContext.beginPath();
      particleContext.arc(particle.x, particle.y, 0.95, 0, Math.PI * 2);
      particleContext.fillStyle = `rgba(255, 190, 231, ${glow})`;
      particleContext.fill();
    });
  }

  function setParticleSceneActive(active) {
    sceneWanted = active;
    if (!active || document.hidden) {
      window.cancelAnimationFrame(sceneFrame);
      sceneFrame = null;
      return;
    }
    if (!sceneStageStartedAt) sceneStageStartedAt = performance.now();
    if (sceneFrame === null) {
      sceneLastFrame = 0;
      sceneFrame = window.requestAnimationFrame(drawParticleScene);
    }
  }

  resizeParticleScene();
  window.addEventListener('resize', () => {
    resizeParticleScene();
    updateHomeOrientationPrompt();
  }, { passive: true });
  window.addEventListener('orientationchange', updateHomeOrientationPrompt, { passive: true });
  document.addEventListener('visibilitychange', () => setParticleSceneActive(sceneWanted));
  window.addEventListener('pagehide', () => setParticleSceneActive(false));
  window.addEventListener('pageshow', () => setParticleSceneActive(sceneWanted));

  const chapters = Array.from(document.querySelectorAll('#chapter-stage > .chapter'));
  const chapterHome = document.getElementById('chapter-home');
  const chapterBack = document.getElementById('chapter-back');
  const chapterNext = document.getElementById('chapter-next');
  const chapterNextLabel = document.getElementById('chapter-next-label');
  const chapterWait = document.getElementById('chapter-wait');
  const chapterCount = document.getElementById('chapter-count');
  const chapterProgress = document.querySelector('.chapter-progress');
  const chapterProgressFill = document.getElementById('chapter-progress-fill');
  let chapterIndex = 0;
  let chapterUnlockTime = Date.now() + 30000;
  let chapterTimer;
  const memoriesTransition = document.getElementById('memories-transition');
  const memoriesSeconds = document.getElementById('memories-seconds');
  const memoriesTransitionFill = document.getElementById('memories-transition-fill');
  const memoriesTransitionDuration = 10000;
  let memoriesTransitionTimeout = null;
  let memoriesTransitionInterval = null;
  let memoriesTransitionDeadline = 0;
  let memoriesTransitionRun = 0;

  function clearMemoriesTransition() {
    memoriesTransitionRun += 1;
    window.clearTimeout(memoriesTransitionTimeout);
    window.clearInterval(memoriesTransitionInterval);
    memoriesTransitionTimeout = null;
    memoriesTransitionInterval = null;
  }

  function updateMemoriesTransition() {
    const remaining = Math.max(0, memoriesTransitionDeadline - Date.now());
    memoriesSeconds.textContent = String(Math.ceil(remaining / 1000));
    memoriesTransitionFill.style.transform = `scaleX(${1 - remaining / memoriesTransitionDuration})`;
  }

  function startMemoriesTransition() {
    clearMemoriesTransition();
    const run = memoriesTransitionRun;
    memoriesTransitionDeadline = Date.now() + memoriesTransitionDuration;
    memoriesTransition.hidden = false;
    updateMemoriesTransition();
    memoriesTransitionInterval = window.setInterval(updateMemoriesTransition, 100);
    memoriesTransitionTimeout = window.setTimeout(() => {
      if (run !== memoriesTransitionRun) return;
      if (chapterIndex !== 3 || chapters[3].hidden || !chapters[3].classList.contains('active')) {
        clearMemoriesTransition();
        return;
      }
      clearMemoriesTransition();
      showChapter(4);
    }, memoriesTransitionDuration);
  }

  function updateChapterGate() {
    if (chapterIndex === 4) {
      if (giftOpened) updateGiftTimer();
      else {
        chapterNext.disabled = true;
        chapterNextLabel.textContent = 'Open the gift';
        chapterWait.textContent = 'A surprise is waiting inside.';
      }
      return;
    }

    if (chapterIndex === 5) {
      chapterNext.disabled = true;
      chapterNextLabel.textContent = candleExtinguishing ? 'Please wait' : 'Blow out the candle';
      chapterWait.textContent = candleExtinguishing ? 'The candle is going out.' : 'The next page unlocks after the candle is out.';
      return;
    }

    const lastChapter = chapterIndex === chapters.length - 1;
    if (lastChapter) {
      chapterNext.disabled = true;
      chapterNextLabel.textContent = 'The surprise is yours';
      chapterWait.textContent = 'You made it to the final page.';
      return;
    }

    const secondsLeft = Math.max(0, Math.ceil((chapterUnlockTime - Date.now()) / 1000));
    chapterNext.disabled = secondsLeft > 0;
    chapterNextLabel.textContent = secondsLeft > 0 ? `Continue in ${secondsLeft}s` : 'Continue';
    chapterWait.textContent = secondsLeft > 0
      ? `The next page unlocks in ${secondsLeft} seconds.`
      : 'The next page is ready.';
    if (secondsLeft === 0) window.clearInterval(chapterTimer);
  }

  function showChapter(index, moveFocus = true) {
    const nextChapterIndex = Math.max(0, Math.min(index, chapters.length - 1));
    const previousChapterIndex = chapterIndex;
    if (chapterIndex === 4 && nextChapterIndex !== 4) resetGiftExperience();
    if (chapterIndex !== 4 && nextChapterIndex === 4) resetGiftExperience();
    if (chapterIndex === 5 && nextChapterIndex !== 5) stopCandleScene();
    if (chapterIndex === 6 && nextChapterIndex !== 6) stopFinaleFireworks();
    if (chapterIndex === 3) clearMemoriesTransition();
    chapterIndex = nextChapterIndex;
    setParticleSceneActive(chapterIndex === 0);
    if (chapterIndex === 0) {
      sceneComplete = false;
      sceneStageIndex = 0;
      updateHomeOrientationPrompt();
    } else {
      clearHomeSequence();
      const prompt = document.querySelector('.home-orientation-prompt');
      if (prompt) prompt.hidden = true;
    }
    if (chapterIndex === 2) {
      galleryAutoAdvanceBlocked = false;
      startGallerySlideshow();
    } else {
      stopGallerySlideshow();
    }
    chapters.forEach((chapter, position) => {
      const active = position === chapterIndex;
      chapter.hidden = !active;
      chapter.classList.toggle('active', active);
    });
    document.body.classList.toggle('finale-active', chapterIndex === 6);
    refreshStars();
    if (chapterIndex === 3) startMemoriesTransition();
    if (chapterIndex === 5) startCandleScene();
    if (chapterIndex === 6 && previousChapterIndex !== 6) startFinaleFireworks();
    if (chapterIndex !== 4 && chapterIndex !== 5 && chapterIndex !== 6) playAudioMode('happy', false);
    if (chapterIndex === 4 && !giftOpened) playAudioMode('happy', false);

    const pageNumber = chapterIndex + 1;
    chapterCount.textContent = `${pad(pageNumber)} / ${pad(chapters.length)}`;
    chapterProgress.setAttribute('aria-valuenow', String(pageNumber));
    chapterProgressFill.style.width = `${(pageNumber / chapters.length) * 100}%`;
    chapterBack.disabled = chapterIndex === 0;
    chapterUnlockTime = Date.now() + 30000;
    window.clearInterval(chapterTimer);
    updateChapterGate();
    if (chapterIndex < chapters.length - 1 && chapterIndex !== 4 && chapterIndex !== 5) chapterTimer = window.setInterval(updateChapterGate, 1000);
    window.scrollTo(0, 0);

    if (moveFocus) {
      const heading = chapters[chapterIndex].querySelector('h1, h2');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
  }

  chapterHome.addEventListener('click', () => showChapter(0));
  chapterBack.addEventListener('click', () => {
    if (chapterIndex > 0) showChapter(chapterIndex - 1);
  });
  chapterNext.addEventListener('click', () => {
    if (chapterIndex === 5) return;
    if (chapterIndex === 4) {
      if (!giftOpened || giftTransitioning) return;
      giftTransitioning = true;
      clearGiftTimer();
      showChapter(5);
      return;
    }
    if (!chapterNext.disabled && chapterIndex < chapters.length - 1) showChapter(chapterIndex + 1);
  });
  showChapter(0, false);
})();
