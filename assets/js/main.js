/* =========================================================
   Chagan Technology — site behaviour
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     Language switching

     Turkish is authored inline in the HTML. On first run we
     snapshot it, so switching TR <-> EN is just swapping the
     snapshot back in — no second copy of the markup needed.
     --------------------------------------------------------- */
  var EN = (window.CHAGAN_I18N && window.CHAGAN_I18N.en) || {};
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var tr = Object.create(null);

  nodes.forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (!(key in tr)) tr[key] = el.innerHTML;
  });

  var META = {
    tr: {
      title: document.title,
      desc: "Çağan Yazılım Teknolojileri ve Pazarlama Ltd. Şti. — 2016'dan beri yapay zekâ odaklı ürünler, web platformları, mobil uygulamalar ve geliştirici araçları tasarlıyor ve geliştiriyoruz. tunr.sh, Vitrus, Eduira, Kavriyo."
    },
    en: {
      title: "Chagan Technology — AI-native products, web platforms and developer tools",
      desc: "Çağan Yazılım Teknolojileri ve Pazarlama Ltd. Şti. — building AI-native products, web platforms, mobile apps and developer tools since 2016. tunr.sh, Vitrus, Eduira, Kavriyo."
    }
  };

  var buttons = Array.prototype.slice.call(document.querySelectorAll(".langtoggle__btn"));

  function applyLang(lang) {
    var dict = lang === "en" ? EN : tr;

    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (typeof val === "string") el.innerHTML = val;
    });

    document.documentElement.lang = lang;

    var meta = META[lang] || META.tr;
    document.title = meta.title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", meta.desc);

    buttons.forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem("chagan-lang", lang); } catch (e) { /* private mode */ }
  }

  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "tr") return q;

    var stored = null;
    try { stored = localStorage.getItem("chagan-lang"); } catch (e) { /* private mode */ }
    if (stored === "en" || stored === "tr") return stored;

    var nav = (navigator.language || "tr").toLowerCase();
    return nav.indexOf("tr") === 0 ? "tr" : "en";
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      applyLang(b.getAttribute("data-lang"));
    });
  });

  applyLang(initialLang());

  /* ---------------------------------------------------------
     Sticky nav + mobile menu
     --------------------------------------------------------- */
  var nav = document.getElementById("nav");
  var burger = document.querySelector(".nav__burger");
  var menu = document.getElementById("mobilemenu");

  function onScroll() {
    nav.classList.toggle("is-stuck", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu();
      } else {
        nav.classList.add("is-open");
        burger.setAttribute("aria-expanded", "true");
        menu.hidden = false;
      }
    });

    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  var targets = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("is-in");
        io.unobserve(el);
        // drop the stagger once it has played, or it would also delay hovers
        setTimeout(function () { el.style.transitionDelay = ""; }, 900);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach(function (el, i) {
      // stagger siblings slightly so grids cascade instead of popping
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
