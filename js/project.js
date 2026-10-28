/*
  Builds a project page from content/projects.js. The project is picked by the address: project.html#SLUG.
  You rarely need to edit this file; edit content/projects.js instead.
*/
(function () {
  var S = window.SITE, P = window.PROJECTS || [];
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function paras(list, cls) { return (list || []).map(function (t) { return '<p' + (cls ? ' class="' + cls + '"' : '') + '>' + esc(t) + '</p>'; }).join(''); }
  function pill(b, cls) {
    return '<a class="pill' + (cls ? ' ' + cls : '') + '" href="' + esc(b.href) + '"' + (/^https?:/.test(b.href) ? ' target="_blank" rel="noreferrer"' : '') + '>' + esc(b.label) + '</a>';
  }
  // A photo that opens large when clicked (js/lightbox.js).
  function photo(src, alt, cls) {
    return '<button type="button" class="zoom ' + (cls || '') + '" data-zoom="' + esc(src) + '" data-alt="' + esc(alt) + '" aria-label="Enlarge the photo"><img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy"></button>';
  }

  var slug = location.hash.slice(1) || new URLSearchParams(location.search).get('p');
  window.addEventListener('hashchange', function () { location.reload(); });
  var idx = P.findIndex(function (p) { return p.slug === slug; });
  var p = P[idx];

  var nav = S.sections.filter(function (s) { return s.nav; }).map(function (s) { return '<a href="index.html#' + esc(s.id) + '">' + esc(s.nav) + '</a>'; }).join('');
  $('site-header').innerHTML = '<div class="wrap"><a class="brand" href="index.html">' + esc(S.brand) + '</a><nav class="main" aria-label="Main">' + nav + '</nav>' + pill(S.cta) + '</div>';
  var f = S.footer;
  $('site-footer').innerHTML = '<div class="wrap"><div><h2>' + esc(f.title) + '</h2><p>' + esc(f.subtitle) + '</p></div>' + pill(f.button) + '</div>';

  if (!p) {
    document.title = 'Project not found · ' + S.brand;
    $('top').innerHTML = '<section class="phero"><div class="wrap"><a class="back" href="index.html#projects">&larr; All projects</a><h1>Project not found</h1><p class="intro">Choose one from the list of experiences.</p></div></section>';
    return;
  }
  document.title = p.name + ' · ' + S.brand;
  var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', p.summary || '');

  var out = '';
  out += '<section class="phero"><div class="wrap"><a class="back" href="index.html#projects">&larr; All projects</a>' +
    (p.subtitle ? '<p class="eyebrow">' + esc(p.subtitle) + '</p>' : '') + '<h1>' + esc(p.name) + '</h1>' +
    (p.tags ? '<ul class="tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
    (p.introduction ? '<p class="intro">' + esc(p.introduction) + '</p>' : '') + '</div></section>';

  out += '<div class="pbody"><div class="wrap narrow">';
  if (p.image && !p.caseStudies) {
    out += '<figure class="pfig">' + photo(p.image, p.imageCaption || p.name, 'wide') + (p.imageCaption ? '<figcaption>' + esc(p.imageCaption) + '</figcaption>' : '') + '</figure>';
  }
  if (p.role) out += '<h2 class="ph2">My role</h2><div class="prose">' + paras(p.role) + '</div>';
  if (p.glance) {
    out += '<div class="glance"><div class="glance-head"><div><p class="eyebrow dark">Case study snapshot</p><h2>At a glance</h2></div><span>' + esc(p.glance.place) + '</span></div><div class="glance-grid">' +
      p.glance.items.map(function (g) { return '<div><strong>' + esc(g[0]) + '</strong><span>' + esc(g[1]) + '</span></div>'; }).join('') + '</div></div>';
  }
  if (p.result && !p.caseStudies) {
    out += '<div class="outcome"><h2>Outcome</h2><p>' + esc(p.result) + '</p>' + (p.resultNote ? '<p class="note">' + esc(p.resultNote) + '</p>' : '') + '</div>';
  }
  var isCer = p.slug === 'award-submissions-ceremonies';
  if (p.gallery && p.gallery.length && !isCer) {
    var cols = p.gallery.length > 1 ? (p.gallery.length === 3 && p.gallery.every(function (g) { return g.caption; }) ? ' c3' : ' c2') : '';
    out += '<div class="pgrid' + cols + '">' + p.gallery.map(function (g) {
      return '<figure>' + photo(g.src, g.alt, 'tile') + (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : '') + '</figure>';
    }).join('') + '</div>';
  }
  if (p.caseStudiesTitle) out += '<h2 class="ph2 top-gap">' + esc(p.caseStudiesTitle) + '</h2>';
  (p.caseStudies || []).forEach(function (c, i) {
    var intro = esc(c.intro);
    if (c.emphasis) intro = intro.split(esc(c.emphasis)).join('<strong>' + esc(c.emphasis) + '</strong>');
    out += '<section class="pcase"><h' + (p.caseStudiesTitle ? 3 : 2) + ' class="ph2' + (p.caseStudiesTitle ? ' sub' : '') + '">' + esc(c.title) + '</h' + (p.caseStudiesTitle ? 3 : 2) + '>' +
      '<p class="lead-p">' + intro + '</p>' + (c.text ? '<p class="prose-p">' + esc(c.text) + '</p>' : '');
    if (c.image) {
      out += '<figure class="pfig">' + photo(c.image.src, c.image.alt, 'wide');
      if (isCer && i === 0 && p.gallery && p.gallery.length) out += '<div class="pgrid c3 tight">' + p.gallery.map(function (g) { return '<div>' + photo(g.src, g.alt, 'tile') + '</div>'; }).join('') + '</div>';
      out += '<figcaption>' + esc(c.image.alt) + '</figcaption></figure>';
    }
    if (c.bullets) out += '<ul class="bullets">' + c.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>';
    out += '</section>';
  });
  (p.extraSections || []).forEach(function (e) {
    out += '<section class="pcase"><h2 class="ph2">' + esc(e.title) + '</h2>' + (e.intro ? '<p class="lead-p accent">' + esc(e.intro) + '</p>' : '') + '<p class="prose-p">' + esc(e.text) + '</p>' +
      (e.image ? '<figure class="pfig">' + photo(e.image.src, e.image.alt, 'wide') + '<figcaption>' + esc(e.image.alt) + '</figcaption></figure>' : '') + '</section>';
  });

  var next = P[(idx + 1) % P.length];
  out += '<div class="pfoot">' + pill(S.cta) +
    (next && next.slug !== p.slug ? '<a class="pill ghost" href="project.html#' + esc(next.slug) + '">' + esc(p.nextProjectLabel || ('Next: ' + next.name)) + ' &rarr;</a>' : '') + '</div>';
  out += '</div></div>';
  $('top').innerHTML = out;
})();
