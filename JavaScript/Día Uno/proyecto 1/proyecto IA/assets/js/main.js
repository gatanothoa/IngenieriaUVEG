/* ==========================================================================
   ARCOEXPRESS MAIN JAVASCRIPT - OPTIMIZADO PARA MÓVIL
   ========================================================================== */

// Configuración global optimizada para móvil
const CONFIG = {
    breakpoints: {
        mobile: 767,
        tablet: 991,
        desktop: 1199
    },
    animations: {
        duration: 250, // Más rápido en móvil
        easing: 'ease-out'
    },
    scroll: {
        offset: 80, // Menos offset en móvil
        smooth: true
    },
    touch: {
        swipeThreshold: 50,
        tapTimeout: 300
    }
};

// Estado global de la aplicación
const APP_STATE = {
    isLoading: true,
    isMobile: window.innerWidth <= CONFIG.breakpoints.mobile,
    isTouch: 'ontouchstart' in window,
    currentSection: 'inicio',
    navOpen: false,
    scrollPosition: 0,
    lastTouchTime: 0
};

/* ==========================================================================
   UTILIDADES OPTIMIZADAS PARA MÓVIL
   ========================================================================== */

// Utilidades DOM
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Debounce function optimizado
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function para scroll en móvil
const throttle = (func, limit) => {
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
};

// Detectar tipo de dispositivo
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Detectar orientación móvil
const getOrientation = () => {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

// Throttle function
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Detectar si un elemento está en viewport
const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Smooth scroll
const smoothScrollTo = (target, duration = 1000) => {
    const targetElement = typeof target === 'string' ? $(target) : target;
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Offset for navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    
    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    requestAnimationFrame(animation);
};

/* ==========================================================================
   LOADING SCREEN
   ========================================================================== */

class LoadingScreen {
    constructor() {
        this.element = $('#loading-screen');
        this.startTime = Date.now();
        this.init();
    }
    
    hide() {
        if (this.element) {
            this.element.style.opacity = '0';
            this.element.style.visibility = 'hidden';
            setTimeout(() => {
                this.element.style.display = 'none';
                APP_STATE.isLoading = false;
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    init() {
        document.body.style.overflow = 'hidden';
        
        // Ocultar inmediatamente si el documento ya está cargado
        if (document.readyState === 'complete') {
            setTimeout(() => this.hide(), 100);
            return;
        }
        
        // Ocultar cuando se complete la carga
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), 200);
        });
        
        // Fallback obligatorio - siempre ocultar después de 1 segundo
        setTimeout(() => {
            if (APP_STATE.isLoading) {
                this.hide();
            }
        }, 1000);
    }
}

/* ==========================================================================
   NAVEGACIÓN
   ========================================================================== */

class Navigation {
    constructor() {
        this.navbar = $('#navbar');
        this.navToggle = $('#nav-toggle');
        this.navMenu = $('#nav-menu');
        this.navLinks = $$('.nav-link');
        this.isScrolled = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setActiveLink();
    }
    
    bindEvents() {
        // Toggle móvil
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Navegación suave
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Scroll navbar
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 10));
        
        // Resize
        window.addEventListener('resize', debounce(() => this.handleResize(), 250));
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }
    
    toggleMobileMenu() {
        APP_STATE.navOpen = !APP_STATE.navOpen;
        
        if (this.navToggle) {
            this.navToggle.classList.toggle('active');
        }
        
        if (this.navMenu) {
            this.navMenu.classList.toggle('active');
        }
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = APP_STATE.navOpen ? 'hidden' : 'auto';
    }
    
    closeMobileMenu() {
        if (APP_STATE.navOpen) {
            APP_STATE.navOpen = false;
            
            if (this.navToggle) {
                this.navToggle.classList.remove('active');
            }
            
            if (this.navMenu) {
                this.navMenu.classList.remove('active');
            }
            
            document.body.style.overflow = 'auto';
        }
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        
        if (target && target.startsWith('#')) {
            const targetElement = $(target);
            if (targetElement) {
                smoothScrollTo(targetElement);
                this.setActiveLink(target);
                this.closeMobileMenu();
            }
        }
    }
    
    handleScroll() {
        const scrollY = window.pageYOffset;
        APP_STATE.scrollPosition = scrollY;
        
        // Navbar scroll effect
        const shouldBeScrolled = scrollY > 50;
        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;
            if (this.navbar) {
                this.navbar.classList.toggle('scrolled', this.isScrolled);
            }
        }
        
        // Update active link based on scroll position
        this.updateActiveLinkOnScroll();
    }
    
    handleResize() {
        const wasMobile = APP_STATE.isMobile;
        APP_STATE.isMobile = window.innerWidth < CONFIG.breakpoints.mobile;
        
        // Si cambió de móvil a desktop, cerrar menú
        if (wasMobile && !APP_STATE.isMobile) {
            this.closeMobileMenu();
        }
    }
    
    handleOutsideClick(e) {
        if (APP_STATE.navOpen && 
            !this.navMenu.contains(e.target) && 
            !this.navToggle.contains(e.target)) {
            this.closeMobileMenu();
        }
    }
    
    setActiveLink(activeHref = null) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeHref && link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveLinkOnScroll() {
        const sections = $$('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (APP_STATE.scrollPosition >= sectionTop && 
                APP_STATE.scrollPosition < sectionTop + sectionHeight) {
                currentSection = '#' + section.id;
            }
        });
        
        if (currentSection && currentSection !== APP_STATE.currentSection) {
            APP_STATE.currentSection = currentSection;
            this.setActiveLink(currentSection);
        }
    }
}

