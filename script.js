document.addEventListener('DOMContentLoaded', () => {

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

  // --- PRELOADER ---
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
  });

  // --- CUSTOM CURSOR ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });
  
  document.addEventListener('mouseleave', () => {
    cursorDot.classList.add('hidden');
    cursorOutline.classList.add('hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.classList.remove('hidden');
    cursorOutline.classList.remove('hidden');
  });

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
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
    });
  });
});