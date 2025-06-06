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

// Form validation and animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add success animation
        const button = contactForm.querySelector('button[type="submit"]');
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.classList.add('success');
        
        // Reset form after animation
        setTimeout(() => {
            contactForm.reset();
            button.innerHTML = 'Send Message';
            button.classList.remove('success');
        }, 3000);
    });
}

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