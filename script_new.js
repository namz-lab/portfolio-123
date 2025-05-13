// Initialize Particles.js for cyber background effect
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tilt effect for skill cards
    VanillaTilt.init(document.querySelectorAll('.skill-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
        scale: 1.05
    });

    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00ff00' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                animation: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                animation: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ff00',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Initialize Typed.js for dynamic text animation
    new Typed('#typed-text', {
        strings: [
            'Cybersecurity Enthusiast',
            'Software Developer',
            'Security Researcher',
            'BroCode_zw'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Matrix Rain Animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixRain = document.querySelector('.matrix-rain');
    matrixRain.appendChild(canvas);

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain characters
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            ctx.fillText(text, x, y * fontSize);
            drops[i] = y >= canvas.height/fontSize ? 0 : y + 1;
        });
    }

    setInterval(drawMatrix, 50);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });

    // Certificate Gallery Modal Functionality
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const zoomBtns = document.querySelectorAll('.zoom-btn');

    zoomBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const certCard = this.closest('.cert-card');
            const certImage = certCard.querySelector('.cert-image');
            modal.style.display = 'block';
            modalImg.src = certImage.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add particle effects to certificate cards
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});