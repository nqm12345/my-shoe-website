const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

// Toggle menu
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");

  if (navMenu.classList.contains("show")) {
    menuIcon.classList.replace("bx-menu", "bx-x");
  } else {
    menuIcon.classList.replace("bx-x", "bx-menu");
  }
});

// Highlight link đang active
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav__link");
  const currentPath = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath || (linkPath === "index.html" && currentPath === "")) {
      link.classList.add("active");
    }
  });
});
