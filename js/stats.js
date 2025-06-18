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
            const target = parseInt(number.getAttribute('data-target')) || 0; // Fallback to 0 if NaN
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
                headers: { 
                    'Authorization': 'Bearer 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', // Replace with new valid token
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            if (!response.ok) {
                if (response.status === 403 || response.status === 429) {
                    const resetTime = response.headers.get('x-ratelimit-reset');
                    const waitTime = resetTime ? (parseInt(resetTime) - Math.floor(Date.now() / 1000)) : 60;
                    console.warn(`Rate limit exceeded. Waiting ${waitTime} seconds.`);
                    await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
                    return fetchGitHubStats(); // Retry after waiting
                }
                const errorData = await response.json();
                console.error('API Error:', errorData); // Log detailed error
                throw new Error(`API request failed: ${response.status}`);
            }
            const repos = await response.json();
            console.log('API Response:', repos); // Debug log
            // Ensure repos is an array and filter for public, non-forked repos
            const publicRepos = Array.isArray(repos) ? repos.filter(repo => !repo.private && !repo.fork) : [];
            const repoCount = publicRepos.length || 0;
            console.log('Public Non-Forked Repos:', publicRepos, 'Count:', repoCount); // Debug count
            const projectStat = document.querySelector('.stat-item:nth-child(1) .stat-number');
            projectStat.setAttribute('data-target', repoCount);
            localStorage.setItem('repoCount', repoCount);
            animateStats();
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            const projectStat = document.querySelector('.stat-item:nth-child(1) .stat-number');
            projectStat.setAttribute('data-target', 0); // Fallback to 0
            animateStats();
        }
    }

    fetchGitHubStats();
});