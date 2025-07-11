const blogListContainer = document.getElementById("blog-list");

function renderBlogList() {
  const html = blogData
    .map((blog, idx) => {
      // mỗi card trễ hơn 50 ms so với card trước
      const delay = idx * 50;

      return `
        <div
          class="blog-card"
          onclick="window.location.href='/html/blog-detail.html?id=${blog.id}'"
          data-aos="fade-up"
          data-aos-delay="${delay}"
        >
          <img src="${blog.image}" alt="${blog.title}" class="blog-card-img" />
          <div class="blog-card-content">
            <span class="blog-tag">${blog.tag}</span>
            <h2 class="blog-card-title">${blog.title}</h2>
            <p class="blog-card-intro">${blog.intro.slice(0, 100)}...</p>
            <div class="blog-card-meta">
              <img src="${blog.author.avatar}" alt="${blog.author.name}" />
              <span>${blog.author.name}</span> • <span>${blog.date}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  blogListContainer.innerHTML = html;

  /* Nếu blogData mới được load sau khi trang đã init AOS,
     cần refresh để AOS “nhận” các phần tử vừa render */
  AOS.refresh();     // đảm bảo AOS hoạt động với nội dung động
}

renderBlogList();
