// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .edu-card, .exp-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ❄️ SNOWFALL ANIMATION
function createSnowfall() {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    document.body.appendChild(snowContainer);

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = ['❄', '❅', '❆', '✦', '✧'][Math.floor(Math.random() * 5)];
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = (Math.random() * 15 + 10) + 'px';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 10000);
    }

    // Create snowflakes periodically
    setInterval(createSnowflake, 200);
    
    // Initial burst
    for (let i = 0; i < 30; i++) {
        setTimeout(createSnowflake, i * 100);
    }
}

// 🌟 PARTICLE BACKGROUND
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particleContainer.appendChild(particle);
    }
}

// 💫 TYPING EFFECT
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 🎯 MOUSE TRAIL EFFECT
function createMouseTrail() {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    });
}

// 🎵 VINYL ANIMATION - Spins continuously with Spotify
function initVinyl() {
    const vinyl = document.getElementById('vinyl');
    if (vinyl) {
        // Vinyl always spins when in view
        vinyl.style.animationPlayState = 'running';
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createSnowfall();
    createParticles();
    createMouseTrail();
    initVinyl();
    
    // Typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 50);
        }, 500);
    }
});

console.log('Portfolio site loaded - 42 Istanbul Inception Project ❄️');
