// ===== MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
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

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
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

// ===== COPY CODE FUNCTIONALITY =====
window.copyCode = function(button) {
    const codeBlock = button.nextElementSibling;
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#00ff41';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#00ff41';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
};

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('[data-aos]');
animatedElements.forEach(el => {
    observer.observe(el);
});

// ===== GLITCH EFFECT ON HERO TITLE =====
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    const originalText = glitchTitle.textContent;
    
    setInterval(() => {
        if (Math.random() > 0.9) {
            glitchTitle.textContent = originalText
                .split('')
                .map(char => Math.random() > 0.5 ? char : String.fromCharCode(33 + Math.random() * 94))
                .join('');
            
            setTimeout(() => {
                glitchTitle.textContent = originalText;
            }, 50);
        }
    }, 3000);
}

// ===== FEATURE CARDS HOVER EFFECT =====
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===== SCREENSHOT LIGHTBOX =====
const screenshotItems = document.querySelectorAll('.screenshot-item');
screenshotItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-caption">
                    <h3>${item.querySelector('h3').textContent}</h3>
                    <p>${item.querySelector('p').textContent}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            closeLightbox(lightbox);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox(lightbox);
            }
        });
    });
});

function closeLightbox(lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.remove();
        document.body.style.overflow = '';
    }, 300);
}

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.innerHTML = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: slideIn 0.4s ease;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border: 2px solid var(--primary-color);
        box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 2rem;
        color: var(--primary-color);
        cursor: pointer;
        transition: transform 0.3s;
    }
    
    .lightbox-close:hover {
        transform: scale(1.2) rotate(90deg);
    }
    
    .lightbox-caption {
        text-align: center;
        margin-top: 1rem;
        color: var(--text-white);
    }
    
    .lightbox-caption h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    @keyframes slideIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(lightboxStyles);

// ===== API CARDS ANIMATION =====
const apiCards = document.querySelectorAll('.api-card');
apiCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== PARTICLE EFFECT ON MOUSE MOVE =====
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
});

// Add particle styles
const particleStyles = document.createElement('style');
particleStyles.innerHTML = `
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFade 1s ease-out forwards;
        box-shadow: 0 0 10px var(--primary-color);
    }
    
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
`;
document.head.appendChild(particleStyles);

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// ===== TECH BADGE HOVER EFFECT =====
const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'translateY(-3px) scale(1.05)';
        badge.style.boxShadow = '0 5px 15px rgba(0, 255, 65, 0.3)';
    });
    
    badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'translateY(0) scale(1)';
        badge.style.boxShadow = 'none';
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shield-container');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Set initial styles for hero elements
document.querySelectorAll('.hero-text > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🛡️ VIRUSPROTECT - Sentinel System', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cInterested in cybersecurity? Check out our GitHub:', 'color: #00ff41;');
console.log('%chttps://github.com/Dharaneesh20/Virus-Protect', 'color: #00cc33;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Your scroll-heavy operations here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles
const focusStyles = document.createElement('style');
focusStyles.innerHTML = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyles);

console.log('%c✅ VirusProtect Website Loaded Successfully', 'color: #00ff41; font-weight: bold;');
