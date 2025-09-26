document.addEventListener('DOMContentLoaded', () => {
  // Animate case studies on scroll
  const caseStudies = document.querySelectorAll('.case-study');
  
  const caseStudyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        caseStudyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  caseStudies.forEach((study, index) => {
    study.style.opacity = '0';
    study.style.transform = 'translateY(30px)';
    study.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    study.style.transitionDelay = `${index * 0.2}s`;
    
    caseStudyObserver.observe(study);
  });
  
  // Add hover effects for proficiency items
  const proficiencyItems = document.querySelectorAll('.proficiency-item');
  
  proficiencyItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add click effect for tech tags
  const techTags = document.querySelectorAll('.tech-tag, .competency-tag');
  
  techTags.forEach(tag => {
    tag.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
});