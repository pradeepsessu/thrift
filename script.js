/* =====================================================
   SCRIPT.JS
   =====================================================
   Everything here reads from the `products` array (and
   SHOP_SETTINGS) in products.js. You should never need to
   edit this file to add a product — only products.js.
   ===================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------
     STATE
     --------------------------------------------------- */
  var state = {
    search: "",
    waist: "",
    size: "",
    sort: "newest"
  };

  var modalState = {
    productId: null,
    imageIndex: 0
  };

  var lastFocusedElement = null;

  /* ---------------------------------------------------
     ELEMENT REFERENCES
     --------------------------------------------------- */
  var grid = document.getElementById("productGrid");
  var emptyState = document.getElementById("emptyState");
  var resultsCount = document.getElementById("resultsCount");

  var searchInput = document.getElementById("filterSearch");
  var waistSelect = document.getElementById("filterWaist");
  var sizeSelect = document.getElementById("filterSize");
  var sortSelect = document.getElementById("filterSort");

  var modal = document.getElementById("productModal");
  var modalImage = document.getElementById("modalImage");
  var modalPrev = document.getElementById("modalPrev");
  var modalNext = document.getElementById("modalNext");
  var modalDots = document.getElementById("modalDots");
  var modalCode = document.getElementById("modalCode");
  var modalBrand = document.getElementById("modalBrand");
  var modalProductName = document.getElementById("modalProductName");
  var modalPrice = document.getElementById("modalPrice");
  var modalDescription = document.getElementById("modalDescription");
  var modalBuyBtn = document.getElementById("modalBuyBtn");
  var modalSoldBadge = document.getElementById("modalSoldBadge");
  var modalTagWaist = document.getElementById("modalTagWaist");
  var modalTagLength = document.getElementById("modalTagLength");
  var modalTagSize = document.getElementById("modalTagSize");
  var modalClose = document.getElementById("modalClose");

  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  var navLinks = document.querySelectorAll("[data-nav-link]");
  var views = document.querySelectorAll(".view");

  var siteHeader = document.getElementById("siteHeader");
  var shopDropBtn = document.getElementById("shopDropBtn");
  var reelGrid = document.getElementById("reelGrid");

  /* ---------------------------------------------------
     IMAGE PLACEHOLDER (used if a product or reel image
     is missing, e.g. before real photos are added)
     --------------------------------------------------- */
  function placeholderFor(label) {
    var safeLabel = (label || "Image").slice(0, 24);
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800">' +
      '<rect width="100%" height="100%" fill="#E9EDE7"/>' +
      '<text x="50%" y="50%" font-family="monospace" font-size="24" ' +
      'fill="#6B6B6B" text-anchor="middle" dominant-baseline="middle">' +
      safeLabel + '</text></svg>';
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function attachImageFallback(img, label) {
    img.addEventListener("error", function handler() {
      img.removeEventListener("error", handler);
      img.src = placeholderFor(label);
    });
  }

  /* ---------------------------------------------------
     FILTER OPTIONS (built automatically from products.js
     so new waists/sizes show up with no extra edits)
     --------------------------------------------------- */
  function populateFilterOptions() {
    var waists = uniqueSorted(products.map(function (p) { return p.waist; }), true);
    var sizes = uniqueSorted(products.map(function (p) { return p.size; }));

    waists.forEach(function (waist) {
      waistSelect.appendChild(new Option(waist + '"', waist));
    });
    sizes.forEach(function (size) {
      sizeSelect.appendChild(new Option(size, size));
    });
  }

  function uniqueSorted(arr, numeric) {
    var seen = {};
    var out = [];
    arr.forEach(function (val) {
      if (!(val in seen)) {
        seen[val] = true;
        out.push(val);
      }
    });
    out.sort(function (a, b) {
      if (numeric) return a - b;
      return String(a).localeCompare(String(b));
    });
    return out;
  }

  /* ---------------------------------------------------
     FILTERING + SORTING
     --------------------------------------------------- */
  function getFilteredProducts() {
    var q = state.search.trim().toLowerCase();

    var filtered = products.filter(function (p) {
      if (state.waist && String(p.waist) !== state.waist) return false;
      if (state.size && p.size !== state.size) return false;
      if (q) {
        var haystack = (p.name + " " + p.brand + " " + p.description).toLowerCase();
        if (haystack.indexOf(q) === -1) return false;
      }
      return true;
    });

    filtered.sort(function (a, b) {
      if (state.sort === "price-asc") return a.price - b.price;
      if (state.sort === "price-desc") return b.price - a.price;
      // newest: fall back to id if dateAdded is missing
      var dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : a.id;
      var dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : b.id;
      return dateB - dateA;
    });

    return filtered;
  }

  /* ---------------------------------------------------
     RENDER: PRODUCT GRID
     --------------------------------------------------- */
  function formatPrice(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
  }

  function renderGrid() {
    var list = getFilteredProducts();
    grid.innerHTML = "";

    resultsCount.textContent = list.length + (list.length === 1 ? " pair" : " pairs");
    emptyState.hidden = list.length !== 0;

    list.forEach(function (product) {
      grid.appendChild(buildCard(product));
    });
  }

  function buildCard(product) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "product-card";
    card.setAttribute("data-product-id", product.id);
    card.setAttribute("aria-label", product.name + ", " + product.brand + ", " + formatPrice(product.price));

    var media = document.createElement("div");
    media.className = "product-card__media";

    var img = document.createElement("img");
    img.src = product.images[0];
    img.alt = product.brand + " " + product.name;
    img.loading = "lazy";
    attachImageFallback(img, product.name);
    media.appendChild(img);

    if (product.sold) {
      var soldBadge = document.createElement("span");
      soldBadge.className = "product-card__sold";
      soldBadge.textContent = "Sold";
      media.appendChild(soldBadge);
    }

    // Store brand is the primary identity shown on the photo itself.
    var storeTag = document.createElement("span");
    storeTag.className = "product-card__tag";
    storeTag.textContent = "Zoku.thrift";
    media.appendChild(storeTag);

    var body = document.createElement("div");
    body.className = "product-card__body";
    body.innerHTML =
      '<span class="product-card__row-top">' +
        '<span class="product-card__name">' + escapeHtml(product.name) + '</span>' +
        '<span class="product-card__price">' + formatPrice(product.price) + '</span>' +
      '</span>' +
      '<span class="product-card__meta">' + escapeHtml(product.brand) + ' · Size ' + escapeHtml(product.size) + '</span>' +
      '<span class="product-card__badges">' +
        '<span class="product-card__one-of-one">One-of-One</span>' +
      '</span>';

    card.appendChild(media);
    card.appendChild(body);

    card.addEventListener("click", function () {
      openModal(product.id);
    });

    return card;
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------------------------------------------
     RENDER: LATEST DROPS (reel thumbnails)
     --------------------------------------------------- */
  function renderReels() {
    if (!reelGrid || !SHOP_SETTINGS.reels) return;
    reelGrid.innerHTML = "";

    SHOP_SETTINGS.reels.forEach(function (reel, index) {
      var link = document.createElement("a");
      link.className = "reel-card";
      link.href = reel.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", "Watch our latest reel " + (index + 1) + " on Instagram");

      var img = document.createElement("img");
      img.src = reel.image;
      img.alt = "Zoku.thrift Instagram reel " + (index + 1);
      img.loading = "lazy";
      attachImageFallback(img, "Reel " + (index + 1));

      var play = document.createElement("span");
      play.className = "reel-card__play";
      play.setAttribute("aria-hidden", "true");
      play.textContent = "▶";

      link.appendChild(img);
      link.appendChild(play);
      reelGrid.appendChild(link);
    });
  }

  /* ---------------------------------------------------
     MODAL
     --------------------------------------------------- */
  function openModal(productId) {
    var product = products.filter(function (p) { return p.id === productId; })[0];
    if (!product) return;

    lastFocusedElement = document.activeElement;
    modalState.productId = productId;
    modalState.imageIndex = 0;

    modalCode.textContent = product.code || "";
    modalBrand.textContent = product.brand;
    modalProductName.textContent = product.name;
    modalPrice.textContent = formatPrice(product.price);
    modalDescription.textContent = product.description;
    modalSoldBadge.hidden = !product.sold;

    modalTagWaist.textContent = "Waist " + product.waist + '"';
    modalTagLength.textContent = "Length " + product.length + '"';
    modalTagSize.textContent = "Size " + product.size;

    var message = encodeURIComponent(
      "Hi! I'd like to reserve " + product.name + " (" + product.code + "), " + product.brand + "."
    );
    modalBuyBtn.href = "https://ig.me/m/" + SHOP_SETTINGS.instagramUsername;
    modalBuyBtn.setAttribute("data-message", message);

    renderModalGallery(product);

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function renderModalGallery(product) {
    modalDots.innerHTML = "";
    product.images.forEach(function (src, index) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show image " + (index + 1));
      if (index === modalState.imageIndex) dot.className = "is-active";
      dot.addEventListener("click", function () {
        modalState.imageIndex = index;
        updateModalImage(product);
      });
      modalDots.appendChild(dot);
    });
    updateModalImage(product);
  }

  function updateModalImage(product) {
    var src = product.images[modalState.imageIndex];
    modalImage.src = src;
    modalImage.alt = product.brand + " " + product.name + " — image " + (modalState.imageIndex + 1) + " of " + product.images.length;
    attachImageFallback(modalImage, product.name);

    var dots = modalDots.querySelectorAll("button");
    dots.forEach(function (dot, index) {
      dot.className = index === modalState.imageIndex ? "is-active" : "";
    });

    var hasMultiple = product.images.length > 1;
    modalPrev.style.display = hasMultiple ? "" : "none";
    modalNext.style.display = hasMultiple ? "" : "none";
    modalDots.style.display = hasMultiple ? "" : "none";
  }

  function stepModalImage(direction) {
    var product = products.filter(function (p) { return p.id === modalState.productId; })[0];
    if (!product) return;
    var count = product.images.length;
    modalState.imageIndex = (modalState.imageIndex + direction + count) % count;
    updateModalImage(product);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function onModalKeydown(event) {
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") stepModalImage(-1);
    if (event.key === "ArrowRight") stepModalImage(1);
  }

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", function () { stepModalImage(-1); });
  modalNext.addEventListener("click", function () { stepModalImage(1); });
  document.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  /* ---------------------------------------------------
     FILTER EVENT BINDINGS
     --------------------------------------------------- */
  var searchDebounceTimer = null;
  searchInput.addEventListener("input", function () {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(function () {
      state.search = searchInput.value;
      renderGrid();
    }, 150);
  });

  waistSelect.addEventListener("change", function () {
    state.waist = waistSelect.value;
    renderGrid();
  });
  sizeSelect.addEventListener("change", function () {
    state.size = sizeSelect.value;
    renderGrid();
  });
  sortSelect.addEventListener("change", function () {
    state.sort = sortSelect.value;
    renderGrid();
  });

  /* ---------------------------------------------------
     PAGE NAVIGATION (single page, hash-based views)
     --------------------------------------------------- */
  function showView(viewId) {
    views.forEach(function (view) {
      view.hidden = view.id !== viewId;
    });
    navLinks.forEach(function (link) {
      var linkView = link.getAttribute("data-view") || "home";
      link.classList.toggle("is-active", linkView === viewId);
    });
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
  }

  function routeFromHash() {
    var hash = window.location.hash.replace("#", "") || "home";
    var validIds = ["home", "about", "how-to-buy", "contact"];
    showView(validIds.indexOf(hash) !== -1 ? hash : "home");
  }

  window.addEventListener("hashchange", routeFromHash);
  navToggle.addEventListener("click", function () {
    var isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  /* ---------------------------------------------------
     "Shop the Drop" — scroll straight to the grid
     without disturbing the hash-based router
     --------------------------------------------------- */
  if (shopDropBtn) {
    shopDropBtn.addEventListener("click", function () {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------------------------------------------------
     Header shrinks slightly on scroll (subtle, no layout jump)
     --------------------------------------------------- */
  function onScroll() {
    if (window.scrollY > 12) {
      siteHeader.classList.add("is-scrolled");
    } else {
      siteHeader.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------
     CONTACT PAGE: fill in Instagram / email from settings
     --------------------------------------------------- */
  function applyShopSettings() {
    var igLink = document.getElementById("contactInstagramLink");
    var igHandle = document.getElementById("contactInstagramHandle");
    var emailLink = document.getElementById("contactEmailLink");

    igLink.href = "https://www.instagram.com/" + SHOP_SETTINGS.instagramUsername + "/";
    igHandle.textContent = "@" + SHOP_SETTINGS.instagramUsername;
    emailLink.href = "mailto:" + SHOP_SETTINGS.contactEmail;
    emailLink.querySelector(".contact-card__value").textContent = SHOP_SETTINGS.contactEmail;
  }

  /* ---------------------------------------------------
     INIT
     --------------------------------------------------- */
  function init() {
    populateFilterOptions();
    renderGrid();
    renderReels();
    applyShopSettings();
    routeFromHash();
    onScroll();
    document.getElementById("footerYear").textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
