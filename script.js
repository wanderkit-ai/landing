// ─── Scroll reveals ───
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── Staggered children ───
const staggerObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = e.target.parentElement.querySelectorAll('.stagger-child');
      siblings.forEach((s, i) => {
        setTimeout(() => s.classList.add('in'), i * 110);
      });
      staggerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });
document.querySelectorAll('.stagger-child:first-child, .stagger-child:not(.stagger-child ~ .stagger-child)').forEach(el => {
  staggerObs.observe(el.parentElement);
});
// Fallback: observe all stagger-child parents
document.querySelectorAll('.stagger-child').forEach(el => {
  const parent = el.parentElement;
  if (!parent._staggerObserved) {
    parent._staggerObserved = true;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const kids = parent.querySelectorAll('.stagger-child');
        kids.forEach((k, i) => setTimeout(() => k.classList.add('in'), i * 120));
        obs.disconnect();
      }
    }, { threshold: 0.07 });
    obs.observe(parent);
  }
});

// ─── Hero progress bar ───
setTimeout(() => {
  const bar = document.getElementById('heroProgressBar');
  if (bar) bar.classList.add('animate');
}, 800);

// ─── Nav shrink on scroll ───
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── Sticky CTA ───
const stickyCta = document.getElementById('stickyCta');
const hero = document.querySelector('.hero');
const heroObserver = new IntersectionObserver(entries => {
  stickyCta.classList.toggle('visible', !entries[0].isIntersecting);
}, { threshold: 0 });
heroObserver.observe(hero);

// ─── Mobile menu ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── FAQ accordion ───
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});
