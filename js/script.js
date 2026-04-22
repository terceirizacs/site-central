// ========================================
// TERCEIRIZA CUSTOMER SUCCESS - JAVASCRIPT
// ========================================

// Variáveis globais
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initMobileMenu();
    initSmoothScroll();
    initAnimationsOnScroll();
    initCookieConsent();
    initFAQ();
});

// ========================================
// EFEITOS DE SCROLL
// ========================================

function initScrollEffects() {
    window.addEventListener('scroll', () => {
        // Header background on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = window.scrollY;
    });
}

// ========================================
// MENU MOBILE
// ========================================

function initMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Previne scroll quando menu está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fecha menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignora links vazios ou apenas "#"
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// FAQ ACCORDION
// ========================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', () => {
            // Fecha outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle do item atual
            item.classList.toggle('active');
        });
    });
}

// ========================================
// ANIMAÇÕES AO SCROLL
// ========================================

function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                // Trigger animation
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(`
        .section-title,
        .section-subtitle,
        .team-member,
        .metodologia-card,
        .funil-card,
        .case-card,
        .timeline-item,
        .comparison-card,
        .contact-info,
        .next-steps
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            observer.observe(el);
        }, index * 50);
    });
}

// ========================================
// CONTADOR ANIMADO (para estatísticas)
// ========================================

function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Inicializa contadores quando visíveis
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const originalText = target.textContent;
            const value = parseInt(originalText);
            // Detecta se há um sufixo (como %)
            const suffix = originalText.replace(/[0-9]/g, '').trim();
            if (!isNaN(value)) {
                target.textContent = '0' + suffix;
                animateCounter(target, value, 2000, suffix);
            }
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========================================
// COOKIE CONSENT (LGPD)
// ========================================

function initCookieConsent() {
    // Verifica se já aceitou cookies
    if (localStorage.getItem('cookiesAccepted')) {
        return;
    }

    // Cria banner de cookies
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text">
                <p><strong>Este site utiliza cookies</strong></p>
                <p>Usamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo. 
                Ao continuar navegando, você concorda com nossa <a href="politica-de-cookies.html">Política de Cookies</a>.</p>
            </div>
            <div class="cookie-actions">
                <button class="btn-accept-cookies">Aceitar</button>
                <button class="btn-reject-cookies">Apenas Essenciais</button>
            </div>
        </div>
    `;

    // Estilos do banner
    const style = document.createElement('style');
    style.textContent = `
        .cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(26, 29, 46, 0.98);
            backdrop-filter: blur(10px);
            padding: 1.5rem;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            border-top: 2px solid var(--accent-turquoise);
            animation: slideUp 0.5s ease;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(100%);
            }
            to {
                transform: translateY(0);
            }
        }
        
        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
        }
        
        .cookie-text {
            flex: 1;
        }
        
        .cookie-text p {
            margin: 0.3rem 0;
            color: var(--text-gray);
            font-size: 0.9rem;
        }
        
        .cookie-text strong {
            color: var(--text-light);
            font-size: 1rem;
        }
        
        .cookie-text a {
            color: var(--accent-turquoise);
            text-decoration: underline;
        }
        
        .cookie-actions {
            display: flex;
            gap: 1rem;
            flex-shrink: 0;
        }
        
        .btn-accept-cookies,
        .btn-reject-cookies {
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            font-size: 0.9rem;
        }
        
        .btn-accept-cookies {
            background: var(--accent-turquoise);
            color: var(--primary-dark);
        }
        
        .btn-accept-cookies:hover {
            background: var(--accent-turquoise-dark);
            transform: translateY(-2px);
        }
        
        .btn-reject-cookies {
            background: transparent;
            color: var(--text-gray);
            border: 1px solid var(--text-gray);
        }
        
        .btn-reject-cookies:hover {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-light);
        }
        
        @media (max-width: 768px) {
            .cookie-content {
                flex-direction: column;
                text-align: center;
            }
            
            .cookie-actions {
                flex-direction: column;
                width: 100%;
            }
            
            .btn-accept-cookies,
            .btn-reject-cookies {
                width: 100%;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Event listeners
    banner.querySelector('.btn-accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'all');
        banner.remove();
        loadAnalytics();
    });

    banner.querySelector('.btn-reject-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'essential');
        banner.remove();
    });
}

// ========================================
// ANALYTICS (carrega apenas se aceitar cookies)
// ========================================

function loadAnalytics() {
    // Google Analytics (substitua por seu ID)
    /*
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    */

    // Facebook Pixel (substitua por seu ID)
    /*
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
    */
}

// Carrega analytics se já aceitou cookies
if (localStorage.getItem('cookiesAccepted') === 'all') {
    loadAnalytics();
}

// ========================================
// FUNÇÃO PARA GERENCIAR PREFERÊNCIAS DE COOKIES
// ========================================

function openCookieSettings() {
    // Remove aceitação anterior
    localStorage.removeItem('cookiesAccepted');

    // Reinicia o banner
    const existingBanner = document.querySelector('.cookie-banner');
    if (existingBanner) {
        existingBanner.remove();
    }

    initCookieConsent();
}

// Torna função global para uso em botões
window.openCookieSettings = openCookieSettings;

// ========================================
// PARALLAX EFFECT (opcional)
// ========================================

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// Descomente para ativar parallax
// initParallax();

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ========================================
// FORM VALIDATION (se houver formulários)
// ========================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validação básica
            let isValid = true;

            for (let [key, value] of Object.entries(data)) {
                if (!value.trim()) {
                    isValid = false;
                    const input = form.querySelector(`[name="${key}"]`);
                    input.classList.add('error');
                }
            }

            if (isValid) {
                // Enviar formulário
                console.log('Formulário válido:', data);
                // Aqui você pode adicionar a lógica de envio via AJAX
            }
        });

        // Remove erro ao digitar
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    });
}

initFormValidation();

// ========================================
// BACK TO TOP BUTTON (opcional)
// ========================================

function initBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Voltar ao topo');

    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--accent-turquoise);
            color: var(--primary-dark);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(79, 216, 196, 0.3);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: var(--accent-turquoise-dark);
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(79, 216, 196, 0.5);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
}

// Descomente para ativar botão "voltar ao topo"
initBackToTop();

// ========================================
// TRACK EVENTS (para analytics)
// ========================================

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Rastrear cliques em CTAs
document.querySelectorAll('.btn-primary, .btn-contato').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'click', btn.textContent.trim());
    });
});

// Rastrear cliques em links de contato
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', () => {
        trackEvent('Contact', 'click', item.textContent.trim());
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce para eventos de scroll e resize
function debounce(func, wait = 10) {
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

// Aplica debounce aos event listeners de scroll
window.addEventListener('scroll', debounce(() => {
    // Código otimizado de scroll aqui
}, 10));

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🚀 Terceiriza Customer Success',
    'color: #4fd8c4; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ para transformar o Customer Success de infoprodutores',
    'color: #b8c1cc; font-size: 12px;');
console.log('%c📧 contato@terceirizacs.com.br | 📱 (31) 99282-3833',
    'color: #4fd8c4; font-size: 12px;');
