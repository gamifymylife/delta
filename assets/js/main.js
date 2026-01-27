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
