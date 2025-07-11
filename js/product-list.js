// const products = [
//   {
//     name: "Trail Running Shoe",
//     image: "images/pl-img1.jpg",
//     price: 189,
//     oldPrice: 199,
//     category: "men",
//     rating: 4,
//   },
//   {
//     name: "Air Max Plus",
//     image: "images/pl-img2.jpg",
//     price: 265,
//     category: "women",
//     rating: 5,
//   },
//   {
//     name: "Kid Fun Shoes",
//     image: "images/pl-img3.jpg",
//     price: 129,
//     category: "kids",
//     rating: 3,
//   },
//   {
//     name: "Trail Running Shoe",
//     image: "images/pl-img4.jpg",
//     price: 189,
//     oldPrice: 199,
//     category: "men",
//     rating: 4,
//   },
//   {
//     name: "Air Max Plus",
//     image: "images/pl-img5.jpg",
//     price: 265,
//     category: "women",
//     rating: 5,
//   },
//   {
//     name: "Kid Fun Shoes",
//     image: "images/pl-img6.jpg",
//     price: 129,
//     category: "kids",
//     rating: 3,
//   },
//   // Thêm nhiều sản phẩm nếu muốn test phân trang
// ];

// const plGrid = document.getElementById("pl-grid");
// const searchInput = document.getElementById("pl-search");
// const categorySelect = document.getElementById("pl-category");
// const priceSelect = document.getElementById("pl-price");
// const paginationContainer = document.getElementById("pl-pagination");

// let currentPage = 1;
// const itemsPerPage = 6;

// function getDiscountPercent(oldPrice, price) {
//   return Math.round(((oldPrice - price) / oldPrice) * 100);
// }

// function renderProducts(list) {
//   plGrid.innerHTML = "";
//   const start = (currentPage - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const paginatedProducts = list.slice(start, end);

//   paginatedProducts.forEach((p) => {
//     const discount = p.oldPrice
//       ? getDiscountPercent(p.oldPrice, p.price)
//       : null;

//     plGrid.innerHTML += `
//       <div class="pl-card">
//         <div class="pl-img-wrapper">
//           ${
//             discount ? `<div class="pl-discount-badge">-${discount}%</div>` : ""
//           }
//           <img src="${p.image}" alt="${p.name}">
//           <div class="pl-actions">
//             <i class='bx bx-heart'></i>
//             <i class='bx bx-cart'></i>
//             <i class='bx bx-right-arrow-alt'></i>
//           </div>
//         </div>
//         <div class="pl-info">
//           <div class="pl-name">${p.name}</div>
//           <div class="pl-price">
//             ${p.oldPrice ? `<del>$${p.oldPrice}</del>` : ""} <span>$${
//       p.price
//     }</span>
//           </div>
//           <div class="pl-rating">
//             ${'<i class="bx bxs-star"></i>'.repeat(p.rating)}
//             ${'<i class="bx bx-star"></i>'.repeat(5 - p.rating)}
//           </div>
//         </div>
//       </div>
//     `;
//   });
// }

// function renderPagination(totalItems) {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   paginationContainer.innerHTML = "";

//   if (totalPages <= 1) return;

//   let buttons = "";
//   for (let i = 1; i <= totalPages; i++) {
//     buttons += `<button onclick="changePage(${i})" class="${
//       i === currentPage ? "active" : ""
//     }">${i}</button>`;
//   }

//   paginationContainer.innerHTML = buttons;
// }

// function changePage(page) {
//   currentPage = page;
//   filterProducts();
// }

// function filterProducts() {
//   const search = searchInput.value.toLowerCase();
//   const category = categorySelect.value;
//   const price = priceSelect.value;

//   const filtered = products.filter((p) => {
//     const matchName = p.name.toLowerCase().includes(search);
//     const matchCategory = category === "all" || p.category === category;
//     const matchPrice =
//       price === "all" ||
//       (price === "low" && p.price < 150) ||
//       (price === "mid" && p.price >= 150 && p.price <= 200) ||
//       (price === "high" && p.price > 200);

//     return matchName && matchCategory && matchPrice;
//   });

//   renderProducts(filtered);
//   renderPagination(filtered.length);
// }

// searchInput.addEventListener("input", () => {
//   currentPage = 1;
//   filterProducts();
// });
// categorySelect.addEventListener("change", () => {
//   currentPage = 1;
//   filterProducts();
// });
// priceSelect.addEventListener("change", () => {
//   currentPage = 1;
//   filterProducts();
// });

// filterProducts();
