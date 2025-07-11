
  const blogContainer = document.getElementById("blog-container");

  blogData.slice(0, 3).forEach((blog, index) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card hover-reveal";
    blogCard.setAttribute("style", `--bg-img: url('${blog.image}')`);
    blogCard.setAttribute("data-aos", "fade-up");
    blogCard.setAttribute("data-aos-delay", index * 200);

    blogCard.innerHTML = `
      <span class="blog-tag">${blog.tag}</span>
      <div class="blog-info">
        <h3>${blog.title}</h3>
        <p>${blog.date}</p>
      </div>
    `;

    blogCard.addEventListener("click", () => {
      window.location.href = `/html/blog-detail.html?id=${blog.id}`;
    });

    blogContainer.appendChild(blogCard);
  });

