/* --- Hero slideshow: slide in from right --- */
(function () {
  const slides = document.querySelectorAll('.home-hero-slide');
  if (!slides.length) return;
  let current = 0;

  function nextSlide() {
    const prev = current;
    current = (current + 1) % slides.length;

    slides[prev].classList.remove('active');
    slides[prev].classList.add('exit');
    setTimeout(function () {
      slides[prev].classList.remove('exit');
    }, 900);

    slides[current].classList.add('active');
  }

  setInterval(nextSlide, 4500);
})();

const loader = document.getElementById('pageLoader');
window.addEventListener('load', () => {
  window.setTimeout(() => loader && loader.classList.add('done'), 750);
});

const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

function updateChrome() {
  const y = window.scrollY;
  navbar && navbar.classList.toggle('scrolled', y > 20);
  backToTop && backToTop.classList.toggle('show', y > 500);
}
updateChrome();
window.addEventListener('scroll', updateChrome, { passive: true });

const navLinks = document.getElementById('navLinks');
const menuBtn = document.getElementById('menuBtn');
const navClose = document.getElementById('navClose');

function openMenu() {
  navLinks && navLinks.classList.add('open');
  document.body.style.overflow = 'hidden';
  menuBtn && menuBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  navLinks && navLinks.classList.remove('open');
  document.body.style.overflow = '';
  menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn && menuBtn.addEventListener('click', openMenu);
navClose && navClose.addEventListener('click', closeMenu);
navLinks && navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav]').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

backToTop && backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm && contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;

  contactForm.querySelectorAll('[required]').forEach((field) => {
    const isEmpty = !field.value.trim();
    field.style.borderColor = isEmpty ? '#dc2626' : '';
    valid = valid && !isEmpty;
  });

  if (!valid) return;

  const submit = contactForm.querySelector('button[type="submit"]');
  if (submit) {
    submit.disabled = true;
    submit.textContent = 'Sending...';
  }

  window.setTimeout(() => {
    contactForm.reset();
    if (submit) {
      submit.disabled = false;
      submit.textContent = 'Send Enquiry';
    }
    formSuccess && formSuccess.classList.add('show');
  }, 700);
});
