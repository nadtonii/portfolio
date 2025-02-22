// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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

// Intersection Observer for fade in animations
const observerOptions = {
    root: null,
    rootMargin: '-50px',  // Only trigger when element is 50px in view
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    // Work section (homepage)
    document.querySelectorAll('.work-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.classList.add(`fade-in-delay-${index}`);
        observer.observe(card);
    });

    // About section (homepage)
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.classList.add('fade-in');
        observer.observe(aboutContent);
    }

    // Skills (homepage)
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add('fade-in');
        category.classList.add(`fade-in-delay-${index}`);
        observer.observe(category);
    });

    // Contact section (homepage)
    const contactElements = document.querySelectorAll('.contact-form, .contact-info');
    contactElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Case study content blocks
    document.querySelectorAll('.case-study-content .content-block').forEach((block, index) => {
        block.classList.add('fade-in');
        if (index > 0) {
            block.classList.add(`fade-in-delay-${index % 3}`);
        }
        observer.observe(block);
    });

    // Case study process steps
    document.querySelectorAll('.process-steps .step').forEach((step, index) => {
        step.classList.add('fade-in');
        step.classList.add(`fade-in-delay-${index}`);
        observer.observe(step);
    });

    // Case study gallery
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        gallerySection.classList.add('fade-in');
        observer.observe(gallerySection);
    }
}

// Run after DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

