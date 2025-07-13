document.addEventListener('DOMContentLoaded', () => {
  // ===== LẤY PHẦN TỬ =====
  const prevBtn   = document.getElementById('prev');
  const nextBtn   = document.getElementById('next');
  const carousel  = document.querySelector('.carousel');
  if (!carousel || !prevBtn || !nextBtn) return;   // trang không có carousel → thoát

  const items     = carousel.querySelectorAll('.list .item');
  const indicator = carousel.querySelector('.indicators');
  const dots      = indicator.querySelectorAll('ul li');
  const numberBox = indicator.querySelector('.number');

  // ===== BIẾN TRẠNG THÁI =====
  let active        = 0;
  const last        = items.length - 1;
  let autoPlayId;

  // ===== HÀM TIỆN ÍCH =====
  const startAutoPlay = () => {
    clearInterval(autoPlayId);
    autoPlayId = setInterval(() => nextBtn.click(), 5000);
  };

  const setSlider = () => {
    /* đổi item */
    carousel.querySelector('.list .item.active')?.classList.remove('active');
    items[active].classList.add('active');

    /* đổi dot */
    indicator.querySelector('ul li.active')?.classList.remove('active');
    dots[active].classList.add('active');

    /* số thứ tự */
    numberBox.textContent = String(active + 1).padStart(2, '0');

    startAutoPlay();
  };

  // ===== KHỞI TẠO =====
  setSlider();

  // ===== SỰ KIỆN =====
  nextBtn.onclick = () => {
    active = (active + 1) > last ? 0 : active + 1;
    carousel.style.setProperty('--calculation', 1);
    setSlider();
  };

  prevBtn.onclick = () => {
    active = (active - 1) < 0 ? last : active - 1;
    carousel.style.setProperty('--calculation', -1);
    setSlider();
  };

  dots.forEach((dot, i) => {
    dot.onclick = () => {
      active = i;
      setSlider();
    };
  });
});
