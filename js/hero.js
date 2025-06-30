// hero.js
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const animatedElements = [
        { selector: '.hero-title', class: 'animate' },
        { selector: '.hero-tagline', class: 'animate' },
        { selector: '.hero-btn', class: 'animate' },
        { selector: '.hero-bio', class: 'animate' },
        { selector: '.bento-title', class: 'animate', multiple: true },
        { selector: '.bento-tech-top .tech-icons i', class: 'animate', multiple: true },
        { selector: '.bento-tech-bottom .tech-icons i', class: 'animate', multiple: true },
        { selector: '.social-link', class: 'animate', multiple: true },
        { selector: '.bento-portrait-img', class: 'animate-fade-in' },
        { selector: '.bento-intro-side-cards .bento-card', class: 'animate', multiple: true },
        { selector: '.bento-card', class: 'animate', multiple: true } // <-- Add this line
    ];

    // Function to remove animation classes and reset opacity
    const removeAnimations = () => {
        animatedElements.forEach(item => {
            if (item.multiple) {
                document.querySelectorAll(item.selector).forEach(el => {
                    el.classList.remove(item.class);
                    el.style.opacity = '0';
                });
            } else {
                const el = document.querySelector(item.selector);
                if (el) {
                    el.classList.remove(item.class);
                    el.style.opacity = '0';
                }
            }
        });
    };

    // Function to add animation classes
    const addAnimations = () => {
        animatedElements.forEach(item => {
            if (item.multiple) {
                document.querySelectorAll(item.selector).forEach(el => {
                    el.classList.add(item.class);
                });
            } else {
                const el = document.querySelector(item.selector);
                if (el) {
                    el.classList.add(item.class);
                }
            }
        });
    };

    // Intersection Observer to detect when Hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addAnimations();
            } else {
                removeAnimations();
            }
        });
    }, {
        threshold: 0.3
    });

    // Start observing the hero section
    observer.observe(heroSection);

    // Trigger animations on initial load if section is in view
    if (heroSection.getBoundingClientRect().top < window.innerHeight) {
        addAnimations();
    }
});