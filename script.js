// Gulf Crown Website JavaScript

// DOM Elements
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeEventListeners();
    initializeScrollAnimations();
    initializeCounters();
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking on links
function closeMobileMenu() {
    burgerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
}

// Animation Management
function initializeAnimations() {
    // Add CSS classes for scroll animations
    const elementsToAnimate = document.querySelectorAll('.feature-card, .achievement-item, .rule-item');
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters when achievements section is in view
                if (entry.target.id === 'achievements') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observe achievements section for counter animation
    const achievementsSection = document.querySelector('#achievements');
    if (achievementsSection) {
        observer.observe(achievementsSection);
    }
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.innerText = '0';
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Event Listeners
function initializeEventListeners() {
    // Mobile menu toggle
    burgerMenu.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = link.getAttribute('href');
                closeMobileMenu();
                smoothScroll(target);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !e.target.closest('.mobile-menu') && 
            !e.target.closest('.burger-menu')) {
            closeMobileMenu();
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Discord link handler
    const discordLinks = document.querySelectorAll('a[href*="discord"]');
    discordLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(39, 39, 37, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(39, 39, 37, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Handle resize events
}, 250);

const throttledScroll = throttle(() => {
    // Handle scroll events
    handleHeaderScroll();
}, 16);

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Console message
console.log('%c🦅 Gulf Crown | قولف كراون', 'color: #940000; font-size: 20px; font-weight: bold;');
console.log('%cمرحبًا بك في سيرفر Gulf Crown للحياة الواقعية', 'color: #e0e0e0; font-size: 14px;');
