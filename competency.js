document.addEventListener('DOMContentLoaded', () => {
  // Animate competency cards on scroll
  const competencyCards = document.querySelectorAll('.competency-card');
  
  const competencyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        competencyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  competencyCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    
    competencyObserver.observe(card);
  });
  
  // Animate tool cards on scroll
  const toolCards = document.querySelectorAll('.tool-card');
  
  const toolObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        toolObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  toolCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.3s ease';
    card.style.transitionDelay = `${index * 0.05}s`;
    
    toolObserver.observe(card);
  });
  
  // Add hover effects for tool cards
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
});