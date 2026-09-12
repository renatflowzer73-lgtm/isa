/* ============================================================
   Логика страницы: лента студии, блоки мастеров, ленты работ, лайтбокс.
   Данные берутся из js/data.js.
   ============================================================ */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* ---------- страница всегда открывается сверху ----------
     По умолчанию браузер возвращает посетителя туда, где он был
     в прошлый раз, и первый экран проходит мимо. Для одностраничника
     это ошибка: человек попадает в середину прайса вместо приглашения.
     Ссылку с якорем (#master-dinara) при этом не трогаем.              */

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  function toTop() {
    if (location.hash) return;
    var html = document.documentElement;
    var prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";   // иначе плавная прокрутка покажет рывок
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }

  toTop();
  window.addEventListener("load", toTop);
  window.addEventListener("pageshow", function (e) { if (e.persisted) toTop(); });

  /* ---------- лента с видами студии в главном экране ---------- */

  var reel = document.getElementById("reel");
  if (reel && window.STUDIO && STUDIO.length) {
    var track = document.createElement("div");
    track.className = "hero__track";

    // список дублируется: вторая половина подхватывает первую без стыка
    var strip = STUDIO.concat(STUDIO);
    strip.forEach(function (w, i) {
      var t = document.createElement("div");
      t.className = "tile";
      t.innerHTML =
        '<img src="' + esc(w.src) + '" alt="" loading="' +
        (i < 3 ? "eager" : "lazy") + '" decoding="async">';
      track.appendChild(t);
    });

    reel.appendChild(track);
  }

  /* ---------- блоки мастеров ---------- */

  var mb = document.getElementById("masters-body");
  if (mb && window.MASTERS) {
    mb.innerHTML = MASTERS.map(function (m) {
      var price = (m.price || []).map(function (g) {
        return (
          '<div class="mprice__group">' +
            '<h5 class="mprice__title">' + esc(g.group) + "</h5>" +
            (g.note ? '<p class="mprice__note">' + esc(g.note) + "</p>" : "") +
            '<ul class="mprice__list">' +
              g.items.map(function (it) {
                return (
                  "<li>" +
                    '<span class="mprice__name">' + esc(it[0]) + "</span>" +
                    '<span class="mprice__rule" aria-hidden="true"></span>' +
                    '<span class="mprice__sum">' + esc(it[1]) + "</span>" +
                  "</li>"
                );
              }).join("") +
            "</ul>" +
          "</div>"
        );
      }).join("");

      var works = (m.works || []).map(function (w) {
        // лента едет по кругу: список повторяется, пока не наберётся
        // достаточно кадров, затем дублируется целиком — стык не виден
        var base = w.shots.slice();
        while (base.length < 8) base = base.concat(w.shots);
        var seconds = Math.max(18, Math.round(base.length * 5));

        var tiles = base.concat(base).map(function (src, i) {
          return (
            '<button class="tile" type="button" data-full="' + esc(src) + '" ' +
              'tabindex="' + (i < base.length ? "0" : "-1") + '" ' +
              'aria-label="Открыть фото: ' + esc(w.title) + ", " + ((i % base.length) + 1) + '">' +
              '<img src="' + esc(src) + '" alt="' + esc(w.title) + ", работа мастера " +
                esc(m.name) + '" loading="lazy" decoding="async">' +
            "</button>"
          );
        }).join("");

        return (
          '<div class="mworks__set">' +
            '<h5 class="mworks__title">' + esc(w.title) + "</h5>" +
            '<div class="strip">' +
              '<div class="strip__track" style="animation-duration:' + seconds + 's">' +
                tiles +
              "</div>" +
            "</div>" +
          "</div>"
        );
      }).join("");


      return (
        '<article class="mcard" id="master-' + esc(m.id) + '">' +
          '<div class="mcard__top">' +
            '<div class="master__photo tile' + (m.patch ? " master__photo--patch" : "") + '">' +
              '<img src="' + esc(m.photo) + '" alt="' + esc(m.photoAlt) + '" loading="lazy" decoding="async">' +
            "</div>" +
          "</div>" +
          '<div class="mcard__price"><h4 class="h4">Прайс ' + esc(m.gen || m.name) + "</h4>" +
            '<div class="mprice">' + price + "</div></div>" +
          '<div class="mcard__works"><h4 class="h4">Работы ' + esc(m.gen || m.name) + "</h4>" + works + "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- кадры в лентах ----------
     Браузер откладывает загрузку кадров, которые стоят за краем экрана.
     В ленте они въезжают не прокруткой, а сдвигом, и эту отложенную
     загрузку он не пересматривает — вместо фотографии едет пустая плитка.
     Поэтому, как только лента доходит до экрана, снимаем откладывание
     со всех её кадров разом.                                            */

  function wakeStrip(box) {
    [].forEach.call(box.querySelectorAll("img[loading='lazy']"), function (img) {
      img.loading = "eager";
    });
  }

  function watchStrips() {
    var boxes = document.querySelectorAll(".strip, .hero__reel");
    if (!("IntersectionObserver" in window)) {
      [].forEach.call(boxes, wakeStrip);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        wakeStrip(en.target);
        io.unobserve(en.target);
      });
    }, { rootMargin: "300px 0px" });
    [].forEach.call(boxes, function (b) { io.observe(b); });
  }

  /* ---------- отзывы ---------- */

  var rv = document.getElementById("reviews-body");
  if (rv) {
    if (window.REVIEWS && REVIEWS.length) {
      rv.innerHTML =
        '<div class="quotes">' +
        REVIEWS.map(function (r) {
          return (
            "<figure class=\"quote\">" +
              "<blockquote><p>" + esc(r.text) + "</p></blockquote>" +
              "<figcaption><cite>" + esc(r.who) + "</cite></figcaption>" +
            "</figure>"
          );
        }).join("") +
        "</div>";
    } else {
      rv.innerHTML =
        '<div class="empty">' +
          "<p>Отзывы клиентов собраны в закреплённых историях профиля студии. " +
          "Там же видны работы в динамике и этапы заживления.</p>" +
          '<a class="link" href="https://www.instagram.com/isa.studio.pmu/">Читать отзывы в Instagram</a>' +
        "</div>";
    }
  }

  watchStrips();

  /* ---------- лайтбокс ---------- */

  var lb = document.getElementById("lb");
  var lbImg = document.getElementById("lb-img");
  var lbX = document.getElementById("lb-x");
  var lastFocus = null;

  function openLb(src, alt) {
    lastFocus = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lbX.focus();
  }

  function closeLb() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  if (lb) {
    document.addEventListener("click", function (e) {
      var t = e.target.closest(".tile[data-full]");
      if (!t) return;
      openLb(t.dataset.full, t.querySelector("img").alt);
    });
    lbX.addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lb.hidden) closeLb();
    });
  }

})();
