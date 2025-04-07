document.addEventListener('DOMContentLoaded', function() {
    // ==================== Mobile Menu Toggle ====================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==================== Hero Section Animation ====================
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        function animateHero() {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }
        setTimeout(animateHero, 300);
    }

    // ==================== Accordion Functionality ====================
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !expanded);
            
            if (!expanded) {
                document.querySelectorAll('.accordion-button').forEach(otherButton => {
                    if (otherButton !== button && otherButton.getAttribute('aria-expanded') === 'true') {
                        otherButton.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    });

    // ==================== Experience Section Toggles ====================
    document.querySelectorAll('.expand-button').forEach(button => {
        button.addEventListener('click', function() {
            const jobDetails = this.closest('.job-header').nextElementSibling;
            const moreInfo = jobDetails.querySelector('.more-responsibilities');
            const isExpanded = moreInfo.classList.contains('show');
            
            // Toggle visibility
            moreInfo.classList.toggle('show');
            
            // Update button text
            this.textContent = isExpanded ? '+' : '-';
            
            // Smooth scroll to show the expanded content
            if (!isExpanded) {
                setTimeout(() => {
                    jobDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });

    // ==================== Enhanced Carousel ====================
    class Carousel {
        constructor(projects = []) {
            this.carousel = document.querySelector('.carousel-inner');
            this.prevBtn = document.querySelector('.prev');
            this.nextBtn = document.querySelector('.next');
            this.projects = projects;
            this.currentIndex = 0;
            this.autoRotateInterval = null;
            this.autoRotateDelay = 5000;
            this.isAnimating = false;
            this.visibleItems = window.innerWidth >= 992 ? 2 : 1;
            
            if (this.carousel && this.projects.length > 0) this.init();
        }
        
        init() {
            this.createItems();
            
            // Navigation controls
            if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Auto-rotation
            this.startAutoRotate();
            this.carousel.addEventListener('mouseenter', () => this.stopAutoRotate());
            this.carousel.addEventListener('mouseleave', () => this.startAutoRotate());
            
            // Touch support
            this.setupTouchEvents();
            
            // Responsive adjustments
            window.addEventListener('resize', () => this.handleResize());
        }
        
        createItems() {
            this.carousel.innerHTML = '';
            
            // Add all project items
            this.projects.forEach(project => {
                const item = document.createElement('div');
                item.className = 'carousel-item';
                item.innerHTML = `
                    <div class="carousel-card" onclick="window.location.href='${project.link}'">
                        <img src="${project.image}" alt="${project.title}" loading="lazy" class="carousel-image">
                        <h3 class="carousel-title">${project.title}</h3>
                    </div>
                `;
                this.carousel.appendChild(item);
            });
            
            // Clone first/last items for infinite loop if we have enough projects
            if (this.projects.length > this.visibleItems) {
                const firstItems = Array.from(this.carousel.children).slice(0, this.visibleItems);
                const lastItems = Array.from(this.carousel.children).slice(-this.visibleItems);
                
                firstItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    this.carousel.appendChild(clone);
                });
                
                lastItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    this.carousel.insertBefore(clone, this.carousel.firstChild);
                });
                
                // Set initial position
                this.carousel.style.transform = `translateX(-${100 * this.visibleItems}%)`;
            }
        }
        
        goToSlide(index, animate = true) {
            if (this.isAnimating || this.projects.length <= this.visibleItems) return;
            
            this.isAnimating = true;
            this.currentIndex = index;
            
            this.carousel.style.transition = animate ? 'transform 0.5s ease' : 'none';
            this.carousel.style.transform = `translateX(-${100 * (this.currentIndex + this.visibleItems)}%)`;
            
            setTimeout(() => {
                this.isAnimating = false;
                this.checkBoundaries();
            }, animate ? 500 : 0);
        }
        
        checkBoundaries() {
            if (this.projects.length <= this.visibleItems) return;
            
            // If we've scrolled past the end, reset to beginning
            if (this.currentIndex >= this.projects.length) {
                this.currentIndex = 0;
                this.carousel.style.transition = 'none';
                this.carousel.style.transform = `translateX(-${100 * this.visibleItems}%)`;
                setTimeout(() => this.carousel.style.transition = 'transform 0.5s ease', 10);
            } 
            // If we've scrolled before the beginning, reset to end
            else if (this.currentIndex < 0) {
                this.currentIndex = this.projects.length - 1;
                this.carousel.style.transition = 'none';
                this.carousel.style.transform = `translateX(-${100 * (this.projects.length + this.visibleItems - 1)}%)`;
                setTimeout(() => this.carousel.style.transition = 'transform 0.5s ease', 10);
            }
        }
        
        nextSlide() {
            if (this.isAnimating || this.projects.length <= this.visibleItems) return;
            this.currentIndex = (this.currentIndex + 1) % this.projects.length;
            this.goToSlide(this.currentIndex);
        }
        
        prevSlide() {
            if (this.isAnimating || this.projects.length <= this.visibleItems) return;
            this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
            this.goToSlide(this.currentIndex);
        }
        
        setupTouchEvents() {
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                this.stopAutoRotate();
            }, { passive: true });
            
            this.carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                const threshold = 50;
                
                if (touchStartX - touchEndX > threshold) {
                    this.nextSlide();
                } else if (touchEndX - touchStartX > threshold) {
                    this.prevSlide();
                }
                
                this.startAutoRotate();
            }, { passive: true });
        }
        
        startAutoRotate() {
            this.stopAutoRotate();
            if (this.projects.length > this.visibleItems) {
                this.autoRotateInterval = setInterval(() => this.nextSlide(), this.autoRotateDelay);
            }
        }
        
        stopAutoRotate() {
            if (this.autoRotateInterval) {
                clearInterval(this.autoRotateInterval);
                this.autoRotateInterval = null;
            }
        }
        
        handleResize() {
            // Adjust number of visible items based on screen size
            const newVisibleItems = window.innerWidth >= 992 ? 2 : 1;
            
            if (newVisibleItems !== this.visibleItems) {
                this.visibleItems = newVisibleItems;
                this.createItems();
                this.goToSlide(this.currentIndex, false);
            }
        }
    }

    // ==================== Initialize Carousel ====================
    const projects = [
        {
            title: "GHC Foundation Website",
            image: "img/GHC Foundation.png",
            link: "project.html"
        },
        {
            title: "Careers Without Borders",
            image: "img/Careers Without Borders.png",
            link: "project.html"
        }
        // Add new projects here:
        // { title: "Project 3", image: "img/project3.png", link: "project.html" }
    ];

    if (document.querySelector('.carousel-inner')) {
        new Carousel(projects);
    }

    // ==================== Back to Top Button ====================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== Update Copyright Year ====================
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
});