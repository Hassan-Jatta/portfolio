(function () {
  'use strict';

  /* ── 1. TOP NAV : shadow on scroll ───────────────────── */
  const topnav = document.querySelector('.topnav');
  if (topnav) {
    window.addEventListener('scroll', () => {
      topnav.style.boxShadow = window.scrollY > 10
        ? '0 2px 12px rgba(0,0,0,.08)'
        : 'none';
    }, { passive: true });
  }

  /* ── 2. PROJECT FILTER ────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ── 3. SCROLL REVEAL ─────────────────────────────────── */
  const revealTargets = document.querySelectorAll(
    '.intro-card, .report-page, .model-step, .contact-card, .skill-tag, .project-card, .kpi'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.children];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(idx * 70, 350)}ms`;
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ── 4. HERO PARALLAX ─────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg-grid');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }, { passive: true });
  }

})();