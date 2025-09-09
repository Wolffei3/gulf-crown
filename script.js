// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initBurgerMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScroll();
    initCounterAnimation();
    initParallaxEffects();
    initClickOutside();
}

// Burger Menu Functionality
function initBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on navigation links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    function closeMenu() {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Click outside to close menu
function initClickOutside() {
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const burgerMenu = document.getElementById('burgerMenu');
        const nav = document.querySelector('.nav');
        
        if (navMenu && burgerMenu && nav) {
            if (!nav.contains(event.target) && navMenu.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger counter animation if it's an achievement section
                if (entry.target.id === 'achievements') {
                    startCounterAnimation();
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add individual delays to feature cards and achievement items
    const featureCards = document.querySelectorAll('.feature-card');
    const achievementItems = document.querySelectorAll('.achievement-item');
    const ruleItems = document.querySelectorAll('.rule-item');
    
    [...featureCards, ...achievementItems, ...ruleItems].forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// Counter Animation for Achievement Numbers
function initCounterAnimation() {
    let countersAnimated = false;
    
    window.startCounterAnimation = function() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        const counters = document.querySelectorAll('.achievement-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50; // Animation duration control
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
}

// Parallax Effects
function initParallaxEffects() {
    const heroBackground = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add hover effects for interactive elements
function initHoverEffects() {
    // Feature cards tilt effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Initialize hover effects after DOM is loaded
document.addEventListener('DOMContentLoaded', initHoverEffects);

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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Additional scroll optimizations can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .cta-button');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animationPlayState = 'running';
            }, index * 200);
        });
    }, 300);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    const navMenu = document.getElementById('navMenu');
    const burgerMenu = document.getElementById('burgerMenu');
    
    // Close menu with Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Performance optimization for mobile devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Reduce animations on mobile for better performance
    document.documentElement.classList.add('mobile-device');
}

// Add CSS class for mobile-specific styles if needed
const style = document.createElement('style');
style.textContent = `
    .mobile-device .hero-bg {
        animation-duration: 60s;
    }
    
    .mobile-device .feature-card:hover {
        transform: translateY(-10px) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

// Console log for developers
console.log('%c🎮 Gulf Crown Website Loaded Successfully!', 'color: #940000; font-size: 16px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for Gulf Crown RP Server', 'color: #666; font-size: 12px;');
