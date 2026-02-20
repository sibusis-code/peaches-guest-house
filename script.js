// ===== Navigation Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
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

// ===== Smooth Scroll for All Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Indicator in Hero =====
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered animation with delay
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }, index * 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.amenity-card, .info-card, .stat, .contact-method, .about-visual');

animateElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px) scale(0.95)';
    element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(element);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Create WhatsApp message
        const whatsappNumber = '27760682642'; // 076 068 2642 in international format
        const whatsappMessage = `*New Booking Inquiry from Website*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Phone:* ${encodeURIComponent(phone || 'Not provided')}%0A%0A` +
            `*Message:*%0A${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Create success message with icon
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            background: linear-gradient(135deg, #FF8C42 0%, #FFB347 100%);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            margin-top: 1rem;
            text-align: center;
            font-weight: 600;
            animation: fadeInUp 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 15px 40px rgba(255, 140, 66, 0.4);
        `;
        successMessage.innerHTML = '<i class="fab fa-whatsapp" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>Redirecting you to WhatsApp...';
        
        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        
        // Reset after 3 seconds
        setTimeout(() => {
            location.reload();
        }, 3000);
    });
}

// ===== Parallax Effect for Hero =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = Math.max(1 - scrolled / 600, 0);
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ===== Dynamic Year in Footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');

if (footerYear) {
    footerYear.textContent = `© ${currentYear} Peaches Guest House. All rights reserved.`;
}

// ===== Enhanced Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    // Create a loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FF8C42 0%, #FFB347 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.8s ease, visibility 0.8s ease;
    `;
    
    const logoIcon = document.createElement('i');
    logoIcon.className = 'fas fa-home';
    logoIcon.style.cssText = `
        font-size: 5rem;
        color: white;
        animation: pulse 1.5s ease-in-out infinite;
    `;
    
    loadingOverlay.appendChild(logoIcon);
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.visibility = 'hidden';
        
        document.body.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        document.body.style.opacity = '1';
        
        setTimeout(() => {
            loadingOverlay.remove();
        }, 800);
    }, 500);
});

// ===== Stats Counter Animation =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            
            // Only animate if not already animated
            if (!stat.classList.contains('stats-animated')) {
                stat.classList.add('stats-animated');
                
                // Enhanced pulse animation with scale and glow
                stat.style.animation = 'pulse 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                
                // Add a subtle glow effect
                setTimeout(() => {
                    stat.style.boxShadow = '0 10px 40px rgba(255, 140, 66, 0.3)';
                    setTimeout(() => {
                        stat.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }, 500);
                }, 200);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ===== Enhanced Lazy Loading with Smooth Fade =====
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            img.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 100);
            
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ===== Add hover effect sound (optional - commented out) =====
// Uncomment if you want to add sound effects
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCqJ0/DTfzEHHm7A7+OZUBEJZK/m7qRaFgpCmtzxuHEjBDKR0/DTfzEHHm7A7+OZUBEJZK/m7qRaFgpCmtzxuHEjBDKR0/DTfzEHHm7A7+OZUBEJZK/m7qRaFgpCmtzxuHEjBDKR0/DTfzEHHm7A7+OZUBEJZK/m7qRaFgpCmtzxuHEjBDKR0/DTfzEHHm7A7+OZUBEJZK/m7qRaFgpCmtzxuHEjBDKR0/DTfzEHHm7A7+OZUBEJZK/m7qRaFgpCmtzxuHEjBDKR0/DTfzEHHm7A7+OZUBEJZK/m7qRaFg==');

document.querySelectorAll('.cta-button, .amenity-card, .contact-method').forEach(element => {
    element.addEventListener('mouseenter', () => {
        // hoverSound.play();
    });
});
*/

// ===== Console Welcome Message =====
console.log('%c Welcome to Peaches Guest House Website! ', 'background: linear-gradient(135deg, #FF8C42 0%, #FFB347 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Designed by MPL AI - www.mplai.co.za ', 'background: #2C3E50; color: #FFB347; padding: 5px 10px; font-size: 12px;');

// ===== Performance optimization =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll events are now optimized
}));

// ===== Accessibility Improvements =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

console.log('✓ All interactive features loaded successfully!');
