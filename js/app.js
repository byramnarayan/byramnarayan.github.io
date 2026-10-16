/* ─── Portfolio App JS ──────────────────────────────────────
   Handles:
     1. Theme toggle (OS preference + manual override)
     2. Scroll progress bar
     3. Section entrance animations (IntersectionObserver .rise)
     4. Mobile nav menu toggle
     5. Animated particle/grid hero canvas
   ─────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── 1. Theme ─────────────────────────────────────────────── */
  const html = document.documentElement;
  const STORAGE_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved; // 'dark' | 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.classList.toggle('theme-dark', theme === 'dark');
    html.classList.toggle('theme-light', theme === 'light');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getPreferredTheme());

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        const current = html.classList.contains('theme-dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
      });
    }

    /* ── 2. Scroll progress bar ─────────────────────────────── */
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct.toFixed(2) + '%';
      }, { passive: true });
    }

    /* ── 3. Entrance animations ─────────────────────────────── */
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('risen');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.observe-rise').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything immediately
      document.querySelectorAll('.observe-rise').forEach(function (el) {
        el.classList.add('risen');
      });
    }

    /* ── 4. Mobile nav ──────────────────────────────────────── */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener('click', function () {
        const open = mobileNav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open.toString());
      });
      // Close on link click
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileNav.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ── 5. Hero ambient grid canvas ────────────────────────── */
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    let W, H, dots, animId;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    function getCssVar(name) {
      return getComputedStyle(html).getPropertyValue(name).trim();
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initDots();
    }

    function initDots() {
      const count = Math.floor((W * H) / 10000);
      dots = Array.from({ length: Math.min(count, 60) }, function () {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - .5) * .35,
          vy: (Math.random() - .5) * .35,
          r: Math.random() * 1.5 + .5
        };
      });
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      const accentHex = getCssVar('--accent');
      const borderHex = getCssVar('--border');

      // Draw connection lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(138,134,255,' + ((1 - dist / 140) * 0.12) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach(function (d) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(138,134,255,.35)';
        ctx.fill();

        // Move
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });

      animId = requestAnimationFrame(drawFrame);
    }

    window.addEventListener('resize', function () {
      cancelAnimationFrame(animId);
      resize();
      drawFrame();
    });

    resize();
    drawFrame();
  });
})();
