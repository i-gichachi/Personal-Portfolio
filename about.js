document.addEventListener('DOMContentLoaded', () => {
  // Expand/Collapse job details
  const expandButtons = document.querySelectorAll('.expand-btn');
  
  expandButtons.forEach(button => {
    button.addEventListener('click', function() {
      const details = this.previousElementSibling;
      details.classList.toggle('expanded');
      this.classList.toggle('expanded');
      
      if (details.classList.contains('expanded')) {
        this.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
      } else {
        this.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
      }
    });
  });

  // Video testimonial hover play
  const videoTestimonials = document.querySelectorAll('.video-testimonial');
  videoTestimonials.forEach(card => {
    const video = card.querySelector('video');
    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
    });
  });

  // Video mute/unmute control
  const videoControls = document.querySelectorAll('.video-control');
  videoControls.forEach(control => {
    control.addEventListener('click', function() {
      const video = this.parentElement.querySelector('video');
      const icon = this.querySelector('i');
      if (video.muted) {
        video.muted = false;
        icon.classList.replace('fa-volume-mute', 'fa-volume-up');
      } else {
        video.muted = true;
        icon.classList.replace('fa-volume-up', 'fa-volume-mute');
      }
    });
  });

  // Set current year
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
});
