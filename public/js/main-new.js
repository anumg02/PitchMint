/**
 * PitchMint - Modern JavaScript
 * Handles navigation, animations, and button functionality
 */

// Page Navigation Function
function goToPage(pageName) {
    // Prevent default behavior if called from a button
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Navigating to:', pageName);
    
    // Add loading animation
    document.body.style.opacity = '0.8';
    
    // Navigate after short delay for smooth transition
    setTimeout(() => {
        window.location.href = pageName;
    }, 200);
    
    return false; // Prevent form submission or default behavior
}

// Registration Functions
function registerAsStartup() {
    event.preventDefault();
    event.stopPropagation();
    goToPage('register-startup-new.html');
    return false;
}

function registerAsInvestor() {
    event.preventDefault();
    event.stopPropagation();
    goToPage('register-investor.html');
    return false;
}

// Stats Counter Animation
function animateStats() {
    const statElements = document.querySelectorAll('[data-count]');
    
    statElements.forEach(element => {
        const target = parseInt(element.dataset.count);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Smooth Scroll Function
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar) {
        navbar.classList.toggle('show');
    }
}

// Page Loading Animation
function initPageTransition() {
    document.body.classList.add('page-transition');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Button Click Effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Form Validation (for registration pages)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Show Success Message
function showSuccessMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// API Helper Functions
const API = {
    baseURL: '/api',
    
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};

// Registration Form Handlers
function handleStartupRegistration(event) {
    event.preventDefault();
    
    if (!validateForm('startupForm')) {
        showSuccessMessage('Please fill in all required fields.');
        return;
    }
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    API.post('/startups', data)
        .then(response => {
            showSuccessMessage('Startup registered successfully! We will contact you soon.');
            event.target.reset();
        })
        .catch(error => {
            showSuccessMessage('Registration failed. Please try again.');
        });
}

function handleInvestorRegistration(event) {
    event.preventDefault();
    
    if (!validateForm('investorForm')) {
        showSuccessMessage('Please fill in all required fields.');
        return;
    }
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    API.post('/investors', data)
        .then(response => {
            showSuccessMessage('Investor registration successful! Welcome to PitchMint.');
            event.target.reset();
        })
        .catch(error => {
            showSuccessMessage('Registration failed. Please try again.');
        });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Trigger stats animation if it's a stats section
                if (entry.target.querySelector('[data-count]')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and sections
    document.querySelectorAll('.feature-card, .hero-stats, .cta-section').forEach(el => {
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('PitchMint: Initializing application...');
    
    // Initialize core features
    initPageTransition();
    initNavbarScroll();
    addButtonEffects();
    initScrollAnimations();
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .is-invalid {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
    `;
    document.head.appendChild(style);
    
    // Animate stats on load if visible
    setTimeout(() => {
        const statsSection = document.querySelector('.hero-stats');
        if (statsSection && isElementInViewport(statsSection)) {
            animateStats();
        }
    }, 1000);
    
    console.log('PitchMint: Application initialized successfully!');
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export functions for global access
window.goToPage = goToPage;
window.registerAsStartup = registerAsStartup;
window.registerAsInvestor = registerAsInvestor;
window.toggleMobileMenu = toggleMobileMenu;
window.handleStartupRegistration = handleStartupRegistration;
window.handleInvestorRegistration = handleInvestorRegistration;
