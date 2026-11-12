// ========================================
// THE AFRICAN CHURCH - DIOCESE OF IFO
// Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });

        // Mobile dropdown toggle
        const dropdowns = document.querySelectorAll('.dropdown > a');
        dropdowns.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    link.parentElement.classList.toggle('open');
                }
            });
        });
    }

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Auto-play
        function startSlider() {
            slideInterval = setInterval(nextSlide, 6000);
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { stopSlider(); nextSlide(); startSlider(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { stopSlider(); prevSlide(); startSlider(); });

        startSlider();
    }

    // --- Back to Top Button ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Sticky Header Shadow ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
            }
        });
    }

    // --- Animated Counter ---
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;
            const increment = target / 80;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    }

    if (counters.length > 0) {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !countersAnimated) {
                        countersAnimated = true;
                        animateCounters();
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(statsSection);
        }
    }

    // --- Scroll Animations (fade in on scroll) ---
    const animateElements = document.querySelectorAll(
        '.service-card, .pillar-card, .event-card, .sermon-card, .mission-card, .gallery-item'
    );

    if (animateElements.length > 0) {
        // Set initial styles
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => fadeObserver.observe(el));
    }

    // --- Current Year in Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Newsletter Form ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert('Thank you for subscribing! You will receive updates at: ' + email);
                newsletterForm.reset();
            }
        });
    }
});
