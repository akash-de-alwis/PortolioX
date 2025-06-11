document.addEventListener('DOMContentLoaded', function () {
    const educationSection = document.querySelector('.education-experience-section');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to reset and animate timeline items for a specific tab content
    function animateTimelineItems(tabContent) {
        const timelineItems = tabContent.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            // Determine direction based on odd/even index
            const isOdd = index % 2 === 0;
            const direction = isOdd ? '-50px' : '50px'; // Consistent with viewport animation

            // Reset styles
            item.style.opacity = '0';
            item.style.transform = `translateX(${direction}) scale(0.95)`;
            item.style.transition = 'none';

            // Trigger animation with delay
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1)';
            }, index * 150); // 150ms stagger for smooth effect
        });
    }

    // Intersection Observer for viewport entry
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Animate the currently active tab content
                    const activeTabContent = document.querySelector('.tab-content.active');
                    if (activeTabContent) {
                        animateTimelineItems(activeTabContent);
                    }
                } else {
                    // Reset all timeline items when section leaves viewport
                    tabContents.forEach((tabContent) => {
                        const timelineItems = tabContent.querySelectorAll('.timeline-item');
                        timelineItems.forEach((item, index) => {
                            const isOdd = index % 2 === 0;
                            const direction = isOdd ? '-50px' : '50px';
                            item.style.transition = 'none';
                            item.style.opacity = '0';
                            item.style.transform = `translateX(${direction}) scale(0.95)`;
                        });
                    });
                }
            });
        },
        {
            threshold: 0.3, // Trigger when 30% of section is visible
            rootMargin: '0px',
        }
    );

    // Observe the education & experience section
    if (educationSection) {
        observer.observe(educationSection);
    }

    // Tab switch event listener
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Wait for the tab content to become active (slight delay for transition)
            setTimeout(() => {
                const activeTabContent = document.querySelector('.tab-content.active');
                if (activeTabContent) {
                    animateTimelineItems(activeTabContent);
                }
            }, 100); // 100ms delay to ensure tab content is visible
        });
    });
    
});