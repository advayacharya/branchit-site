// Branchit landing — motion + smooth scroll, both respect prefers-reduced-motion.
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth-scroll on internal anchor clicks
  for (const a of document.querySelectorAll('a[href^="#"]')) {
    a.addEventListener('click', event => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  }

  if (reduced) {
    for (const el of document.querySelectorAll('.reveal')) el.classList.add('in-view');
    return;
  }

  // Fade-up sections and step chapters as they enter the viewport
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
  );

  for (const el of document.querySelectorAll('.reveal')) observer.observe(el);
})();
