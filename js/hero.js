// hero.js
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const animatedElements = [
        { selector: '.hero-title', class: 'animate' },
        { selector: '.hero-tagline', class: 'animate' },
        { selector: '.hero-btn', class: 'animate' },
        { selector: '.hero-bio', class: 'animate' },
        { selector: '.bento-title', class: 'animate', multiple: true },
        { selector: '.tech-icons i', class: 'animate', multiple: true },
        { selector: '.social-link', class: 'animate', multiple: true },
        { selector: '.bento-portrait-img', class: 'animate-fade-in' } // Added for portrait image
    ];

    // Function to remove animation classes and reset opacity
    const removeAnimations = () => {
        animatedElements.forEach(item => {
            if (item.multiple) {
                document.querySelectorAll(item.selector).forEach(el => {
                    el.classList.remove(item.class);
                    el.style.opacity = '0'; // Reset opacity
                });
            } else {
                const el = document.querySelector(item.selector);
                if (el) {
                    el.classList.remove(item.class);
                    el.style.opacity = '0'; // Reset opacity
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
                addAnimations(); // Trigger animations when section is visible
            } else {
                removeAnimations(); // Reset animations when section is out of view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Start observing the hero section
    observer.observe(heroSection);

    // Optional: Trigger animations on initial load if section is in view
    if (heroSection.getBoundingClientRect().top < window.innerHeight) {
        addAnimations();
    }
});