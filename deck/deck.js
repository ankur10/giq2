// Runs the deck: one press moves to the next step of a slide, then to the next slide.
//   next: right arrow, space, Page Down, Enter      back: left arrow, Page Up
//   F: fullscreen      Home / End: first / last slide      1-9: jump to a slide
// The address keeps the place (#3.1 is slide 3, step 1), so a reload returns to it.
(() => {
  const deck = document.getElementById('deck'), slides = [...deck.querySelectorAll('.slide')], count = document.getElementById('count');
  let slide = 0, step = 0;
  const steps = i => Number(slides[i].dataset.steps || 0);

  // Words and list items are numbered so their entrances can be staggered in CSS.
  for (const el of deck.querySelectorAll('.words')) el.innerHTML = el.textContent.trim().split(/\s+/).map((word, i) => `<span style="--i:${i}">${word}</span>`).join(' ');
  for (const list of deck.querySelectorAll('ul')) [...list.children].forEach((item, i) => item.style.setProperty('--i', i));

  function show() {
    slides.forEach((el, i) => {
      el.toggleAttribute('data-on', i === slide);
      if (i === slide) el.dataset.at = step; else delete el.dataset.at;
      for (const part of el.querySelectorAll('[data-step]')) part.toggleAttribute('data-shown', i === slide && step >= Number(part.dataset.step));
      for (const video of el.querySelectorAll('video')) {
        const playing = i === slide && step >= Number(video.dataset.playAt);
        if (playing && video.paused) video.play().catch(() => { video.controls = true; });
        if (!playing && !video.paused) video.pause();
        if (i !== slide) video.currentTime = 0;
      }
    });
    count.textContent = `${slide + 1} / ${slides.length}`;
    history.replaceState(null, '', `#${slide + 1}${step ? '.' + step : ''}`);
  }
  function go(toSlide, toStep = 0) {
    slide = Math.max(0, Math.min(slides.length - 1, toSlide));
    step = Math.max(0, Math.min(steps(slide), toStep));
    show();
  }
  const next = () => step < steps(slide) ? go(slide, step + 1) : slide < slides.length - 1 && go(slide + 1);
  const back = () => step > 0 ? go(slide, step - 1) : slide > 0 && go(slide - 1, steps(slide - 1));

  addEventListener('keydown', event => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(key)) next();
    else if (['ArrowLeft', 'PageUp'].includes(key)) back();
    else if (key === 'Home') go(0);
    else if (key === 'End') go(slides.length - 1);
    else if (key === 'f' || key === 'F') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
    else if (/^[1-9]$/.test(key)) go(Number(key) - 1);
    else return;
    event.preventDefault();
  });
  deck.addEventListener('click', next);

  const fit = () => document.documentElement.style.setProperty('--fit', Math.min(innerWidth / 1920, innerHeight / 1080));
  addEventListener('resize', fit); fit();
  // The pointer hides when it has been still for a moment.
  let idle; addEventListener('mousemove', () => { delete document.body.dataset.idle; clearTimeout(idle); idle = setTimeout(() => { document.body.dataset.idle = ''; }, 2000); });

  const [, s = 1, t = 0] = location.hash.match(/^#(\d+)(?:\.(\d+))?/) || [];
  go(Number(s) - 1, Number(t));
})();
