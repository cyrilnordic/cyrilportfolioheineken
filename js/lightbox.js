/* Click a photo marked with data-zoom to see it large. Esc, the close button or a click anywhere closes it. */
(function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  var img = document.getElementById('lbImg'), opener = null;
  function close() { lb.classList.remove('open'); lb.hidden = true; if (opener) opener.focus(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-zoom]');
    if (!b) return;
    opener = b; img.src = b.getAttribute('data-zoom'); img.alt = b.getAttribute('data-alt') || '';
    lb.hidden = false; lb.classList.add('open'); document.getElementById('lbClose').focus();
  });
  lb.addEventListener('click', close);
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
})();
