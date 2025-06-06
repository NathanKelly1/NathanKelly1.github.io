// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mouse trail effect
const trail = document.createElement('div');
trail.className = 'mouse-trail';
document.body.appendChild(trail);

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    const dx = mouseX - trailX;
    const dy = mouseY - trailY;
    
    trailX += dx * 0.1;
    trailY += dy * 0.1;
    
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector('.button-text');
const spinner = submitButton.querySelector('.spinner-border');

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    buttonText.textContent = isLoading ? 'Sending...' : 'Send Message';
    spinner.classList.toggle('d-none', !isLoading);
}

function validateForm() {
    const form = contactForm;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        }

        if (input.hasAttribute('minlength')) {
            const minLength = parseInt(input.getAttribute('minlength'));
            if (input.value.length < minLength) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        }
    });

    return isValid;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        showFormStatus('Please fill in all required fields correctly.', 'error');
        return;
    }

    setLoading(true);
    showFormStatus('', '');

    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value
    };

    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
        showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        contactForm.querySelectorAll('.is-valid').forEach(input => {
            input.classList.remove('is-valid');
        });
    } catch (error) {
        console.error('Error sending email:', error);
        showFormStatus('Failed to send message. Please try again later.', 'error');
    } finally {
        setLoading(false);
    }
});

// Real-time validation
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
        }
    });
});

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Dynamic year in footer
document.querySelector('.copyright').textContent = 
    document.querySelector('.copyright').textContent.replace('2024', new Date().getFullYear());

// 3D Tilt effect for insanely modern project card
const fitBuddyCard = document.querySelector('.project-card.modern-3d');
if (fitBuddyCard) {
    fitBuddyCard.addEventListener('mousemove', (e) => {
        const rect = fitBuddyCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        fitBuddyCard.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        fitBuddyCard.style.boxShadow = `0 12px 48px 0 #00ffb3cc, 0 2px 16px 0 #2563eb80`;
    });
    fitBuddyCard.addEventListener('mouseleave', () => {
        fitBuddyCard.style.transform = '';
        fitBuddyCard.style.boxShadow = '';
    });
    // Touch support
    fitBuddyCard.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            const rect = fitBuddyCard.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            fitBuddyCard.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
            fitBuddyCard.style.boxShadow = `0 12px 48px 0 #00ffb3cc, 0 2px 16px 0 #2563eb80`;
        }
    });
    fitBuddyCard.addEventListener('touchend', () => {
        fitBuddyCard.style.transform = '';
        fitBuddyCard.style.boxShadow = '';
    });
}

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false
            }
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Skills section animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            const progressBar = entry.target.querySelector('.progress-bar');
            const width = progressBar.getAttribute('aria-valuenow') + '%';
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        }
    });
}, {
    threshold: 0.2
});

skillItems.forEach(item => {
    skillObserver.observe(item);
});