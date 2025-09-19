document.addEventListener('DOMContentLoaded', () => {
  /* ===== Mobile Menu ===== */
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ===== Header scroll effect ===== */
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== Subtle hero fade-in ===== */
  const heroText = document.querySelector('.hero-text');
  const heroImage = document.querySelector('.hero-image');
  if (heroText && heroImage) {
    [heroText, heroImage].forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    });
    requestAnimationFrame(() => {
      setTimeout(() => {
        [heroText, heroImage].forEach(el => {
          el.style.transition = 'opacity .6s ease, transform .6s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      }, 180);
    });
  }

  /* ===== Back to Top ===== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    const onScroll = () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    onScroll();
  }

  /* ===== Year ===== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  /* ===== Animate elements on scroll ===== */
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.competency-card, .project-card, .service-preview-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  };
  
  // Run animation function after a short delay
  setTimeout(animateOnScroll, 500);
});