/* ==========================================================================
   SCROLL ANIMATIONS
   ========================================================================== */

class ScrollAnimations {
    constructor() {
        this.elements = $$('[data-aos]');
        this.offset = 100;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.checkElements();
    }
    
    bindEvents() {
        window.addEventListener('scroll', throttle(() => this.checkElements(), 16));
        window.addEventListener('resize', debounce(() => this.checkElements(), 250));
    }
    
    checkElements() {
        this.elements.forEach(element => {
            if (isInViewport(element, this.offset)) {
                this.animateElement(element);
            }
        });
    }
    
    animateElement(element) {
        if (element.classList.contains('aos-animated')) return;
        
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
            element.classList.add('aos-animated');
            element.style.animationName = animationType;
            element.style.animationDuration = '0.8s';
            element.style.animationFillMode = 'both';
            element.style.animationTimingFunction = 'ease-out';
        }, parseInt(delay));
    }
}

/* ==========================================================================
   COUNTER ANIMATIONS
   ========================================================================== */

class CounterAnimations {
    constructor() {
        this.counters = $$('[data-count]');
        this.animated = new Set();
        this.init();
    }
    
    init() {
        // Verificar inmediatamente sin esperar scroll
        setTimeout(() => {
            this.checkCounters();
        }, 1000);
        
        this.bindEvents();
    }
    
    bindEvents() {
        window.addEventListener('scroll', throttle(() => this.checkCounters(), 100));
        // También verificar en resize por si acaso
        window.addEventListener('resize', throttle(() => this.checkCounters(), 200));
    }
    
    checkCounters() {
        this.counters.forEach(counter => {
            if (!this.animated.has(counter)) {
                const rect = counter.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                // Verificar si está visible (más tolerante)
                if (rect.top <= windowHeight && rect.bottom >= 0) {
                    this.animateCounter(counter);
                    this.animated.add(counter);
                }
            }
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const startTime = Date.now();
        
        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Usar función easing suave
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */

class BackToTop {
    constructor() {
        this.button = $('#back-to-top');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        this.bindEvents();
        this.checkVisibility();
    }
    
    bindEvents() {
        this.button.addEventListener('click', () => {
            smoothScrollTo(document.body, 800);
        });
        
        window.addEventListener('scroll', throttle(() => this.checkVisibility(), 100));
    }
    
    checkVisibility() {
        const shouldShow = window.pageYOffset > 300;
        this.button.classList.toggle('visible', shouldShow);
    }
}

/* ==========================================================================
   FORMULARIO DE CONTACTO
   ========================================================================== */

class ContactForm {
    constructor() {
        this.form = $('#contact-form');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupValidation();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validación en tiempo real
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    setupValidation() {
        // Configurar reglas de validación personalizadas
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';
        
        // Validar campo requerido
        if (required && !value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        }
        
        // Validar email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
        }
        
        // Validar teléfono
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Ingresa un teléfono válido';
            }
        }
        
        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }
    
    showFieldError(field, isValid, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('has-error', 'has-success');
        
        if (!isValid) {
            formGroup.classList.add('has-error');
            if (errorElement) {
                errorElement.textContent = message;
            }
        } else if (field.value.trim()) {
            formGroup.classList.add('has-success');
        }
    }
    
    clearError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('has-error');
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showAlert('Por favor corrige los errores en el formulario', 'error');
            return;
        }
        
        this.submitForm();
    }
    
