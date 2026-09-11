/* ============================================================
   Логика страницы: лента работ, прайс, галерея, лайтбокс.
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

  /* ---------- лента работ в главном экране ---------- */

  var reel = document.getElementById("reel");
  if (reel && window.WORKS && WORKS.length) {
    var track = document.createElement("div");
    track.className = "hero__track";

    // список дублируется: вторая половина подхватывает первую без стыка
    var strip = WORKS.concat(WORKS);
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

  /* ---------- прайс ---------- */

  var price = document.getElementById("price");
  if (price && window.SERVICES) {
    price.innerHTML = SERVICES.map(function (s) {
      return (
        "<li>" +
          '<span class="price__name">' + esc(s.name) +
            (s.hint ? '<span class="price__hint">' + esc(s.hint) + "</span>" : "") +
          "</span>" +
          '<span class="price__rule" aria-hidden="true"></span>' +
          '<span class="price__sum">' + esc(s.sum) + "</span>" +
        "</li>"
      );
    }).join("");
  }

  /* ---------- галерея ---------- */

  var grid = document.getElementById("grid");
  if (grid && window.WORKS) {
    grid.innerHTML = WORKS.map(function (w) {
      return (
        '<button class="tile" type="button" data-full="' + esc(w.src) + '" ' +
          'aria-label="Открыть фото: ' + esc(w.alt) + '">' +
          '<img src="' + esc(w.src) + '" alt="' + esc(w.alt) + '" loading="lazy" decoding="async">' +
        "</button>"
      );
    }).join("");
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

  if (grid && lb) {
    grid.addEventListener("click", function (e) {
      var t = e.target.closest(".tile");
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
