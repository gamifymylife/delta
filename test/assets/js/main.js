(function () {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      btn.style.setProperty("--mx", `${x}%`);
      btn.style.setProperty("--my", `${y}%`);
    });
  });
})();