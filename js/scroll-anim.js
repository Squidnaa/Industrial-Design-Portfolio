// Lightweight scroll reveal using IntersectionObserver
(function(){
  if (typeof window === 'undefined') return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // if we want one-time reveals, unobserve after in-view
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('[data-reveal]').forEach((el, i)=>{
      // allow custom stagger by setting inline style --d
      if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', i);
      io.observe(el);
      // also observe direct children for subtle stagger
      el.querySelectorAll(':scope > *').forEach((child, j)=>{
        if (!child.hasAttribute('data-reveal')) {
          child.style.transitionDelay = `calc(${el.style.getPropertyValue('--d') || 0} * 80ms + ${j*40}ms)`;
        }
      });
    });
  });
})();
