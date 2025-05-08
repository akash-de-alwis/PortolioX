document.addEventListener('DOMContentLoaded', () => {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-item, .project-card, .blog-card, .submit-btn, .mobile-menu-toggle, .mobile-nav-close, .project-filter, .tab-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Hide custom cursor on mobile devices (touch events)
    if (window.matchMedia("(max-width: 768px)").matches) {
        cursor.style.display = 'none';
    }

    // Fade in cursor on page load
    setTimeout(() => {
        cursor.classList.add('cursor-visible');
    }, 100);
});