/* ============================================
   ETERNAL FLOWERS — Interactive Scripts
   ============================================ */

// Force scroll to top on reload and prevent browser from jumping
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Clear hash from URL to prevent jumping to sections on refresh
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
}

// Theme initialized in index.html head to prevent flash


document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize Hero Image based on theme
    const heroImg = document.getElementById('hero-img');
    if (heroImg && localStorage.getItem('fatherMode') === 'true') {
        heroImg.src = 'images/Spiderman Dorado.jpeg';
    }

    // ---- Theme Toggle Logic ----
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial icon
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            themeToggle.innerHTML = '<i data-lucide="sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            // If father mode is on, don't toggle dark mode
            if (localStorage.getItem('fatherMode') === 'true') return;

            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = '';
            
            if (currentTheme === 'dark') {
                newTheme = '';
                themeToggle.innerHTML = '<i data-lucide="moon"></i>';
            } else {
                newTheme = 'dark';
                themeToggle.innerHTML = '<i data-lucide="sun"></i>';
            }

            if (newTheme) {
                document.documentElement.setAttribute('data-theme', newTheme);
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            
            localStorage.setItem('theme', newTheme);
            lucide.createIcons(); // re-render the new icon
        });
    }
    lucide.createIcons();

    // ---- Father's Day / Mother's Day Toggle (Integrated in Nav) ----
    const fatherLink = document.querySelector('.nav-link-father');
    const motherLink = document.querySelector('.nav-link-special');

    if (fatherLink) {
        fatherLink.addEventListener('click', (e) => {
            // Permitir navegación real
            localStorage.setItem('fatherMode', 'true');
        });
    }

    if (motherLink) {
        motherLink.addEventListener('click', (e) => {
            // Permitir navegación real
            localStorage.setItem('fatherMode', 'false');
        });
    }

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hidePreloader = () => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 1200);
        };
        
        // Ensure the preloader stays at least 3.2s for the cinematic splash to complete
        const minTime = new Promise(resolve => setTimeout(resolve, 3200));
        
        // Wait for page load
        const pageLoad = new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });

        Promise.all([minTime, pageLoad]).then(hidePreloader);
    }

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Mobile Navigation ----
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    let overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('hero-particles');
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        const isFather = document.documentElement.getAttribute('data-theme') === 'father';
        const colors = isFather ? [
            'rgba(212, 175, 55, 0.4)', // Gold
            'rgba(255, 255, 255, 0.2)', // White
            'rgba(212, 175, 55, 0.2)', // Soft Gold
            'rgba(0, 0, 0, 0.3)'        // Blackish
        ] : [
            'rgba(240, 84, 140, 0.3)',
            'rgba(212, 168, 67, 0.25)',
            'rgba(252, 207, 224, 0.4)',
            'rgba(255, 255, 255, 0.2)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            bottom: -10px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 300);
    }
    // Continuous particle creation
    setInterval(createParticle, 800);

    // ---- Counter Animation ----
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();

            const updateCounter = (timestamp) => {
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(easeProgress * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    // Observe hero section for counter animation
    const heroObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.disconnect();
                }
            });
        },
        { threshold: 0.3 }
    );

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll(
        '.product-card, .addon-card, .faq-item, .promo-card, .section-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- FAQ Accordion ----
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked if it was closed
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---- Active nav link highlight ----
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinksArray = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.style.opacity = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.opacity = '1';
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ---- Staggered reveal for grid items ----
    const staggerContainers = document.querySelectorAll('.catalog-grid, .addons-grid');

    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 80}ms`;
        });
    });

    // ---- Staggered reveal for mday cards ----
    const mdayCards = document.querySelectorAll('.mday-card, .mday-info-card');
    mdayCards.forEach(el => el.classList.add('reveal'));
    mdayCards.forEach(revealObserver.observe.bind(revealObserver));

    const mdayGrid = document.querySelector('.mday-grid');
    if (mdayGrid) {
        Array.from(mdayGrid.children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 60}ms`;
        });
    }

    // ---- Mother's Day Countdown (to May 5, 2026) ----
    const countdownTarget = new Date('2026-05-05T23:59:59-05:00');

    const updateCountdown = () => {
        const now = new Date();
        const diff = countdownTarget - now;

        if (diff <= 0) {
            document.getElementById('mday-countdown').innerHTML =
                '<span style="color:#e8c55e;font-size:1rem;padding:8px">¡Oferta finalizada! Precios normales activos.</span>';
            return;
        }

        const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs  = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = n => String(n).padStart(2, '0');
        document.getElementById('cd-days').textContent  = pad(days);
        document.getElementById('cd-hours').textContent = pad(hours);
        document.getElementById('cd-min').textContent   = pad(mins);
        document.getElementById('cd-sec').textContent   = pad(secs);
    };

    if (document.getElementById('cd-days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ---- Music Control ----
    const musicToggle = document.getElementById('music-toggle');
    const bgAudio = document.getElementById('bg-audio');

    if (musicToggle && bgAudio) {
        musicToggle.addEventListener('click', () => {
            if (bgAudio.paused) {
                bgAudio.play();
            } else {
                bgAudio.pause();
            }
        });

        bgAudio.addEventListener('play', () => {
            musicToggle.innerHTML = '<i data-lucide="volume-2"></i>';
            lucide.createIcons();
        });
        
        bgAudio.addEventListener('pause', () => {
            musicToggle.innerHTML = '<i data-lucide="volume-x"></i>';
            lucide.createIcons();
        });
    }

    // ---- Order Modal Logic ----
    const orderModal = document.getElementById('order-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const modalTotalPrice = document.getElementById('modal-total-price');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    const addonInputs = document.querySelectorAll('.addon-input');
    const customMessage = document.getElementById('custom-message');

    let currentBasePrice = 0;
    let currentProductName = '';

    // Find all WhatsApp order buttons
    const orderButtons = document.querySelectorAll('a[href^="https://wa.me/"][id^="pedir-"], a[href^="https://wa.me/"][id^="mday-"]');
    
    if(orderModal) {
        orderButtons.forEach(btn => {
            // Skip contact buttons
            if(btn.id === 'mday-contactar' || btn.id === 'cta-personalizar') return;

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Extract product info
                const card = btn.closest('.product-card, .mday-card, .promo-card');
                if(!card) return;

                let name = card.querySelector('h3').innerText;
                let priceText = '';
                
                const priceEl = card.querySelector('.amount') || card.querySelector('.mday-price-sale') || card.querySelector('.price-amount');
                if(priceEl) {
                    priceText = priceEl.innerText.replace('S/', '').trim();
                } else {
                    const url = new URL(btn.href);
                    const text = url.searchParams.get('text') || '';
                    const match = text.match(/\(S\/\s*([0-9.]+)\)/);
                    if(match) priceText = match[1];
                }

                currentProductName = name;
                currentBasePrice = parseFloat(priceText) || 0;

                // Reset modal
                addonInputs.forEach(input => input.value = 0);
                customMessage.value = '';
                
                modalProductName.innerText = currentProductName;
                updateModalTotal();

                // Show modal
                orderModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Quantity controls
        const qtyBtns = document.querySelectorAll('.qty-btn');
        qtyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const input = document.getElementById(targetId);
                let currentVal = parseInt(input.value) || 0;
                
                if (btn.classList.contains('plus')) {
                    currentVal++;
                } else if (btn.classList.contains('minus') && currentVal > 0) {
                    currentVal--;
                }
                
                input.value = currentVal;
                updateModalTotal();
            });
        });

        function updateModalTotal() {
            let total = currentBasePrice;
            addonInputs.forEach(input => {
                const qty = parseInt(input.value) || 0;
                if(qty > 0) {
                    total += parseFloat(input.dataset.price) * qty;
                }
            });
            modalTotalPrice.innerText = `S/ ${total.toFixed(2)}`;
        }

        addonInputs.forEach(input => {
            input.addEventListener('change', updateModalTotal);
        });

        // Custom Design Button
        const customDesignBtn = document.getElementById('cta-diseno-unico');
        if (customDesignBtn) {
            customDesignBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentProductName = 'Diseño Único Personalizado';
                currentBasePrice = 0;
                
                addonInputs.forEach(input => input.value = 0);
                customMessage.value = '';
                
                modalProductName.innerText = currentProductName;
                updateModalTotal();

                orderModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        function closeModal() {
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeModalBtn.addEventListener('click', closeModal);
        orderModal.addEventListener('click', (e) => {
            if(e.target === orderModal) closeModal();
        });

        confirmOrderBtn.addEventListener('click', () => {
            let addons = [];
            addonInputs.forEach(input => {
                const qty = parseInt(input.value) || 0;
                if(qty > 0) {
                    addons.push(`${qty}x ${input.dataset.name}`);
                }
            });

            let message = `Hola, me interesa el *${currentProductName}*.\n`;
            if(addons.length > 0) {
                message += `\n*Extras agregados:*\n- ${addons.join('\n- ')}`;
            }
            
            if(customMessage.value.trim() !== '') {
                message += `\n\n*Mensaje para la tarjeta:*\n"${customMessage.value.trim()}"`;
            }

            message += `\n\n*Total estimado:* ${modalTotalPrice.innerText}`;

            const encodedMessage = encodeURIComponent(message);
            
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#ff80b3', '#fcd5a3', '#ffffff'],
                    zIndex: 100000
                });
            }
            
            setTimeout(() => {
                window.open(`https://wa.me/51946759953?text=${encodedMessage}`, '_blank');
                closeModal();
            }, 500);
        });
    }

    // ---- Catalog Filters Logic ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.catalog-grid .product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category') || '';
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ---- Lightbox Logic ----
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const catalogImages = document.querySelectorAll('.product-card .product-image img, .mday-card .mday-card-img img');

    if (lightboxOverlay && lightboxImg) {
        catalogImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { lightboxImg.src = ''; }, 400);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
    }

    console.log('✿ Eternal Flowers website loaded successfully');
});
