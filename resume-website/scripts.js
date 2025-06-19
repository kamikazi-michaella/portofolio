// scripts.js

// Toggle navigation menu on small screens
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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
