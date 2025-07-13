document.addEventListener("DOMContentLoaded", function () {
  const openSearch = document.getElementById("open-search");
  const closeSearch = document.getElementById("close-search");
  const searchOverlay = document.getElementById("search-overlay");

  openSearch.addEventListener("click", () => {
    searchOverlay.classList.add("active");
  });

  closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  // Đóng khi nhấn ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchOverlay.classList.remove("active");
    }
  });

  // Đóng khi click ra ngoài
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  });
});
