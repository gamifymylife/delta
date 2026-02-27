(function () {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Optional project filtering (only runs if the elements exist)
  const chips = document.querySelectorAll("[data-filter]");
  const grid = document.getElementById("projectGrid");

  if (chips.length && grid) {
    function setActiveChip(activeEl) {
      chips.forEach((c) => c.classList.remove("chip-strong"));
      activeEl.classList.add("chip-strong");
    }

    function applyFilter(tag) {
      const items = grid.querySelectorAll("[data-tags]");
      items.forEach((item) => {
        const tags = (item.getAttribute("data-tags") || "").split(" ").filter(Boolean);
        const show = tag === "all" || tags.includes(tag);
        item.style.display = show ? "" : "none";
      });
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const tag = chip.getAttribute("data-filter");
        setActiveChip(chip);
        applyFilter(tag);
      });
    });
  }

  // Universal mobile menu (overlay layer)
  const btn = document.querySelector(".nav-toggle");
  const layer = document.getElementById("mobile-nav");
  const desktopNav = document.querySelector(".nav.nav-desktop");

  // If a page doesn't include the menu, do nothing.
  if (!btn || !layer || !desktopNav) return;

  const scrim = layer.querySelector(".nav-scrim");
  const mobileNav = layer.querySelector(".nav-mobile");
  if (!scrim || !mobileNav) return;

  // Build mobile links ONCE by cloning desktop links.
  // This guarantees one source of truth per page.
  function buildMobileNav() {
    if (mobileNav.childElementCount > 0) return;

    const links = desktopNav.querySelectorAll("a");
    links.forEach((a) => {
      const clone = a.cloneNode(true);
      clone.classList.add("nav-link");
      mobileNav.appendChild(clone);
    });
  }

  function isOpen() {
    return btn.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    buildMobileNav();
    btn.setAttribute("aria-expanded", "true");
    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    btn.setAttribute("aria-expanded", "false");
    layer.classList.remove("is-open");
    layer.setAttribute("aria-hidden", "true");
  }

  btn.addEventListener("click", () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  // Click scrim closes
  scrim.addEventListener("click", closeMenu);

  // Clicking a nav link closes
  mobileNav.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A") closeMenu();
  });

  // Escape closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Resize to desktop closes
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) closeMenu();
  });

  // Hard reset on load so you never get "open by default"
  closeMenu();
})();