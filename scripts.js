// scripts.js

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-list a');
const hamburger = document.querySelector('.hamburger');
const body = document.body;

// Store theme preference
const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Toggle navigation menu
navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Calculate header height for scroll offset
const headerHeight = document.querySelector('header').offsetHeight;

// Handle navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Add extra padding for the About section
            const extraPadding = targetId === '#about' ? 20 : 0;
            
            // Calculate scroll position with offset for header
            const scrollTarget = targetSection.offsetTop - headerHeight - extraPadding;
            
            // Smooth scroll to section
            window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
            });
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Close menu only when clicking outside nav and toggle buttons
document.addEventListener('click', (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = navToggle.contains(e.target);
    const isClickOnThemeToggle = themeToggle.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnToggle && !isClickOnThemeToggle && nav.classList.contains('active')) {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Form validation and submission handling
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous message
    formMessage.textContent = '';
    formMessage.style.color = '';

    // Simple validation checks
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
        formMessage.textContent = 'Please enter a valid name (at least 2 characters).';
        formMessage.style.color = 'red';
        form.name.focus();
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'red';
        form.email.focus();
        return;
    }

    if (message.length < 10) {
        formMessage.textContent = 'Please enter a message of at least 10 characters.';
        formMessage.style.color = 'red';
        form.message.focus();
        return;
    }

    // If all validations pass
    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    formMessage.style.color = 'green';

    // Reset form fields
    form.reset();
});

// Email validation helper function
function validateEmail(email) {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
