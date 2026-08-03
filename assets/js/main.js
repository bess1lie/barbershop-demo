document.addEventListener('DOMContentLoaded', () => {
  // === MOBILE MENU MECHANISM ===
  const burgerToggle = document.getElementById('burger-toggle');
  const burgerClose = document.getElementById('burger-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');

  function openMenu() {
    mobileMenu.classList.add('is-active');
    menuOverlay.classList.add('is-active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuOverlay.setAttribute('aria-hidden', 'false');
    if (burgerToggle) {
      burgerToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-active');
    menuOverlay.classList.remove('is-active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuOverlay.setAttribute('aria-hidden', 'true');
    if (burgerToggle) {
      burgerToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (burgerToggle) {
    burgerToggle.addEventListener('click', () => mobileMenu.classList.contains('is-active') ? closeMenu() : openMenu());
  }

  if (burgerClose) {
    burgerClose.addEventListener('click', closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
      closeMenu();
    }
  });

  // === FADE-UP INTERSECTION OBSERVER ===
  const fadeElements = document.querySelectorAll('.fade-element');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    fadeElements.forEach(el => el.classList.add('is-visible'));
  }

  // === BOOKING FORM HANDLER ===
  const barberForm = document.getElementById('barber-form');
  if (barberForm) {
    barberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Спасибо! Мы перезвоним в течение 5 минут.');
      barberForm.reset();
    });
  }
});
