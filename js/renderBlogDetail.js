const urlParams = new URLSearchParams(window.location.search);
const blogId = parseInt(urlParams.get("id"));
const blog = blogData.find((item) => item.id === blogId);

if (blog) {
  const commentsHTML = blog.comments
    .map(
      (cmt, idx) => `
      <div class="comment-item" data-aos="fade-up" data-aos-delay="${idx * 100}">
        <img src="${cmt.avatar}" alt="${cmt.name}">
        <div>
          <h4>${cmt.name}</h4>
          <p>${cmt.text}</p>
        </div>
      </div>
    `
    )
    .join("");

  document.getElementById("blog-detail").innerHTML = `
    <div class="blog-subtitle" data-aos="fade-down">${blog.tag}</div>
    <h1 class="blog-title" data-aos="fade-up">${blog.title}</h1>

    <div class="blog-meta" data-aos="fade-right">
      <div class="blog-meta-left">
        <img src="${blog.author.avatar}" alt="${blog.author.name}" />
        <span class="blog-author-name">${blog.author.name}</span>
        <span class="blog-date">${blog.date}</span>
      </div>
    </div>

    <div class="blog-intro" data-aos="fade-up">
      <p class="dropcap">${blog.intro}</p>
    </div>

    <div class="blog-double-image" data-aos="zoom-in">
      <img src="${blog.image2}" alt="Image 2">
      <img src="${blog.image3}" alt="Image 3">
    </div>

    <blockquote data-aos="fade-left">
      <i class='bx bxs-quote-left'></i>${blog.quote}
    </blockquote>

    <div data-aos="fade-up">
      <h3>Cách tiếp cận sáng tạo cho mọi dự án</h3>
      <p>${blog.bottom}</p>
    </div>

    <div class="blog-single-image" data-aos="zoom-in-up">
      <img src="${blog.image}" alt="Main Image">
    </div>

    <div class="tags-share" data-aos="fade-up">
      <div class="tags">
        <a href="#">#Shoes</a>
        <a href="#">#Fashion</a>
        <a href="#">#Style</a>
      </div>
      <div class="share">
        <a href="#"><i class='bx bxl-facebook'></i></a>
        <a href="#"><i class='bx bxl-twitter'></i></a>
        <a href="#"><i class='bx bxl-pinterest'></i></a>
      </div>
    </div>

    <div class="comment-section" data-aos="fade-up">
      <h3>${blog.comments.length} Bình luận</h3>
      ${commentsHTML}

      <h3>Để lại bình luận của bạn</h3>
      <form>
        <input type="text" placeholder="Họ tên của bạn*">
        <input type="email" placeholder="Email của bạn*">
        <textarea placeholder="Bình luận của bạn*"></textarea>
        <label><input class="input__checkbox" type="checkbox"> Lưu thông tin cho lần sau</label>
        <button type="submit">Bình luận</button>
      </form>
    </div>

    <div class="blog-suggestion" data-aos="fade-up">
      <h3>Các bài viết liên quan</h3>
      <div class="suggestion-list">
        ${blogData
          .filter((item) => item.id !== blog.id)
          .map(
            (item, i) => `
              <div class="suggestion-card"
                   onclick="window.location.href='/html/blog-detail.html?id=${item.id}'"
                   data-aos="zoom-in-up"
                   data-aos-delay="${i * 100}">
                <img src="${item.image}" alt="${item.title}">
                <span class="suggestion-tag">${item.tag}</span>
                <h4 class="suggestion-title">${item.title}</h4>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  // Làm mới AOS để nhận diện các phần tử mới thêm vào DOM
  AOS.refresh();
} else {
  document.getElementById("blog-detail").innerHTML = `<h2 data-aos="fade-up">Không tìm thấy bài viết</h2>`;
}
