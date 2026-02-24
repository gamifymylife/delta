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

  function closeMenu() {
    btn.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  }

  function openMenu() {
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  }

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });

  // Close menu when a link is clicked
  panel.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    if (btn.contains(e.target) || panel.contains(e.target)) return;
    closeMenu();
  });

  // Close when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) closeMenu();
  });
})();
