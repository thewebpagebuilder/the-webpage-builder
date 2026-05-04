// Wait for DOM
document.addEventListener("DOMContentLoaded", (event) => {
    try {
        // Register GSAP Plugins
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        } else {
            console.warn("GSAP is not loaded. Animations will be disabled.");
        }

    // Global Mouse Coordinates
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // --- Interactive Canvas Background (Particle Network) ---
    const canvas = document.getElementById('hero-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction - slight repel
                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < 150) {
                    this.x -= dx * 0.02;
                    this.y -= dy * 0.02;
                }

                if(this.x < 0 || this.x > width) this.vx *= -1;
                if(this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Primary Blue
                ctx.fill();
            }
        }

        for(let i=0; i<80; i++) {
            particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            
            for(let i=0; i<particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Connect particles
                for(let j=i; j<particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if(dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist/120})`; // Accent purple
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    // --- Cursor & Magnetic Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let followerX = mouseX, followerY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant dot attach
        gsap.set(cursorDot, { x: mouseX, y: mouseY });
    });

    // Smooth follower animations
    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        gsap.set(cursorFollower, { x: followerX, y: followerY });
    });

    // Hover effects (Normal)
    const hoverTargets = document.querySelectorAll('.hover-target:not(.work-list-item), a:not(.work-list-item)');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover-active');
            cursorDot.style.opacity = 0;
        });
        target.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover-active');
            cursorDot.style.opacity = 1;
        });
    });

    // Magnetic Buttons Logic
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button itself
            gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
            // Move the text inside slightly more
            if(el.querySelector('span')) {
                gsap.to(el.querySelector('span'), { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
            }
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            if(el.querySelector('span')) {
                gsap.to(el.querySelector('span'), { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            }
        });
    });



    // --- Preloader Animation ---
    let counter = 0;
    const counterElement = document.querySelector('.preloader-counter');
    const preloaderElement = document.querySelector('.preloader');
    
    // Simulate loading
    const interval = setInterval(() => {
        counter += Math.floor(Math.random() * 8) + 2;
        if(counter >= 100) {
            counter = 100;
            clearInterval(interval);
            
            // Remove preloader
            if (typeof gsap !== 'undefined') {
                gsap.to('.preloader', {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: () => {
                        document.body.classList.remove('loading');
                        initAnimations();
                    }
                });
            } else {
                if(preloaderElement) preloaderElement.style.display = 'none';
                document.body.classList.remove('loading');
            }
        }
        if(counterElement) counterElement.innerHTML = counter + "%";
    }, 40);

    function initAnimations() {
        // Hero Reveal
        const tl = gsap.timeline();
        tl.fromTo('.hero-bg-overlay', 
            { opacity: 1 }, 
            { opacity: 0.8, duration: 2, ease: "power2.out" }
        )
        .fromTo('.text-reveal', 
            { yPercent: 100 }, 
            { yPercent: 0, duration: 1, stagger: 0.15, ease: "power4.out" },
            "-=1.5"
        )
        .fromTo('.fade-up',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" },
            "-=0.5"
        );

        // Stats Counters trigger
        ScrollTrigger.create({
            trigger: ".stats",
            start: "top 80%",
            onEnter: () => {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power3.out"
                    });
                });
            },
            once: true
        });

        // Marquee infinite animation
        gsap.to('.line-1', {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: "linear"
        });
        gsap.to('.line-2', {
            xPercent: 50,
            repeat: -1,
            duration: 25,
            ease: "linear"
        });

        // Horizontal Scroll for Process Section
        let processSection = document.querySelector(".process");
        let processWrapper = document.querySelector(".process-wrapper");
        
        if(window.innerWidth > 1024) {
            let amountToScroll = processWrapper.offsetWidth - window.innerWidth;
            
            gsap.to(processWrapper, {
                x: -amountToScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: processSection,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: `+=${amountToScroll}`
                }
            });
        }

        // Expertise Elements Fade Up
        gsap.from('.glass-tilt', {
            scrollTrigger: {
                trigger: '.expertise-grid',
                start: "top 70%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Gallery Parallax
        gsap.to('.parallax-img', {
            scrollTrigger: {
                trigger: '.gallery',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            yPercent: 20,
            ease: "none"
        });
        
        // Hide Rotating badge when scrolling past a certain point
        gsap.to('.rotating-badge', {
            scrollTrigger: {
                trigger: '.contact',
                start: "top bottom",
                scrub: true
            },
            opacity: 0
        });
    }

    // Contact form simulation
    const form = document.querySelector('.premium-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btnSpan = form.querySelector('.submit-btn span');
            const originalText = btnSpan.textContent;
            
            btnSpan.textContent = "Processing...";
            
            setTimeout(() => {
                btnSpan.textContent = "Impact Delivered.";
                form.reset();
                setTimeout(() => {
                    btnSpan.textContent = originalText;
                }, 3000);
            }, 1000);
        });
    }
    
    } catch(err) {
        console.error("Critical script error:", err);
        const p = document.querySelector('.preloader');
        if(p) p.style.display = 'none';
        document.body.classList.remove('loading');
    }
});
