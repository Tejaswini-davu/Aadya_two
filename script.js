/* ================================================================
   AADYA FOODS LLC — SCRIPTS
   ================================================================ */

/* ---- Page Loader ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('done');
  }, 1600);
});

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
const btt = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 80);
  btt.classList.toggle('show', y > 500);
}, { passive: true });

/* ---- Mobile menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navClose  = document.getElementById('navClose');

function openMenu() {
  navLinks.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', openMenu);
navClose && navClose.addEventListener('click', closeMenu);

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- Back to top ---- */
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- Reveal on scroll ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0) + (i % 4) * 80;
        setTimeout(() => el.classList.add('in'), delay);
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

/* ---- Eastern Time helpers (used for today highlight) ---- */
function isDST(d) {
  const jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(jan, jul) !== d.getTimezoneOffset();
}

function toET(date) {
  const etOffset = isDST(date) ? -4 : -5;
  return new Date(date.getTime() + (date.getTimezoneOffset() + etOffset * 60) * 60000);
}

/* ---- Highlight today in hours table ---- */
(function highlightToday() {
  const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const et  = toET(new Date());
  const today = days[et.getDay()];
  document.querySelectorAll('.hours-tbl .day').forEach(row => {
    const cell = row.querySelector('td');
    if (cell && cell.textContent.toLowerCase() === today) {
      row.style.borderLeft = '3px solid #C9A84C';
      row.querySelector('td').style.color = '#C9A84C';
      row.querySelector('td').style.fontWeight = '600';
    }
  });
})();

/* ---- Contact form ---- */
const form       = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn  = document.getElementById('submitBtn');

form && form.addEventListener('submit', e => {
  e.preventDefault();

  // Basic validation highlight
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  if (!valid) return;

  submitBtn.querySelector('span').textContent = 'Sending…';
  submitBtn.disabled = true;

  // Replace this setTimeout with your actual API / Formspree / EmailJS call
  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.classList.add('show');
  }, 1400);
});

/* ---- Image error fallback for product cards ---- */
document.querySelectorAll('.prod-img-wrap img').forEach(img => {
  if (img.complete && img.naturalWidth === 0) {
    img.parentElement.classList.add('no-img');
  }
  img.addEventListener('error', () => {
    img.parentElement.classList.add('no-img');
  });
});
document.querySelectorAll('.about-img').forEach(img => {
  if (img.complete && img.naturalWidth === 0) {
    img.closest('.about-img-frame').classList.add('no-img');
  }
  img.addEventListener('error', () => {
    img.closest('.about-img-frame').classList.add('no-img');
  });
});

/* ---- Active nav link tracking ---- */
const navItems = document.querySelectorAll('.nav-item');
const allSections = document.querySelectorAll('section[id]');

const activeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(a => {
          const active = a.getAttribute('href') === `#${id}`;
          a.style.opacity = active ? '1' : '';
        });
      }
    });
  },
  { threshold: 0.45 }
);
allSections.forEach(s => activeObserver.observe(s));
