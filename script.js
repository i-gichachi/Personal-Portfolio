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
            const details = this.closest('.job-header').nextElementSibling;
            const moreInfo = details.querySelector('.more-responsibilities');
            
            moreInfo.classList.toggle('show');
            this.textContent = moreInfo.classList.contains('show') ? '-' : '+';
        });
    });

    // ==================== Enhanced Infinite Carousel ====================
    class Carousel {
        constructor(projects = []) {
            this.carousel = document.querySelector('.carousel-inner');
            this.dotsContainer = document.querySelector('.carousel-dots');
            this.prevBtn = document.querySelector('.prev');
            this.nextBtn = document.querySelector('.next');
            this.projects = projects;
            this.currentIndex = 0;
            this.autoRotateInterval = null;
            this.autoRotateDelay = 5000;
            this.isAnimating = false;
            
            if (this.carousel && this.projects.length > 0) this.init();
        }
        
        init() {
            this.createItems();
            this.createDots();
            this.updateDots();
            
            // Navigation controls
            if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Auto-rotation
            this.startAutoRotate();
            this.carousel.addEventListener('mouseenter', () => this.stopAutoRotate());
            this.carousel.addEventListener('mouseleave', () => this.startAutoRotate());
            
            // Touch support
            this.setupTouchEvents();
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
            
            // Clone first/last items for infinite loop
            if (this.projects.length > 1) {
                const firstItem = this.carousel.firstElementChild.cloneNode(true);
                const lastItem = this.carousel.lastElementChild.cloneNode(true);
                this.carousel.insertBefore(lastItem, this.carousel.firstElementChild);
                this.carousel.appendChild(firstItem);
                this.carousel.style.transform = `translateX(-100%)`;
            }
        }
        
        createDots() {
            if (!this.dotsContainer || this.projects.length <= 1) return;
            
            this.dotsContainer.innerHTML = '';
            this.projects.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', `View project ${i + 1}`);
                this.dotsContainer.appendChild(dot);
            });
        }
        
        updateDots() {
            if (!this.dotsContainer || this.projects.length <= 1) return;
            
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }
        
        goToSlide(index, animate = true) {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            this.currentIndex = index;
            this.carousel.style.transition = animate ? 'transform 0.5s ease' : 'none';
            this.carousel.style.transform = `translateX(-${100 * (this.currentIndex + 1)}%)`;
            this.updateDots();
            
            setTimeout(() => {
                this.isAnimating = false;
                this.checkBoundaries();
            }, animate ? 500 : 0);
        }
        
        checkBoundaries() {
            if (!this.projects.length) return;
            
            if (this.currentIndex >= this.projects.length) {
                this.currentIndex = 0;
                this.carousel.style.transition = 'none';
                this.carousel.style.transform = `translateX(-100%)`;
                setTimeout(() => this.carousel.style.transition = 'transform 0.5s ease', 10);
            } 
            else if (this.currentIndex < 0) {
                this.currentIndex = this.projects.length - 1;
                this.carousel.style.transition = 'none';
                this.carousel.style.transform = `translateX(-${100 * this.projects.length}%)`;
                setTimeout(() => this.carousel.style.transition = 'transform 0.5s ease', 10);
            }
        }
        
        nextSlide() {
            if (this.isAnimating || !this.projects.length) return;
            this.currentIndex = (this.currentIndex + 1) % this.projects.length;
            this.goToSlide(this.currentIndex);
        }
        
        prevSlide() {
            if (this.isAnimating || !this.projects.length) return;
            this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
            this.goToSlide(this.currentIndex);
        }
        
        setupTouchEvents() {
            let touchStartX = 0;
            
            this.carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                this.stopAutoRotate();
            }, { passive: true });
            
            this.carousel.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                if (touchStartX - touchEndX > 50) this.nextSlide();
                else if (touchEndX - touchStartX > 50) this.prevSlide();
                this.startAutoRotate();
            }, { passive: true });
        }
        
        startAutoRotate() {
            this.stopAutoRotate();
            if (this.projects.length > 1) {
                this.autoRotateInterval = setInterval(() => this.nextSlide(), this.autoRotateDelay);
            }
        }
        
        stopAutoRotate() {
            if (this.autoRotateInterval) {
                clearInterval(this.autoRotateInterval);
                this.autoRotateInterval = null;
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