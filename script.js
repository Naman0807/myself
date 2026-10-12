/* ============================================================================
   Naman Parmar - AI Engineer
   The only JS on the page: highlights the active section in the left rail.
   Rail is CSS-hidden below 1440px, so this is purely progressive enhancement -
   the site is fully functional with JS disabled.
   ========================================================================== */
(function () {
  "use strict";

  var railLinks = Array.prototype.slice.call(document.querySelectorAll(".rail a"));
  if (!railLinks.length) return;

  var sections = railLinks
    .map(function (a) { return document.getElementById(a.dataset.s); })
    .filter(Boolean);
  if (!sections.length) return;

  var queued = false;

  function mark() {
    queued = false;
    var current = "";
    for (var i = 0; i < sections.length; i++) {
      if (window.scrollY >= sections[i].offsetTop - 160) current = sections[i].id;
    }
    railLinks.forEach(function (a) {
      a.classList.toggle("on", a.dataset.s === current);
    });
  }

  // rAF-throttled: one layout read per frame, never per scroll event
  window.addEventListener("scroll", function () {
    if (!queued) { queued = true; requestAnimationFrame(mark); }
  }, { passive: true });

  window.addEventListener("resize", function () {
    if (!queued) { queued = true; requestAnimationFrame(mark); }
  }, { passive: true });

  mark();
})();
