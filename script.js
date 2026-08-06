// ===========================
// Navigation & Mobile Menu
// ===========================
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===========================
// Hero Image Slider
// ===========================
const heroSlides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    heroSlides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + heroSlides.length) % heroSlides.length;
    
    heroSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide() {
    showSlide(currentSlide + 1);
}

function changeSlideManual(direction) {
    clearInterval(slideInterval);
    showSlide(currentSlide + direction);
    slideInterval = setInterval(changeSlide, 4000);
}

function goToSlide(n) {
    clearInterval(slideInterval);
    showSlide(n);
    slideInterval = setInterval(changeSlide, 4000);
}

// Change slide every 4 seconds
slideInterval = setInterval(changeSlide, 4000);

// ===========================
// Navigation & Mobile Menu (continued)
// ===========================

// Toggle mobile menu
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Active Navigation Link
// ===========================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active');
        } else {
            link?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" (empty hash) or if it has onclick attribute
        if (targetId === '#' || this.hasAttribute('onclick')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Animations
// ===========================
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

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.service-card, .portfolio-item, .about-image, .about-text, .contact-info, .contact-form-wrapper'
);

animateElements.forEach(el => observer.observe(el));

// ===========================
// Back to Top Button
// ===========================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Submit to Formspree
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }

    } catch (error) {
        // Formspree failed — fallback to mailto
        const name    = formData.get('name') || '';
        const email   = formData.get('email') || '';
        const subject = formData.get('subject') || 'Enquiry from Website';
        const message = formData.get('message') || '';

        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );
        const mailtoLink = `mailto:info@samsonreclaimrubbers.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        showFormMessage(
            'Could not send automatically. Your email app will open — please send it from there.',
            'error'
        );

        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1500);

    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===========================
// Newsletter Form
// ===========================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
            // Replace this with actual newsletter API integration
        }
    });
}

// ===========================
// Dynamic Year in Footer
// ===========================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear && footerYear.textContent.includes('2025')) {
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// ===========================
// Parallax Effect on Hero
// ===========================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Counter Animation for Stats
// ===========================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===========================
// Prevent Default for Portfolio Links
// ===========================
const portfolioLinks = document.querySelectorAll('.portfolio-link');
portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // You can add a modal or redirect to project details here
        console.log('Portfolio item clicked');
    });
});

// ===========================
// Product Modal Functions
// ===========================
const modalFiles = {
    'modal-rr': 'modals/reclaim-rubber.html',
    'modal-rt': 'modals/rubber-tiles.html',
    'modal-ep': 'modals/equine-pavers.html',
    'modal-pt': 'modals/playground-tiles.html',
    'modal-gf': 'modals/gym-flooring.html',
    'modal-ss': 'modals/sport-surfacing.html'
};

// Cache for loaded modals
const modalCache = {};

async function loadModalContent(modalId) {
    // Return cached content if available
    if (modalCache[modalId]) {
        return modalCache[modalId];
    }
    
    const filePath = modalFiles[modalId];
    if (!filePath) {
        console.error('Modal file not found for:', modalId);
        return null;
    }
    
    try {
        // Add timestamp to prevent browser caching
        const cacheBuster = `?v=${Date.now()}`;
        const response = await fetch(filePath + cacheBuster);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        modalCache[modalId] = content; // Cache the content
        return content;
    } catch (error) {
        console.error('Error loading modal:', error);
        return null;
    }
}

async function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Load content if not already loaded
    if (!modal.innerHTML.trim()) {
        const content = await loadModalContent(modalId);
        if (content) {
            modal.innerHTML = content;
        } else {
            console.error('Failed to load modal content');
            return;
        }
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Subcategory navigation function
function showSubcategory(subcategoryId) {
    // Hide all subcategory contents
    const allContents = document.querySelectorAll('.subcategory-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.subcategory-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected subcategory content
    const selectedContent = document.getElementById(subcategoryId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = event.target;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Close modal when clicking outside the modal content
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.product-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===========================
// Add loading class to body when page loads
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Console Message
// ===========================
console.log('%c👋 Welcome to Samson Reclaim Rubbers!', 'font-size: 20px; color: #00A651; font-weight: bold;');
console.log('%cQuality Rubber Products - Built with ❤️', 'font-size: 14px; color: #64748b;');
