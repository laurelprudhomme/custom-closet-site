// site-data.js
// Loads live-editable pricing and gallery data (managed via /admin CMS)
// and renders it into any matching containers found on the current page.
// Safe to include on every page — it only touches elements that exist.

(function () {
  function renderPricing(category, rows) {
    var ul = document.getElementById("price-list-" + category);
    if (!ul || !rows || !rows.length) return;
    ul.innerHTML = "";
    rows.forEach(function (row) {
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.textContent = row.label;
      var b = document.createElement("b");
      b.textContent = row.price;
      li.appendChild(span);
      li.appendChild(b);
      ul.appendChild(li);
    });
  }

  function renderGalleryExtras(category, items) {
    var container = document.getElementById("gallery-extra-" + category);
    if (!container || !items || !items.length) return;
    items.forEach(function (item) {
      var div = document.createElement("div");
      div.className = "hanger-item";

      var hook = document.createElement("span");
      hook.className = "hanger-hook";

      var card = document.createElement("div");
      card.className = "garment-card";
      var img = document.createElement("img");
      img.src = item.image;
      img.alt = item.caption || "";
      card.appendChild(img);

      var caption = document.createElement("div");
      caption.className = "garment-caption";
      caption.textContent = item.caption || "";

      var sub = document.createElement("div");
      sub.className = "garment-sub";
      sub.textContent = item.sub || "";

      div.appendChild(hook);
      div.appendChild(card);
      div.appendChild(caption);
      div.appendChild(sub);
      container.appendChild(div);
    });
    container.style.display = "grid";
  }

  function loadJSON(path, cb) {
    fetch(path)
      .then(function (res) {
        if (!res.ok) throw new Error("failed to load " + path);
        return res.json();
      })
      .then(cb)
      .catch(function (err) {
        console.warn("site-data:", err.message);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var categories = ["jeans", "overalls", "hats", "baseball", "gradcaps", "headbands"];

    loadJSON("/data/pricing.json", function (data) {
      categories.forEach(function (cat) {
        if (data[cat]) renderPricing(cat, data[cat]);
      });
    });

    loadJSON("/data/gallery.json", function (data) {
      categories.forEach(function (cat) {
        if (data[cat]) renderGalleryExtras(cat, data[cat]);
      });
    });
  });
})();
