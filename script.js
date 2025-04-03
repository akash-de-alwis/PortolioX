document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const serviceItems = document.querySelectorAll('.service-item');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    // Initialize EmailJS with your User ID
    emailjs.init('C5d_NhrPTY9qF3K2e'); // Your EmailJS User ID

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

    // Function to animate stat numbers
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const current = Math.floor(start + (end - start) * easedProgress);
            element.textContent = current + (end > 100 ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end + (end > 100 ? '+' : '');
            }
        };
        requestAnimationFrame(step);
    }

    // Easing function for smooth animation
    function easeOutQuad(t) {
        return t * (2 - t);
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

        const statsRect = statsSection.getBoundingClientRect();
        if (statsRect.top <= window.innerHeight * 0.75 && !hasAnimatedStats) {
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-target'));
                animateCount(number, 0, target, 2000);
            });
            hasAnimatedStats = true;
        }

        updateActiveNavLink();
    });

    // Service item hover effect
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(35, 35, 35, 0.9)';
            this.style.transform = 'translateY(-3px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(25, 25, 25, 0.7)';
            this.style.transform = 'translateY(0)';
        });
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

    // Service cards animation
    serviceItems.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease';
        card.style.transitionDelay = `${0.1 * index}s`;
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500);
    });

    // Initial call to set active link on page load
    updateActiveNavLink();

    // Tab functionality for Education & Experience section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Projects Dropdown Toggle with Dynamic Height
    const projectsToggle = document.getElementById('projects-toggle');
    const projectsContent = document.getElementById('projects-content');
    let isAnimating = false;

    if (projectsToggle && projectsContent) {
        projectsToggle.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;

            const isActive = projectsContent.classList.contains('active');

            if (isActive) {
                // Collapse
                projectsContent.style.maxHeight = projectsContent.scrollHeight + 'px';
                projectsContent.style.padding = '20px';
                requestAnimationFrame(() => {
                    projectsContent.classList.remove('active');
                    projectsToggle.classList.remove('active');
                    projectsContent.style.maxHeight = '0';
                    projectsContent.style.padding = '0 20px';
                });
            } else {
                // Expand
                projectsContent.style.maxHeight = '0';
                projectsContent.style.padding = '0 20px';
                projectsContent.classList.add('active');
                projectsToggle.classList.add('active');
                requestAnimationFrame(() => {
                    projectsContent.style.maxHeight = projectsContent.scrollHeight + 'px';
                    projectsContent.style.padding = '20px';
                });
            }

            // Reset animation flag when transition ends
            projectsContent.addEventListener('transitionend', function handler() {
                if (!isActive) {
                    projectsContent.style.maxHeight = 'none'; // Allow dynamic resizing when open
                } else {
                    projectsContent.style.maxHeight = '0';
                    projectsContent.style.padding = '0 20px';
                }
                isAnimating = false;
                projectsContent.removeEventListener('transitionend', handler);
            }, { once: true });
        });
    }

    // Projects Filter Functionality
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            projectFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });

            // Recalculate height immediately after filtering
            if (projectsContent.classList.contains('active')) {
                projectsContent.style.maxHeight = 'none'; // Reset to natural height
                requestAnimationFrame(() => {
                    projectsContent.style.maxHeight = projectsContent.scrollHeight + 'px';
                });
            }
        });
    });

    // Contact Form Submission with EmailJS
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const sendingAnimation = document.getElementById('sending-animation');
        const successMessage = document.getElementById('success-message');
        const form = this;

        if (name && email && subject && message) {
            // Show sending animation
            sendingAnimation.style.display = 'flex';
            setTimeout(() => sendingAnimation.classList.add('active'), 10);

            // EmailJS parameters
            const params = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            };

            // Send email using EmailJS
            emailjs.send('service_fev76ec', 'template_xkgbdth', params)
                .then(() => {
                    // Hide sending animation
                    sendingAnimation.classList.remove('active');
                    setTimeout(() => sendingAnimation.style.display = 'none', 300);

                    // Show success message
                    successMessage.style.display = 'flex';
                    setTimeout(() => successMessage.classList.add('active'), 10);

                    // Reset form
                    form.reset();

                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('active');
                        setTimeout(() => successMessage.style.display = 'none', 300);
                    }, 3000);
                }, (error) => {
                    console.error('EmailJS Error:', error);
                    // Hide sending animation
                    sendingAnimation.classList.remove('active');
                    setTimeout(() => sendingAnimation.style.display = 'none', 300);

                    // Show error alert
                    alert('Oops! Something went wrong. Please try again later.');
                });
        } else {
            alert('Please fill in all fields.');
        }
    });
});