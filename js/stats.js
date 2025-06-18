// stats-animation.js
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');

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

    // Function to reset and animate stats
    function animateStats() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            number.textContent = '0'; // Reset to 0 before animating
            animateCount(number, 0, target, 2000);
        });
    }

    // Intersection Observer to detect when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.75 // Trigger when 75% of the section is visible
    });

    // Observe the stats section
    if (statsSection) {
        observer.observe(statsSection);
    }

async function fetchGitHubStats() {
    localStorage.removeItem('repoCount'); // Clear cache for testing
    try {
        const response = await fetch('https://api.github.com/users/akash-de-alwis/repos', {
            headers: { 'Authorization': 'Bearer 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' }
        });
        if (!response.ok) throw new Error('API request failed');
        const repos = await response.json();
        console.log('API Response:', repos); // Debug log
        const publicRepos = repos.filter(repo => !repo.private && !repo.fork);
        const projectStat = document.querySelector('.stat-item:nth-child(1) .stat-number');
        projectStat.setAttribute('data-target', publicRepos.length || 0);
        localStorage.setItem('repoCount', publicRepos.length);
        animateStats();
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        const projectStat = document.querySelector('.stat-item:nth-child(1) .stat-number');
        projectStat.setAttribute('data-target', 0);
        animateStats();
    }
}
    fetchGitHubStats();
});