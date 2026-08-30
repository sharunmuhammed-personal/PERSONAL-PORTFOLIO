(function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("#project-grid .project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const cats = (card.dataset.categories || "").split(",");
        const show = filter === "All" || cats.includes(filter);
        card.style.display = show ? "" : "none";
      });
    });
  });
})();
