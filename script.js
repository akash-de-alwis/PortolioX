document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after a minimum display time
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Ensure body overflow is restored after preloader hides
        document.body.style.overflow = '';
    }, 2000); // 2 seconds minimum display time

    const fadeElements = document.querySelectorAll('.fade-in');
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const serviceItems = document.querySelectorAll('.service-item');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');


    // Initial animation for elements in viewport
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            element.style.opacity = '1';
        }
    });

    // Function to update active navigation link based on viewport visibility
    function updateActiveNavLink() {
        const viewportHeight = window.innerHeight;
        const sections = document.querySelectorAll('[id]');

        let activeSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            const visibleHeight = Math.min(sectionBottom, viewportHeight) - Math.max(sectionTop, 0);
            const visibilityRatio = visibleHeight / rect.height;

            const sectionId = section.getAttribute('id');
            const isNavSection = Array.from(navLinks).some(link => link.getAttribute('href') === `#${sectionId}`);

            if (isNavSection && visibilityRatio >= 0.2 && sectionTop < viewportHeight && sectionBottom > 0) {
                if (!activeSection || visibilityRatio > (activeSection.visibilityRatio || 0)) {
                    activeSection = {
                        id: sectionId,
                        visibilityRatio: visibilityRatio
                    };
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (activeSection) {
            const activeLink = document.querySelector(`.nav-links a[href="#${activeSection.id}"]`);
            const activeMobileLink = document.querySelector(`.mobile-nav-links a[href="#${activeSection.id}"]`);
            if (activeLink) activeLink.classList.add('active');
            if (activeMobileLink) activeMobileLink.classList.add('active');
        }
    }

    // Scroll event handler
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                element.style.opacity = '1';
            }
        });

        updateActiveNavLink();
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileNavClose.addEventListener('click', function() {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });

    mobileNavOverlay.addEventListener('click', function(e) {
        if (e.target === mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial call to set active link on page load
    updateActiveNavLink();

});