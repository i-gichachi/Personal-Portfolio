document.addEventListener('DOMContentLoaded', () => {
  // Service cards animation on scroll
  const animateServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  };

  // Initialize all animations and effects
  const initServicesPage = () => {
    animateServiceCards();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  };

  // Run initialization after a short delay
  setTimeout(initServicesPage, 100);
});

// Service card interaction enhancements
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Add click effect
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.service-cta-btn')) {
        const ctaBtn = card.querySelector('.service-cta-btn');
        if (ctaBtn) {
          ctaBtn.style.transform = 'scale(0.95)';
          setTimeout(() => {
            ctaBtn.style.transform = '';
          }, 150);
        }
      }
    });
    
    // Add keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const ctaBtn = card.querySelector('.service-cta-btn');
        if (ctaBtn) {
          ctaBtn.click();
        }
      }
    });
  });
});