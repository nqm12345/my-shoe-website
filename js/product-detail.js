const product = JSON.parse(localStorage.getItem("selectedProduct"));
const cart = JSON.parse(localStorage.getItem("cart")) || [];

let selectedSize = null;
let selectedColor = null;

if (product) {
  document.getElementById("product-title").textContent = product.name;
  document.getElementById("main-img").src = product.thumbs?.[0] || product.image;

  const priceHTML = product.oldPrice
    ? `<del>$${product.oldPrice}</del> <span>$${product.price}</span>`
    : `<span>$${product.price}</span>`;
  document.getElementById("price").innerHTML = priceHTML;

  document.getElementById("rating").innerHTML =
    `${"<i class='bx bxs-star'></i>".repeat(product.rating)}${"<i class='bx bx-star'></i>".repeat(5 - product.rating)}`;
  document.getElementById("description").textContent = "Đôi giày thể thao Nike Air Max mang đến sự thoải mái tối đa cho mọi bước đi. Thiết kế hiện đại, năng động, phù hợp cho cả luyện tập và thời trang hàng ngày.";
  document.getElementById("category").textContent = product.category;

  if (product.oldPrice) {
    const discount = Math.round(100 - (product.price / product.oldPrice) * 100);
    document.getElementById("discount-badge").textContent = `-${discount}%`;
    document.getElementById("discount-badge").style.display = "inline-block";
  } else {
    document.getElementById("discount-badge").style.display = "none";
  }

  // Hiển thị thumbnails
  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = "";
  if (product.thumbs?.length > 0) {
    product.thumbs.forEach((thumb, i) => {
      const img = document.createElement("img");
      img.src = thumb;
      img.classList.toggle("active", i === 0);
      img.addEventListener("click", () => {
        document.getElementById("main-img").src = thumb;
        thumbs.querySelectorAll("img").forEach(t => t.classList.remove("active"));
        img.classList.add("active");
      });
      thumbs.appendChild(img);
    });
  }

  // ✅ Hiển thị size
  const sizeOptions = document.getElementById("size-options");
  if (product.sizes?.length > 0 && sizeOptions) {
    sizeOptions.innerHTML = "<p><strong>Chọn size:</strong></p>";
    product.sizes.forEach(size => {
      const btn = document.createElement("button");
      btn.textContent = size;
      btn.classList.add("size-btn");
      btn.addEventListener("click", () => {
        sizeOptions.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = size;
      });
      sizeOptions.appendChild(btn);
    });
  }

  // ✅ Hiển thị màu
  const colorOptions = document.getElementById("color-options");
  if (product.colors?.length > 0 && colorOptions) {
    colorOptions.innerHTML = "<p><strong>Chọn màu:</strong></p>";
    product.colors.forEach(color => {
      const btn = document.createElement("button");
      btn.textContent = color;
      btn.classList.add("color-btn");
      btn.style.backgroundColor = color.toLowerCase();
      btn.style.color = "#fff";
      btn.addEventListener("click", () => {
        colorOptions.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedColor = color;
      });
      colorOptions.appendChild(btn);
    });
  }
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElem = document.getElementById("cart-count");
  if (countElem) countElem.textContent = count;
}

function renderCartItems() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${item.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;" />
        <div>
          <strong>${item.name}</strong><br/>
          <small>Số lượng: ${item.quantity}</small>
          ${item.size ? `<br/><small>Size: ${item.size}</small>` : ""}
          ${item.color ? `<br/><small>Màu: ${item.color}</small>` : ""}
        </div>
      </div>
    `;

    cartItems.appendChild(li);
    const price = typeof item.price === "string" ? parseFloat(item.price.replace("$", "")) : item.price;
    total += price * item.quantity;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

document.getElementById("buy-now").addEventListener("click", () => {
  const quantity = parseInt(document.getElementById("quantity").value) || 1;

  // ✅ Kiểm tra bắt buộc nếu có size hoặc color
  if (product.sizes?.length > 0 && !selectedSize) {
    alert("⚠️ Vui lòng chọn size trước khi mua.");
    return;
  }
  if (product.colors?.length > 0 && !selectedColor) {
    alert("⚠️ Vui lòng chọn màu trước khi mua.");
    return;
  }

  const existing = cart.find(i =>
    i.name === product.name &&
    i.size === selectedSize &&
    i.color === selectedColor
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      name: product.name,
      price: `$${product.price}`,
      image: product.image,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  alert("✅ Sản phẩm đã được thêm vào giỏ hàng!");
});

// Tabs switching
document.querySelectorAll(".tabs nav div").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tabs nav div").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    document.getElementById("tab-desc").style.display = tab.dataset.tab === "desc" ? "block" : "none";
    document.getElementById("tab-reviews").style.display = tab.dataset.tab === "reviews" ? "block" : "none";
  });
});

updateCartCount();
renderCartItems();
