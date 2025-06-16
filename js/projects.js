document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsHeader = document.querySelector('.projects-header');
    const projectsContent = document.querySelector('.projects-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const projectFilters = document.querySelectorAll('.project-filter');
    let isManuallyToggled = false;
    let isAnimating = false; // Track animation state
    let cachedHeight = null; // Cache content height

    // Debounce function to limit rapid filter clicks
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Projects Filter Functionality
    const filterProjects = debounce(function(filterValue) {
        if (isAnimating) return; // Skip if animating
        isAnimating = true;

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                card.style.transition = 'none'; // Disable transition briefly
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)'; // Reduce translate distance
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                card.classList.add('hidden');
            }
        });

        // Update content height only if dropdown is active
        if (projectsContent.classList.contains('active')) {
            requestAnimationFrame(() => {
                projectsContent.style.maxHeight = 'none';
                cachedHeight = projectsContent.scrollHeight;
                projectsContent.style.maxHeight = cachedHeight + 'px';
            });
        }

        // Allow next animation after completion
        setTimeout(() => {
            isAnimating = false;
        }, 300); // Match animation duration
    }, 100);

    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            projectFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            filterProjects(this.getAttribute('data-filter'));
        });
    });

    // Function to reset and animate project cards
    function animateProjectsSection() {
        if (isAnimating) return;
        isAnimating = true;

        projectCards.forEach((card, index) => {
            if (!card.classList.contains('hidden')) {
                card.style.transition = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }
        });

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    // Function to toggle dropdown
    function toggleDropdown() {
        projectsHeader.classList.toggle('active');
        projectsContent.classList.toggle('active');

        if (projectsContent.classList.contains('active')) {
            cachedHeight = cachedHeight || projectsContent.scrollHeight;
            projectsContent.style.maxHeight = cachedHeight + 'px';
        } else {
            projectsContent.style.maxHeight = '0';
        }
    }

    // Function to open dropdown
    function openDropdown() {
        if (!projectsContent.classList.contains('active')) {
            toggleDropdown();
        }
    }

    // Manual toggle event listener
    if (projectsHeader) {
        projectsHeader.addEventListener('click', () => {
            isManuallyToggled = true;
            toggleDropdown();
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectsSection();
                if (!isManuallyToggled) {
                    openDropdown();
                }
            }
        });
    }, { threshold: 0.3 });

    if (projectsSection) {
        observer.observe(projectsSection);
    }
});