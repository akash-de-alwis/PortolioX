document.addEventListener('DOMContentLoaded', function () {
    const educationSection = document.querySelector('.education-experience-section');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to reset and animate timeline items for a specific tab content
    function animateTimelineItems(tabContent) {
        const timelineItems = tabContent.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const isOdd = index % 2 === 0;
            const direction = isOdd ? '-50px' : '50px';
            item.style.opacity = '0';
            item.style.transform = `translateX(${direction}) scale(0.95)`;
            item.style.transition = 'none';
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1)';
            }, index * 150);
        });
    }

    // Intersection Observer for viewport entry
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const activeTabContent = document.querySelector('.tab-content.active');
                    if (activeTabContent) {
                        animateTimelineItems(activeTabContent);
                    }
                } else {
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
        { threshold: 0.3, rootMargin: '0px' }
    );

    // Observe the education & experience section
    if (educationSection) {
        observer.observe(educationSection);
    }

    // Tab switch event listener
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabContents.forEach((content) => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Add active class to corresponding tab content
            const targetContentId = button.getAttribute('data-tab');
            const targetContent = document.querySelector(`#${targetContentId}`);
            if (targetContent) {
                targetContent.classList.add('active');
                // Animate the newly active tab content
                setTimeout(() => {
                    animateTimelineItems(targetContent);
                }, 100);
            }
        });
    });
});