    async submitForm() {
        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        // Mostrar estado de carga
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Simular envío (aquí iría la lógica real de envío)
            await this.simulateSubmit(formData);
            
            this.showAlert('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            this.form.reset();
            this.clearAllErrors();
            
        } catch (error) {
            this.showAlert('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
            console.error('Error:', error);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    simulateSubmit(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular éxito/error aleatorio
                Math.random() > 0.1 ? resolve() : reject(new Error('Simulated error'));
            }, 2000);
        });
    }
    
    clearAllErrors() {
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('has-error', 'has-success');
        });
    }
    
    showAlert(message, type) {
        // Crear y mostrar alerta
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            </div>
            <div class="alert-content">
                <p>${message}</p>
            </div>
        `;
        
        // Insertar antes del formulario
        this.form.parentNode.insertBefore(alert, this.form);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            alert.remove();
        }, 5000);
        
        // Scroll a la alerta
        smoothScrollTo(alert, 500);
    }
}

/* ==========================================================================
   LAZY LOADING DE IMÁGENES
   ========================================================================== */

class LazyImages {
    constructor() {
        this.images = $$('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.loadAllImages();
        }
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        this.images.forEach(img => observer.observe(img));
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        }
    }
    
    loadAllImages() {
        this.images.forEach(img => this.loadImage(img));
    }
}

/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */

class App {
    constructor() {
        this.modules = [];
        this.init();
    }
    
    init() {
        // Inicializar módulos cuando DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initModules());
        } else {
            this.initModules();
        }
        
        // Configurar event listeners globales
        this.setupGlobalEvents();
    }
    
    initModules() {
        try {
            // Inicializar todos los módulos
            this.modules.push(new LoadingScreen());
            this.modules.push(new Navigation());
            this.modules.push(new ScrollAnimations());
            this.modules.push(new CounterAnimations());
            this.modules.push(new BackToTop());
            this.modules.push(new ContactForm());
            this.modules.push(new LazyImages());
            
            console.log('ArcoExpress App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }
    
    setupGlobalEvents() {
        // Manejar errores globales
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
        });
        
        // Prevenir comportamiento por defecto en links vacíos
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
        
        // Manejar teclas de acceso rápido
        document.addEventListener('keydown', (e) => {
            // ESC para cerrar menú móvil
            if (e.key === 'Escape' && APP_STATE.navOpen) {
                const nav = this.modules.find(module => module instanceof Navigation);
                if (nav) nav.closeMobileMenu();
            }
        });
    }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Forzar ocultar la pantalla de carga después de un tiempo corto
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }, 500);
    
    // Inicializar la aplicación principal
    try {
        new App();
    } catch (error) {
        console.log('App inicializada con modo simple');
        // Si hay un error, asegurar que la pantalla de carga se oculte
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // FORZAR CONTADORES DESPUÉS DE 3 SEGUNDOS SI NO SE HAN ANIMADO
    setTimeout(() => {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            if (counter.textContent === '0') {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const startTime = Date.now();
                
                const updateCounter = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(target * easeOutQuart);
                    
                    counter.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }, 3000);
});

// Fallback adicional - ocultar pantalla de carga independientemente
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && window.getComputedStyle(loadingScreen).display !== 'none') {
        loadingScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}, 2000);
