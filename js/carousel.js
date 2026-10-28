/* Hero photo carousel. Photos come from hero.photos in content/site.js. */
(function () {
  var car = document.getElementById('carousel');
  if (!car) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var figs = car.querySelectorAll('figure'), cur = 0, timer;
  function show(n) { figs[cur].classList.remove('on'); cur = (n + figs.length) % figs.length; figs[cur].classList.add('on'); }
  function auto() { if (!reduce) { clearInterval(timer); timer = setInterval(function () { show(cur + 1); }, 5000); } }
  car.querySelector('.prev').addEventListener('click', function () { show(cur - 1); auto(); });
  car.querySelector('.next').addEventListener('click', function () { show(cur + 1); auto(); });
  auto();
})();
