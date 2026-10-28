/* The bottle in the left rail: a transparent photo cut-out that drains, slosh and bubbles as you scroll.
   Needs assets/bottle/bottle-full.png, bottle-empty.png and bottle-mask.png (same size). */
(function () {
  var TOP0 = 16.9, TOP1 = 98.4;             // beer surface in % of bottle height: full -> empty
  var bottle = document.getElementById('bottle');
  var cv = document.getElementById('bc'), ctx = cv.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var imgs = {}, ready = 0, cw = 1, ch = 1, dpr = 1;
  var layer, lctx, film, fctx, liq, qctx;    // offscreen: bubbles+foam, beer film, beer-only cut-out
  var p = 0, slosh = 0, lastScroll = window.scrollY, bubs = [];

  ['full', 'empty', 'mask'].forEach(function (k) {
    var im = new Image();
    im.onload = function () { if (++ready === 3) start(); };
    im.src = 'assets/bottle/bottle-' + k + '.png';
    imgs[k] = im;
  });

  function mk() { var c = document.createElement('canvas'); return [c, c.getContext('2d')]; }

  function size() {
    var r = bottle.getBoundingClientRect();
    dpr = Math.min(1.75, window.devicePixelRatio || 1);
    cw = Math.max(2, Math.round(r.width * dpr)); ch = Math.max(2, Math.round(r.height * dpr));
    cv.width = cw; cv.height = ch;
    [layer, film, liq].forEach(function (c) { c.width = cw; c.height = ch; });
    // beer only: the full photo restricted to the liquid mask
    qctx.clearRect(0, 0, cw, ch);
    qctx.globalCompositeOperation = 'source-over';
    qctx.drawImage(imgs.full, 0, 0, cw, ch);
    qctx.globalCompositeOperation = 'destination-in';
    qctx.drawImage(imgs.mask, 0, 0, cw, ch);
    qctx.globalCompositeOperation = 'source-over';
  }

  // Half-width of the beer column at a given height (0 top .. 1 bottom), as a share of the bottle width.
  function halfW(y) {
    if (y < 0.36) return 0.2;
    if (y < 0.44) return 0.2 + (y - 0.36) / 0.08 * 0.13;
    return 0.33;
  }
  var SITES = [-0.62, -0.25, 0.1, 0.42, 0.7];
  function spawn(anywhere, top) {
    var site = Math.random() < 0.55;
    var b = {
      site: site ? SITES[(Math.random() * SITES.length) | 0] : null,
      off: site ? 0 : (Math.random() * 2 - 1),
      y: anywhere ? top + Math.random() * (0.97 - top) : 0.95 + Math.random() * 0.02,
      r: site ? 0.9 : 0.5 + Math.random() * 1.1,
      v: 0.05 + Math.random() * 0.06,
      ph: Math.random() * 6.28, wob: 0.006 + Math.random() * 0.01
    };
    return b;
  }

  function surfaceY(x, sy, t) {                 // curved front arc plus a little slosh
    var u = (x / cw) * 2 - 1;
    var arc = ch * 0.0085 * (1 - u * u);
    var amp = (0.7 + slosh * 5) * dpr;
    return sy + arc + Math.sin(x * 0.045 + t / 380) * amp * 0.6 + Math.sin(x * 0.02 - t / 610) * amp * 0.4;
  }

  function draw(t, dt) {
    var top = TOP0 + p * (TOP1 - TOP0), sy = top / 100 * ch;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(imgs.empty, 0, 0, cw, ch);

    // thin film of beer left clinging to the glass just above the surface
    var drained = p > 0.001;
    if (drained) {
      fctx.globalCompositeOperation = 'source-over';
      fctx.clearRect(0, 0, cw, ch);
      fctx.drawImage(liq, 0, 0);
      fctx.globalCompositeOperation = 'destination-in';
      var fh = ch * 0.07, g = fctx.createLinearGradient(0, sy - fh, 0, sy + 2);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)');
      fctx.fillStyle = g; fctx.fillRect(0, sy - fh, cw, fh + 2);
      fctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(film, 0, 0);
    }

    // beer below the surface line
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, ch);
    for (var x = 0; x <= cw; x += 4) ctx.lineTo(x, surfaceY(x, sy, t));
    ctx.lineTo(cw, ch); ctx.closePath(); ctx.clip();
    ctx.drawImage(imgs.full, 0, 0, cw, ch);

    // bubbles and foam, only where there is beer
    lctx.globalCompositeOperation = 'source-over';
    lctx.clearRect(0, 0, cw, ch);
    var topN = top / 100;
    for (var k = 0; k < bubs.length; k++) {
      var b = bubs[k];
      if (!reduce) b.y -= b.v * (0.55 + b.r * 0.22) * dt;
      if (b.y < topN + 0.006) { bubs[k] = b = spawn(false, topN); }
      var bx = 0.5 + (b.site !== null ? b.site : b.off) * halfW(b.y) * 0.86 + Math.sin(t / 650 + b.ph) * b.wob * (b.site !== null ? 0.5 : 1);
      var grow = 1 + (0.97 - b.y) * 0.9;           // bubbles swell as they rise
      var rr = b.r * grow * dpr, px = bx * cw, py = b.y * ch;
      var gr = lctx.createRadialGradient(px - rr * .35, py - rr * .35, rr * .08, px, py, rr);
      gr.addColorStop(0, 'rgba(255,255,245,.95)');
      gr.addColorStop(.55, 'rgba(255,248,210,.32)');
      gr.addColorStop(1, 'rgba(255,238,160,.12)');
      lctx.fillStyle = gr;
      lctx.beginPath(); lctx.arc(px, py, rr, 0, 6.2832); lctx.fill();
    }
    // foam head hugging the surface
    var fo = ch * 0.022;
    lctx.beginPath();
    for (x = 0; x <= cw; x += 4) { var yy = surfaceY(x, sy, t); if (x === 0) lctx.moveTo(x, yy); else lctx.lineTo(x, yy); }
    for (x = cw; x >= 0; x -= 4) lctx.lineTo(x, surfaceY(x, sy, t) + fo * (0.7 + 0.3 * Math.sin(x * 0.11 + t / 500)));
    lctx.closePath();
    var fg = lctx.createLinearGradient(0, sy - 2, 0, sy + fo);
    fg.addColorStop(0, 'rgba(255,252,236,.95)'); fg.addColorStop(.5, 'rgba(255,244,205,.5)'); fg.addColorStop(1, 'rgba(255,240,190,0)');
    lctx.fillStyle = fg; lctx.fill();
    lctx.globalCompositeOperation = 'destination-in';
    lctx.drawImage(imgs.mask, 0, 0, cw, ch);
    lctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(layer, 0, 0);
    ctx.restore();
  }

  var last = 0, running = false;
  function loop(t) {
    var dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t;
    slosh *= 0.94;
    draw(t, dt);
    if (!reduce) requestAnimationFrame(loop); else running = false;
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }

  function level() {
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    p = Math.min(1, Math.max(0, window.scrollY / (max * 0.92)));
  }
  function onScroll() {
    slosh = Math.min(1, slosh + Math.abs(window.scrollY - lastScroll) / 260); lastScroll = window.scrollY;
    level(); if (reduce) kick();
  }

  function start() {
    var a = mk(); layer = a[0]; lctx = a[1];
    a = mk(); film = a[0]; fctx = a[1];
    a = mk(); liq = a[0]; qctx = a[1];
    size(); level();
    for (var k = 0; k < 90; k++) bubs.push(spawn(true, TOP0 / 100));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { size(); level(); if (reduce) kick(); });
    kick();
  }
})();
