(function () {
  const header = document.getElementById('site-header');
  const mobileNav = document.getElementById('mobile-nav');
  const menuToggle = document.querySelector('.ab-menu-toggle');
  const heroSlides = document.querySelectorAll('.ab-hero__slide');
  const heroDots = document.querySelectorAll('.ab-hero__dot');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = mobileNav.hasAttribute('hidden');
      if (open) {
        mobileNav.removeAttribute('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileNav.setAttribute('hidden', '');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (heroSlides.length > 1) {
    let current = 0;

    const showSlide = (index) => {
      heroSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      heroDots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      current = index;
    };

    heroDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.slideTo || 0);
        showSlide(index);
      });
    });

    setInterval(() => {
      showSlide((current + 1) % heroSlides.length);
    }, 7000);
  }
})();
