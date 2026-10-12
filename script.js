document.addEventListener('DOMContentLoaded', () => {

  // --- FOOTER YEAR ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- NEW: TEXT ANIMATION LOGIC ---
  const animatedText = document.querySelector('.animate-text');
  if (animatedText) {
    const text = animatedText.textContent;
    animatedText.innerHTML = ''; // Clear original text
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      // Add a staggered delay to each letter
      span.style.animationDelay = `${index * 50}ms`;
      animatedText.appendChild(span);
    });
  }

  // --- MOBILE MENU ---
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // --- SCROLL INDICATOR ---
  const scrollIndicator = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollIndicator.style.width = `${scrollPercentage}%`;
  });

  // --- REVEAL ON SCROLL LOGIC ---
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => observer.observe(el));

  // --- MAGNETIC & CURSOR HOVER EFFECT ---
  const magneticElements = document.querySelectorAll('.magnetic');
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
});