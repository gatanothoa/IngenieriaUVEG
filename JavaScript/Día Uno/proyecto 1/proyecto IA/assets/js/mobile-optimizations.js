/* ==========================================================================
   OPTIMIZACIONES ESPECÍFICAS PARA MÓVIL - ARCOEXPRESS
   ========================================================================== */

// Configuración móvil
const MOBILE_CONFIG = {
    touchEvents: {
        swipeThreshold: 50,
        tapTimeout: 300,
        longPressTimeout: 500
    },
    viewport: {
        minZoom: 0.5,
        maxZoom: 5.0
    },
    performance: {
        scrollThrottle: 16, // 60fps
        resizeThrottle: 100
    }
};

/* ==========================================================================
   FUNCIONES DE OPTIMIZACIÓN MÓVIL
   ========================================================================== */

// Optimizar rendimiento en móvil
const optimizeMobilePerformance = () => {
    // Reducir calidad de imágenes en conexiones lentas
    if (navigator.connection && navigator.connection.effectiveType === 'slow-2g') {
        document.body.classList.add('low-bandwidth');
    }
    
    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload crítico para móvil
    const criticalResources = [
        'assets/css/responsive.css',
        'assets/images/logo-arcoexpress.svg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'image';
        document.head.appendChild(link);
    });
};

// Gestos táctiles mejorados
const setupTouchGestures = () => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    // Swipe para cerrar menú móvil
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        navMenu.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = MOBILE_CONFIG.touchEvents.swipeThreshold;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Swipe left para cerrar menú
        if (Math.abs(diffX) > Math.abs(diffY) && diffX > swipeThreshold) {
            closeMenu();
        }
    }
};

// Optimizar scroll en móvil
const optimizeMobileScroll = () => {
    let isScrolling = false;
    
    const handleScroll = throttle(() => {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                updateScrollPosition();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, MOBILE_CONFIG.performance.scrollThrottle);
    
    // Usar passive listeners para mejor performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Scroll suave mejorado para móvil
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil después de click
                if (window.innerWidth <= 767) {
                    closeMenu();
                }
            }
        });
    });
};

// Mejorar formularios en móvil
const optimizeMobileForms = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Mejorar inputs en móvil
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Evitar zoom en iOS
        if (input.type === 'email' || input.type === 'tel') {
            input.addEventListener('focus', () => {
                if (window.innerWidth <= 767) {
                    document.querySelector('meta[name=viewport]').setAttribute(
                        'content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                    );
                }
            });
            
            input.addEventListener('blur', () => {
                if (window.innerWidth <= 767) {
                    document.querySelector('meta[name=viewport]').setAttribute(
                        'content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
                    );
                }
            });
        }
        
        // Validación visual en tiempo real
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('error');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('error');
            }
        });
    });
    
    // Mejorar envío del formulario en móvil
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar loading en móvil
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simulación de envío (reemplazar con tu lógica)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
};

// Optimizar botones flotantes en móvil
const optimizeFloatingButtons = () => {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (whatsappBtn) {
        // Mejorar posición en móvil según orientación
        const adjustPosition = () => {
            if (window.innerWidth <= 767) {
                const orientation = getOrientation();
                if (orientation === 'landscape') {
                    whatsappBtn.style.bottom = '10px';
                    whatsappBtn.style.right = '10px';
                } else {
                    whatsappBtn.style.bottom = '20px';
                    whatsappBtn.style.right = '20px';
                }
            }
        };
        
        adjustPosition();
        window.addEventListener('orientationchange', () => {
            setTimeout(adjustPosition, 100);
        });
        
        // Haptic feedback en dispositivos compatibles
        whatsappBtn.addEventListener('touchstart', () => {
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }, { passive: true });
    }
    
    // Mejorar back to top para móvil
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    }
};

// Detectar y manejar cambios de orientación
const handleOrientationChange = () => {
    let lastOrientation = getOrientation();
    
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            const newOrientation = getOrientation();
            if (newOrientation !== lastOrientation) {
                // Reajustar layout después del cambio de orientación
                document.body.classList.toggle('landscape', newOrientation === 'landscape');
                document.body.classList.toggle('portrait', newOrientation === 'portrait');
                
                // Cerrar menú si está abierto
                if (APP_STATE.navOpen) {
                    closeMenu();
                }
                
                // Trigger resize event
                window.dispatchEvent(new Event('resize'));
                lastOrientation = newOrientation;
            }
        }, 100);
    });
};

// Función helper para cerrar menú
const closeMenu = () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        APP_STATE.navOpen = false;
        document.body.style.overflow = 'auto';
    }
};

// Función helper para actualizar posición de scroll
const updateScrollPosition = () => {
    APP_STATE.scrollPosition = window.pageYOffset;
    
    // Actualizar navbar en móvil
    const navbar = document.getElementById('navbar');
    if (navbar && window.innerWidth <= 767) {
        if (APP_STATE.scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Mostrar/ocultar back to top
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        if (APP_STATE.scrollPosition > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
};

/* ==========================================================================
   INICIALIZACIÓN DE OPTIMIZACIONES MÓVIL
   ========================================================================== */

// Inicializar todas las optimizaciones móviles
const initMobileOptimizations = () => {
    // Solo ejecutar en dispositivos móviles
    if (window.innerWidth <= 767 || isMobileDevice()) {
        console.log('Inicializando optimizaciones móvil...');
        
        optimizeMobilePerformance();
        setupTouchGestures();
        optimizeMobileScroll();
        optimizeMobileForms();
        optimizeFloatingButtons();
        handleOrientationChange();
        
        // Agregar clase móvil al body
        document.body.classList.add('mobile-optimized');
        
        console.log('Optimizaciones móvil aplicadas ✅');
    }
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileOptimizations);
} else {
    initMobileOptimizations();
}

// Re-evaluar en resize
window.addEventListener('resize', debounce(() => {
    APP_STATE.isMobile = window.innerWidth <= 767;
    if (APP_STATE.isMobile && !document.body.classList.contains('mobile-optimized')) {
        initMobileOptimizations();
    }
}, 250));
