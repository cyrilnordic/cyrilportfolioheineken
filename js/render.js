/*
  Builds the page from content/site.js. You rarely need to edit this file.
  To add a NEW KIND of section, add one function to `sections` below, then use its name as `type` in content/site.js.
*/
(function () {
  var S = window.SITE;
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function paras(list) { return (list || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join(''); }
  function todo(text, small) {
    if (!text) return '';
    return '<div class="todo' + (small ? ' small' : '') + '" role="note"><span class="todo-tag">TO UPDATE</span><p>' + esc(text) + '</p></div>';
  }
  function pill(b, cls) {
    return '<a class="pill' + (cls ? ' ' + cls : '') + '" href="' + esc(b.href) + '"' + (/^https?:/.test(b.href) ? ' target="_blank" rel="noreferrer"' : '') + '>' + esc(b.label) + '</a>';
  }
  function head(s, tight) {
    return '<div class="head' + (tight ? ' tight' : '') + '"><h2>' + esc(s.title) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') + '</div>';
  }

  /* ---------- One renderer per section type ---------- */
  var sections = {
    cards: function (s) {
      return head(s) + '<div class="cards">' + s.items.map(function (c) {
        return '<article class="card"><div class="ph"><img src="' + esc(c.image) + '" alt="' + esc(c.alt) + '" loading="lazy">' +
          '</div><div class="bd"><h3>' + (c.link ? '<a href="' + esc(c.link.href) + '">' + esc(c.title) + '</a>' : esc(c.title)) + '</h3><p>' + esc(c.text) + '</p>' +
          (c.link ? '<div class="acts">' + pill(c.link) + '</div>' : '') + '</div></article>';
      }).join('') + '</div>';
    },

    about: function (s) {
      return '<div class="about"><div>' + head({ title: s.title }, true) + paras(s.paragraphs) + '</div>' +
        '<div class="portrait"><img src="' + esc(s.image) + '" alt="' + esc(s.imageAlt || '') + '"></div></div>';
    },

    stories: function (s) {
      return head(s) + '<div class="beyond">' + s.items.map(function (it) {
        if (it.kind === 'photo') {
          // small card; clicking the photo opens it large (js/lightbox.js)
          return '<article class="story"><div class="story-ph"><button type="button" class="zoom" data-zoom="' + esc(it.image) + '" data-alt="' + esc(it.alt) + '" aria-label="Enlarge the photo"><img src="' + esc(it.image) + '" alt="' + esc(it.alt) + '" loading="lazy"' +
            (it.imagePosition ? ' style="object-position:' + esc(it.imagePosition) + '"' : '') + '></button></div>' +
            '<div class="story-bd">' + (it.badge ? '<span class="badge">' + esc(it.badge) + '</span>' : '') + '<h3>' + esc(it.title) + '</h3>' + paras(it.paragraphs) + todo(it.todo, true) + '</div></article>';
        }
        return '<article class="honor"><div class="story-bd">' + (it.badge ? '<span class="badge">' + esc(it.badge) + '</span>' : '') + '<h3>' + esc(it.title) + '</h3>' + paras(it.paragraphs) + todo(it.todo, true) + '</div></article>';
      }).join('') + '</div>';
    },

    quotes: function (s) {
      return head(s) + '<div class="quotes">' + s.items.map(function (q) {
        return '<figure class="quote"><blockquote>"' + esc(q.text) + '"</blockquote><figcaption><b>' + esc(q.name) + '</b>' + esc(q.role) + '</figcaption></figure>';
      }).join('') + '</div>';
    }
  };

  /* ---------- Page ---------- */
  document.title = S.meta.title;
  var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', S.meta.description);

  var nav = S.sections.filter(function (s) { return s.nav; }).map(function (s) { return '<a href="#' + esc(s.id) + '">' + esc(s.nav) + '</a>'; }).join('');
  $('site-header').innerHTML = '<div class="wrap"><a class="brand" href="#top">' + esc(S.brand) + '</a><nav class="main" aria-label="Main">' + nav + '</nav>' + pill(S.cta) + '</div>';

  var h = S.hero;
  var summary = h.summaryToUpdate
    ? '<div class="todo" role="note"><span class="todo-tag">TO UPDATE</span><p>' + esc(h.summary) + ' <em>' + esc(h.summaryToUpdate) + '</em></p></div>'
    : '<p class="lead">' + esc(h.summary) + '</p>';
  var hero = '<section class="hero"><div class="wrap"><div>' +
    '<p class="eyebrow">' + esc(h.eyebrow) + '</p><h1>' + esc(h.name) + '</h1><p class="tag">' + esc(h.tagline) + '</p>' + summary +
    '<div class="finder" role="group" aria-label="At a glance">' + h.stats.map(function (st) { return '<div class="f"><span>' + esc(st.label) + '</span><strong>' + esc(st.value) + '</strong></div>'; }).join('') + pill(h.button) + '</div>' +
    '</div><div class="carousel" id="carousel" aria-roledescription="carousel" aria-label="Event photos">' +
    h.photos.map(function (p, i) { return '<figure' + (i === 0 ? ' class="on"' : '') + '><img src="' + esc(p.src) + '" alt="' + esc(p.alt) + '"></figure>'; }).join('') +
    '<button class="ctl prev" type="button" aria-label="Previous photo">&#8249;</button><button class="ctl next" type="button" aria-label="Next photo">&#8250;</button></div></div></section>';

  var body = S.sections.map(function (s) {
    var r = sections[s.type];
    if (!r) { console.warn('Unknown section type: ' + s.type); return ''; }
    return '<section class="block' + (s.tint ? ' tint' : '') + '" id="' + esc(s.id) + '"><div class="wrap">' + r(s) + '</div></section>';
  }).join('');
  $('top').innerHTML = hero + body;

  var f = S.footer;
  $('site-footer').innerHTML = '<div class="wrap"><div><h2>' + esc(f.title) + '</h2><p>' + esc(f.subtitle) + '</p></div>' + pill(f.button) + '</div>';
})();
