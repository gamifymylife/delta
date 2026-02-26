(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const chips = document.querySelectorAll("[data-filter]");
  const grid = document.getElementById("projectGrid");

  if (!chips.length || !grid) return;

  function setActiveChip(activeEl) {
    chips.forEach((c) => c.classList.remove("chip-strong"));
    activeEl.classList.add("chip-strong");
  }

  function applyFilter(tag) {
    const items = grid.querySelectorAll("[data-tags]");
    items.forEach((item) => {
      const tags = (item.getAttribute("data-tags") || "").split(" ");
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
})();

(function () {
  const btn = document.querySelector(".nav-toggle");
  const panel = document.getElementById("mobile-nav");

  if (!btn || !panel) return;

  function isOpen() {
    return btn.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    document.body.classList.add("nav-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
    panel.hidden = false;

    const firstLink = panel.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    panel.hidden = true;

    btn.focus();
  }

  btn.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  panel.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (btn.contains(e.target) || panel.contains(e.target)) return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) closeMenu();
  });
})();