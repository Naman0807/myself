/* ============================================================================
   Naman Parmar | AI Engineer  (v2)
   Small, optional JS. The site is fully usable with JS disabled.
   1. active section in the top bar and the left rail
   2. reading-progress bar
   3. copy-email button
   ========================================================================== */
(function () {
  "use strict";

  var links = Array.prototype.slice.call(document.querySelectorAll("[data-s]"));
  var ids = [];
  links.forEach(function (a) { if (ids.indexOf(a.dataset.s) < 0) ids.push(a.dataset.s); });
  var sections = ids
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var bar = document.querySelector(".progress");
  var queued = false;

  function update() {
    queued = false;
    var y = window.scrollY, current = "";
    for (var i = 0; i < sections.length; i++) {
      if (y >= sections[i].offsetTop - 160) current = sections[i].id;
    }
    links.forEach(function (a) { a.classList.toggle("on", a.dataset.s === current); });
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    }
  }

  function queue() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue, { passive: true });
  update();

  // copy email
  var status = document.querySelector(".status");
  function say(msg) {
    if (!status) return;
    status.textContent = msg;
    setTimeout(function () { status.textContent = ""; }, 2200);
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (b) {
    b.addEventListener("click", function () {
      var text = b.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { say("Copied"); },
          function () { say(text); }
        );
      } else { say(text); }
    });
  });
})();
