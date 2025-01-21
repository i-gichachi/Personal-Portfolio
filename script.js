// Navbar Section
document.getElementById('mobile-menu').addEventListener('click', function() {
    var nav = document.querySelector('.nav-links');
    nav.classList.toggle('active');
});

// Introduction Section Animation
document.addEventListener('DOMContentLoaded', function() {
    const introText = document.querySelector('.intro-text');
    const introImg = document.querySelector('.intro-img img');
    function checkScroll() {
        let scrollPosition = window.scrollY + window.innerHeight;
        if (scrollPosition >= introText.offsetTop + 150) {
            introText.style.opacity = '1';
            introText.style.transform = 'translateY(0)';
            introImg.style.opacity = '1';
            introImg.style.transform = 'translateY(0)';
        }
    }
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run on initial load too
});

//About Me Section
document.querySelector('.about-me button').addEventListener('click', function() {
    window.location.href = 'about.html'; // Ensure the URL is correct for your detailed page
});

// Competencies Section 
function toggleAccordion(button) {
    var content = button.nextElementSibling;
    var span = button.querySelector("span");
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        span.textContent = "+";
    } else {
        // Close all other open items
        document.querySelectorAll(".accordion-content").forEach(function(item) {
            item.style.maxHeight = null;
            item.previousElementSibling.querySelector("span").textContent = "+";
        });
        content.style.maxHeight = content.scrollHeight + "px";
        span.textContent = "-";
    }
}

// Projects Section
function moveSlide(direction) {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].offsetWidth;
    let currentTransform = parseInt(window.getComputedStyle(track).transform.split(',')[4]) || 0;

    track.style.transition = "transform 0.5s ease-in-out"; // Ensures smooth transition
    if (direction === 1) {
        // Next slide
        currentTransform -= slideWidth;
        track.style.transform = `translateX(${currentTransform}px)`;
        track.addEventListener('transitionend', () => {
            track.appendChild(slides[0]); // Moves first slide to the end
            track.style.transition = "none";
            track.style.transform = `translateX(${currentTransform + slideWidth}px)`;
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out";
            }, 10);
        }, { once: true });
    } else if (direction === -1) {
        // Previous slide
        const lastSlide = slides[slides.length - 1];
        track.prepend(lastSlide);
        track.style.transition = "none";
        track.style.transform = `translateX(${currentTransform - slideWidth}px)`;
        setTimeout(() => {
            track.style.transform = `translateX(${currentTransform}px)`;
        }, 10);
    }
}

// Back to Top Button
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("back-to-top");

    // Show/hide the button based on scroll position
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});

//Experience 
function toggleDetails(button) {
    var jobDetails = button.parentElement.nextElementSibling;
    var moreInfo = button.parentElement.parentElement.querySelector('.more-responsibilities');
    if (jobDetails.style.display === "none" || !jobDetails.style.display) {
        jobDetails.style.display = "block";
        button.textContent = "-";
        moreInfo.style.display = "block"; // Show more responsibilities
    } else {
        jobDetails.style.display = "none";
        button.textContent = "+";
        moreInfo.style.display = "none"; // Hide additional responsibilities
    }
}