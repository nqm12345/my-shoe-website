const tabButtons = document.querySelectorAll(".tab-btn");
const productCards = document.querySelectorAll(".main__product-cards");
const productTitle = document.getElementById("product-title");

const titles = {
  new: "Sản phẩm mới",
  hot: "Sản phẩm bán chạy",
  sale: "Sản phẩm giảm giá",
};

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selected = btn.getAttribute("data-tab");
    productTitle.textContent = titles[selected];

    productCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (category === selected) {
        card.style.display = "flex";

        // Reset animation class if needed
        card.classList.remove("fade-in");
        void card.offsetWidth;
        card.classList.add("fade-in");
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });

    // 👉 Thêm dòng này sau khi hiển thị các phần tử xong
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  });
});
