document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.querySelector(".bx-user");
  const authOverlay = document.getElementById("auth-overlay");
  const authTitle = document.getElementById("auth-title");
  const authForm = document.getElementById("auth-form");
  const toggleAuthContainer = document.querySelector(".toggle-auth");
  const authBtn = authForm.querySelector(".auth-btn");
  const signupOnlyFields = document.querySelectorAll(".signup-only");

  let isSignup = false;

  userIcon.addEventListener("click", () => {
    authOverlay.style.display = "flex";
  });

  const updateAuthView = () => {
    // Cập nhật tiêu đề
    authTitle.innerHTML = isSignup
      ? '<i class="bx bx-user-plus"></i> Đăng ký'
      : '<i class="bx bx-log-in-circle"></i> Đăng nhập';

    // Cập nhật nút chính
    authBtn.textContent = isSignup ? "Đăng ký" : "Đăng nhập";

    // Hiện hoặc ẩn các trường đăng ký
    signupOnlyFields.forEach((field) => {
      field.style.display = isSignup ? "block" : "none";
    });

    // Cập nhật dòng chuyển đổi (toggle text + link)
    toggleAuthContainer.innerHTML = isSignup
      ? `Đã có tài khoản? <a href="#" id="toggle-auth-link">Đăng nhập</a>`
      : `Chưa có tài khoản? <a href="#" id="toggle-auth-link">Đăng ký</a>`;

    // Gán lại sự kiện vì innerHTML làm mất sự kiện cũ
    document
      .getElementById("toggle-auth-link")
      .addEventListener("click", (e) => {
        e.preventDefault();
        isSignup = !isSignup;
        updateAuthView();
      });
  };

  // Khởi tạo
  updateAuthView();

  // Gửi form
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(isSignup ? "🎉 Đăng ký thành công!" : "✅ Đăng nhập thành công!");
    authForm.reset();
    authOverlay.style.display = "none";
  });

  // Nút đóng form
  const closeAuthBtn = document.querySelector(".close-auth");
  closeAuthBtn.addEventListener("click", () => {
    authOverlay.style.display = "none";
  });
});
