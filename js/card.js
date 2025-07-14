// ===== MAIN CART SYSTEM =====
document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = document.getElementById("cart-count");
  const cartPopup = document.getElementById("cart-popup");
  const cartItems = document.getElementById("cart-items");
  const cartIcon = document.getElementById("cart-icon");
  const cartTotal = document.getElementById("cart-total");
  const checkoutOverlay = document.getElementById("checkout-overlay");
  const checkoutForm = document.getElementById("checkout-form");
  const cancelCheckoutBtn = document.getElementById("cancel-checkout");
  const paymentDetails = document.getElementById("payment-details");
  const checkoutBtn = document.querySelector(".checkout-btn");

  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartUI() {
    if (!cartCount || !cartItems || !cartTotal) return;

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItems.innerHTML = "";
    let total = 0;

  cart.forEach((item, index) => {
  const li = document.createElement("li");
  const price = parseFloat(item.price.replace("$", ""));
  total += price * item.quantity;

  li.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div class="info">
      <strong>${item.name}</strong><br/>
      ${item.color ? `Màu: ${item.color}<br/>` : ""}
      ${item.size ? `Size: ${item.size}<br/>` : ""}
      Giá: ${item.price}
      <div class="quantity-control">
        <button class="quantity-btn minus">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn plus">+</button>
      </div>
    </div>
    <button class="remove-btn">&times;</button>
  `;

      li.querySelector(".plus").addEventListener("click", () => {
        item.quantity++;
        updateCartUI();
      });
      li.querySelector(".minus").addEventListener("click", () => {
        if (item.quantity > 1) item.quantity--;
        else cart.splice(index, 1);
        updateCartUI();
      });
      li.querySelector(".remove-btn").addEventListener("click", () => {
        cart.splice(index, 1);
        updateCartUI();
      });

      cartItems.appendChild(li);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    saveCartToLocalStorage();
  }

  updateCartUI();

  if (cartIcon && cartPopup) {
    cartIcon.addEventListener("click", () => {
      cartPopup.classList.toggle("show");
    });
  }

  if (checkoutBtn && checkoutOverlay) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("🛒 Giỏ hàng của bạn đang trống!");
        return;
      }
      cartPopup.classList.remove("show");
      checkoutOverlay.style.display = "flex"; // Hiện modal thanh toán
    });
  }
if (checkoutForm && checkoutOverlay) {
  const paymentSelect = document.getElementById("payment-select");
  const templates = {
    momo: `<div class="form-group"><span>Số MoMo</span><input type="tel" placeholder="Nhập số MoMo" required /></div>`,
    bank: `<div class="form-group"><span>Số tài khoản</span><input type="text" placeholder="Nhập số tài khoản" required /></div>`
  };

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Cảm ơn bạn đã thanh toán!");
    cart = [];
    updateCartUI();
    checkoutForm.reset();
    if (paymentDetails) paymentDetails.innerHTML = "";
    checkoutOverlay.style.display = "none";
  });

  if (cancelCheckoutBtn) {
    cancelCheckoutBtn.addEventListener("click", () => {
      checkoutOverlay.style.display = "none";
    });
  }

  if (paymentSelect) {
    paymentSelect.addEventListener("change", (e) => {
      const method = e.target.value;
      paymentDetails.innerHTML = templates[method] || "";
    });
  }
}

  // ==== MAIN PRODUCT CARDS ====
  document.querySelectorAll(".main__product-cards").forEach((card) => {
    const colorContainer = card.querySelector(".colors");
    if (colorContainer) {
      colorContainer.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("circle")) {
          card.querySelectorAll(".circle").forEach(c => c.classList.remove("active"));
          target.classList.add("active");

          const imgBox = card.querySelector(".imgBox");
          if (imgBox) {
            imgBox.querySelectorAll("img").forEach(img => img.classList.remove("active"));
            const newImg = imgBox.querySelector(`img.${target.id}`);
            if (newImg) newImg.classList.add("active");
          }
        }
      });
    }

    const btn = card.querySelector(".btn button");
    if (btn) {
      btn.addEventListener("click", () => {
        const name = card.querySelector(".info-cards h2")?.textContent;
        const price = card.querySelector(".price span")?.textContent;
        const color = card.querySelector(".circle.active")?.id || "default";
        const img = card.querySelector(`.imgBox img.${color}`)?.src;
        if (!name || !price || !img) return;

        const existing = cart.find(i => i.name === name && i.color === color);
        existing ? existing.quantity++ : cart.push({ name, price, color, image: img, quantity: 1 });
        updateCartUI();
      });
    }
  });

  // ==== PL PRODUCTS FILTER + RENDER ====
const products = [
  {
    name: "Giày adidas Campus 2 Nam - Xám",
    brand: "Adidas",
    image: "/images/pl-img1.jpg",
    thumbs: ["/images/pl-img1.jpg", "/images/pl-img1-thumb1.jpg", "/images/pl-img1-thumb2.jpg"],
    price: 189,
    oldPrice: 199,
    category: "Nam",
    rating: 4,
    sizes: [39, 40, 41, 42, 43]
  },
  {
    name: "Giày Puma Court Classic Nam - Trắng Đen",
    brand: "Puma",
    image: "/images/pl-img2.jpg",
    thumbs: ["/images/pl-img2.jpg", "/images/pl-img2-thumb1.jpg", "/images/pl-img2-thumb2.jpg"],
    price: 265,
    category: "Nam",
    rating: 5,
    sizes: [36, 37, 38, 39, 40]
  },
  {
    name: "Giày Nike DownShifter 13 Nam - Trắng Xanh",
    brand: "Nike",
    image: "/images/pl-img3.jpg",
    thumbs: ["/images/pl-img3.jpg", "/images/pl-img3-thumb1.jpg", "/images/pl-img3-thumb2.jpg"],
    price: 129,
    category: "Nam",
    rating: 3,
    sizes: [30, 31, 32, 33, 34]
  },
  {
    name: "Giày Puma Tori Nữ - Trắng Xanh Ngọc",
    brand: "Puma",
    image: "/images/pl-img4.jpg",
    thumbs: ["/images/pl-img4.jpg", "/images/pl-img4-thumb1.jpg", "/images/pl-img4-thumb2.jpg"],
    price: 189,
    oldPrice: 199,
    category: "Nữ",
    rating: 4,
    sizes: [40, 41, 42, 43, 44]
  },
  {
    name: "Giày Nike Run Defy Nữ - Trắng Tím",
    brand: "Nike",
    image: "/images/pl-img5.jpg",
    thumbs: ["/images/pl-img5.jpg", "/images/pl-img5-thumb1.jpg", "/images/pl-img5-thumb2.jpg"],
    price: 265,
    category: "Nữ",
    rating: 5,
    sizes: [37, 38, 39, 40, 41]
  },
  {
    name: "Giày Adidas Forum Low CL Nữ - Trắng Xanh Ngọc",
    brand: "Adidas",
    image: "/images/pl-img6.jpg",
    thumbs: ["/images/pl-img6.jpg", "/images/pl-img6-thumb1.jpg", "/images/pl-img6-thumb2.jpg"],
    price: 129,
    category: "Nữ",
    rating: 3,
    sizes: [30, 31, 32, 33, 34]
  },
  {
    name: "Giày Sneaker Bé Trai Nike Dynamo 2 Easyon",
    brand: "Nike",
    image: "/images/pl-img7.webp",
    thumbs: ["/images/pl-img7.webp", "/images/pl-img7-thumb1.webp", "/images/pl-img7-thumb2.webp"],
    price: 189,
    oldPrice: 199,
    category: "Trẻ em",
    rating: 4,
    sizes: [26, 27, 28, 29, 30]
  },
  {
    name: "Sandal trẻ em adidas Pixar Water Disney",
    brand: "Adidas",
    image: "/images/pl-img8.avif",
    thumbs: ["/images/pl-img8.avif", "/images/pl-img8-thumb1.avif", "/images/pl-img8-thumb2.avif"],
    price: 265,
    category: "Trẻ em",
    rating: 5,
    sizes: [26, 27, 28, 29, 30]
  },
  {
    name: "Giày thể thao PUMA x PLAYMOBIL® R78",
    brand: "Puma",
    image: "/images/pl-img9.avif",
    thumbs: ["/images/pl-img9.avif", "/images/pl-img9-thumb1.avif", "/images/pl-img9-thumb2.avif"],
    price: 129,
    category: "Trẻ em",
    rating: 3,
    sizes: [26, 27, 28, 29, 30]
  }
];



const searchInput     = document.getElementById("pl-search");
const categorySelect  = document.getElementById("pl-category");
const brandSelect     = document.getElementById("pl-brand");
const priceMinInput   = document.getElementById("price-min");
const priceMaxInput   = document.getElementById("price-max");
  const plGrid = document.getElementById("pl-grid");
  const paginationContainer = document.getElementById("pl-pagination");
  let currentPage = 1, itemsPerPage = 6;

  function getDiscountPercent(oldP, newP) {
    return Math.round(((oldP - newP) / oldP) * 100);
  }

  function renderProducts(list) {
    if (!plGrid) return;
    plGrid.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = list.slice(start, start + itemsPerPage);

paginated.forEach((p, index) => {
  const discount = p.oldPrice ? getDiscountPercent(p.oldPrice, p.price) : null;
  const div = document.createElement("div");

  // ✅ Thêm animation vào div.card
  div.className = "pl-card";
  div.setAttribute("data-aos", "fade-up"); // hoặc "zoom-in", "flip-left" tùy bạn
  div.setAttribute("data-aos-delay", `${index * 100}`); // delay tăng dần

  div.innerHTML = `
    <div class="pl-img-wrapper">
      ${discount ? `<div class="pl-discount-badge">-${discount}%</div>` : ""}
      <img src="${p.image}" alt="${p.name}">
      <div class="pl-actions">
        <i class='bx bx-heart'></i>
        <i class='bx bx-cart'></i>
        <i class='bx bx-right-arrow-alt'></i>
      </div>
    </div>
    <div class="pl-info">
      <div class="pl-name">${p.name}</div>
      <div class="pl-price">
        ${p.oldPrice ? `<del>$${p.oldPrice}</del>` : ""} <span>$${p.price}</span>
      </div>
      <div class="pl-rating">
        ${'<i class="bx bxs-star"></i>'.repeat(p.rating)}
        ${'<i class="bx bx-star"></i>'.repeat(5 - p.rating)}
      </div>
    </div>
  `;

  // Sự kiện click cho cart
  div.querySelector(".bx-cart").addEventListener("click", () => {
    const existing = cart.find(i => i.name === p.name && i.color === "default");
    existing ? existing.quantity++ : cart.push({ name: p.name, price: `$${p.price}`, color: "default", image: p.image, quantity: 1 });
    updateCartUI();
  });

  // Sự kiện click sang chi tiết sản phẩm
  div.querySelector(".bx-right-arrow-alt").addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(p));
    window.location.href = "/html/product-detail.html";
  });

  plGrid.appendChild(div);
});

// ✅ Sau khi render toàn bộ → gọi AOS.refresh()
AOS.refresh();

  }

  function renderPagination(totalItems) {
    if (!paginationContainer) return;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentPage = i;
        filterProducts();
      });
      paginationContainer.appendChild(btn);
    }
  }

 function filterProducts() {
  const search    = searchInput?.value.toLowerCase() || "";
  const category  = categorySelect?.value || "all";
  const brand     = brandSelect?.value || "all";
  const minPrice  = parseFloat(priceMinInput?.value) || 0;
  const maxPrice  = parseFloat(priceMaxInput?.value) || Infinity;

  const filtered = products.filter(p => {
    const matchName     = p.name.toLowerCase().includes(search);
    const matchCategory = category === "all" || p.category === category;
    const matchBrand    = brand === "all" || p.name.toLowerCase().includes(brand.toLowerCase());
    const matchPrice    = p.price >= minPrice && p.price <= maxPrice;
    return matchName && matchCategory && matchBrand && matchPrice;
  });

  renderProducts(filtered);
  renderPagination(filtered.length);
}

/* ========= GẮN SỰ KIỆN ========= */
if (searchInput)     searchInput.addEventListener("input",  () => { currentPage = 1; filterProducts(); });
if (categorySelect)  categorySelect.addEventListener("change", () => { currentPage = 1; filterProducts(); });
if (brandSelect)     brandSelect.addEventListener("change", () => { currentPage = 1; filterProducts(); });
if (priceMinInput)   priceMinInput.addEventListener("input",  () => { currentPage = 1; filterProducts(); });
if (priceMaxInput)   priceMaxInput.addEventListener("input",  () => { currentPage = 1; filterProducts(); });

/* ========= KHỞI TẠO LẦN ĐẦU ========= */
filterProducts();
});
