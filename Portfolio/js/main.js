// Smooth scrolling with enhanced animations
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get the target section
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 100; // Offset for fixed header
        
        // Add animation class to target section
        target.classList.add('section-entering');
        
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
        
        // Remove animation class after transition
        setTimeout(() => {
            target.classList.remove('section-entering');
        }, 1000);
    });
});

// Form submission with animation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        
        // Reset form
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.work-card, .about-content, .contact-form');

const reveal = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', reveal);

// Hamburger Menu with improved functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach((link, index) => {
    link.parentElement.style.setProperty('--i', index);
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Add scroll-based animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            // Animate children elements
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('element-visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
    
    // Add animation class to key elements
    const animateElements = section.querySelectorAll('h1, h2, p, .work-card, .skill-category, .form-group');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
}); 