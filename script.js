// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Project cards expansion
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle active class for the clicked card
            card.classList.toggle('active');
            
            // Close other cards
            projectCards.forEach(otherCard => {
                if (otherCard != card) {
                    otherCard.classList.remove('active');
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.side-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section');
    
    const highlightNavigation = () => {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.side-nav a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's link
                correspondingNavLink.classList.add('active');
            }
        });
    };

    // Add scroll event listener for navigation highlighting
    window.addEventListener('scroll', highlightNavigation);

    // Add some animation to elements as they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all major elements for fade-in animation
    const elementsToAnimate = document.querySelectorAll('.experience-item, .project-card, .skill-category, .education-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Add CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .experience-item, .project-card, .skill-category, .education-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .side-nav a.active {
        color: var(--accent-blue) !important;
        font-weight: 500;
    }
`;
document.head.appendChild(style);