(() => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const btn = document.querySelector(".nav-toggle");
  const layer = document.getElementById("mobile-nav");
  const scrim = layer ? layer.querySelector(".nav-scrim") : null;

  if (!btn || !layer || !scrim) return;

  const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function isOpen() {
    return document.body.classList.contains("nav-open");
  }

  function openMenu() {
    document.body.classList.add("nav-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
    layer.setAttribute("aria-hidden", "false");

    // prevent background scroll
    document.documentElement.style.overflow = "hidden";
  }

  function closeMenu() {
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    layer.setAttribute("aria-hidden", "true");

    document.documentElement.style.overflow = "";
  }

  btn.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  scrim.addEventListener("click", closeMenu);

  layer.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();

    // Basic focus trap when open
    if (e.key === "Tab" && isOpen()) {
      const focusables = layer.querySelectorAll(FOCUSABLE);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches && isOpen()) closeMenu();
  });
})();