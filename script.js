// Toggle do menu mobile
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // fecha o menu ao clicar em um link (mobile)
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                menu.classList.add('hidden');
            }
        });
    });
}

// marca o link ativo conforme a seção visível
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const clearActive = () => {
    navLinks.forEach((link) => {
        link.classList.remove('active');
        link.classList.remove('after:w-[55px]');
        link.classList.add('after:w-0');
    });
};

const setActive = (id) => {
    clearActive();
    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.classList.remove('after:w-0');
        activeLink.classList.add('after:w-[55px]');
    }
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    },
    { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => observer.observe(section));

// Carrossel de fotos do produto
const carousel = document.getElementById('product-carousel');

if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    let current = 0;
    let autoplayTimer = null;

    const goTo = (index) => {
        slides[current].classList.add('opacity-0');
        dots[current].classList.remove('bg-pink');
        dots[current].classList.add('bg-pink/30');

        current = (index + slides.length) % slides.length;

        slides[current].classList.remove('opacity-0');
        dots[current].classList.remove('bg-pink/30');
        dots[current].classList.add('bg-pink');
    };

    const startAutoplay = () => {
        autoplayTimer = setInterval(() => goTo(current + 1), 3000);
    };

    const resetAutoplay = () => {
        clearInterval(autoplayTimer);
        startAutoplay();
    };

    prevBtn.addEventListener('click', () => {
        goTo(current - 1);
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        goTo(current + 1);
        resetAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goTo(index);
            resetAutoplay();
        });
    });

    startAutoplay();
}