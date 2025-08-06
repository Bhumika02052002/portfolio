document.addEventListener('DOMContentLoaded', function() {
    // ===== Improved Preloader =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const fallbackTimeout = setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 4000);

        window.addEventListener('load', () => {
            clearTimeout(fallbackTimeout);
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        });
    }

    // ===== Enhanced Navbar =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Close mobile menu on outside click =====
    document.addEventListener('click', function (event) {
        const navCollapse = document.querySelector('.navbar-collapse');
        const isToggler = event.target.closest('.navbar-toggler');
        if (navCollapse.classList.contains('show') && !isToggler && !navbar.contains(event.target)) {
            new bootstrap.Collapse(navCollapse).hide();
        }
    });

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;
            window.scrollTo({
                top: document.querySelector(targetId).offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // ===== Scroll to Top Button =====
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('active', window.scrollY > 300);
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Enhanced Dark/Light Mode =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    body.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ===== AOS Initialization =====
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });

    // ===== Animate Progress Bars on Scroll =====
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    bar.style.width = bar.getAttribute('aria-valuenow') + '%';
                });
                observer.unobserve(skillsSection); // Animate only once
            }
        }, { threshold: 0.3 });
        observer.observe(skillsSection);
    }
});