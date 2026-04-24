// ==========================================
// Setup & DOM Elements
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Current Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==========================================
    // Navbar Scroll Effect & Active Links
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // Custom Cursor Glow
    // ==========================================
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // ==========================================
    // Project Modals
    // ==========================================
    const projectData = {
        1: {
            title: "Student Database Management System",
            tags: ["Python", "SQL", "DBMS"],
            desc: "A comprehensive database management system designed to handle student records efficiently. Focused on maintaining data integrity and robust relational architecture.",
            features: [
                "Full CRUD (Create, Read, Update, Delete) operations",
                "Normalized relational schema to prevent data redundancy",
                "Interactive CLI/GUI for easy data entry",
                "Advanced querying and reporting features"
            ],
            repo: "#"
        },
        2: {
            title: "Personal Portfolio Website",
            tags: ["HTML5", "CSS3", "JavaScript"],
            desc: "A modern, responsive personal portfolio built from scratch without heavy frameworks to showcase skills and projects.",
            features: [
                "Custom glassmorphism UI design",
                "Interactive particle canvas background",
                "Smooth scroll and intersection observer animations",
                "Fully responsive mobile-first layout"
            ],
            repo: "#"
        }
    };

    const modalOverlay = document.getElementById('modal-overlay');
    const projectCards = document.querySelectorAll('.project-card');
    const closeModal = document.querySelector('.close-modal');
    
    // Modal Elements
    const mTitle = document.getElementById('modal-title');
    const mTags = document.getElementById('modal-tags');
    const mDesc = document.getElementById('modal-desc');
    const mFeatures = document.getElementById('modal-features');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project');
            const data = projectData[id];
            
            if(data) {
                mTitle.textContent = data.title;
                mDesc.textContent = data.desc;
                
                // Tags
                mTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.textContent = tag;
                    mTags.appendChild(span);
                });

                // Features
                mFeatures.innerHTML = '<h3>Key Features:</h3><ul>' + 
                    data.features.map(f => `<li>${f}</li>`).join('') + '</ul>';

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    const closeProjectModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeModal.addEventListener('click', closeProjectModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) {
            closeProjectModal();
        }
    });

    // ==========================================
    // Form Submission Mock
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Mock API Call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.classList.remove('btn-primary');
                btn.style.background = '#10b981'; // Success green
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-primary');
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // ==========================================
    // Particle Network Background
    // ==========================================
    initParticles();
});

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Configuration
    const config = {
        particleCount: Math.floor(window.innerWidth / 20),
        particleColor: 'rgba(139, 92, 246, 0.4)', // Purple tint
        lineColor: 'rgba(59, 130, 246, 0.15)',    // Blue tint
        particleRadius: 1.5,
        maxVelocity: 0.5,
        connectionDistance: 120
    };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Adjust particle count on resize
        config.particleCount = Math.floor(width / 20);
        init();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.maxVelocity * 2;
            this.vy = (Math.random() - 0.5) * config.maxVelocity * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, config.particleRadius, 0, Math.PI * 2);
            ctx.fillStyle = config.particleColor;
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    // Opacity based on distance
                    const opacity = 1 - (distance / config.connectionDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = config.lineColor.replace('0.15)', `${opacity * 0.4})`);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}
