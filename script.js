/* ================================================================
   MALIK ELIYA HYDER — PORTFOLIO
   Interactions, animations, and dynamic behavior
   ================================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── CURSOR FOLLOWER ──
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (window.matchMedia('(hover: hover)').matches && cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactives = document.querySelectorAll('a, button, .skill-tag, .stat-card, .project-card__cta, .magnetic');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hover'));
    });
  }

  // ── NAVIGATION SCROLL STATE ──
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 200;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) toggleMenu();
    });
  });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── SCROLL-TRIGGERED REVEAL ANIMATIONS ──
  const revealElements = document.querySelectorAll('.anim-reveal');

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // ── MAGNETIC BUTTON EFFECT ──
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });
    });
  }

  // ── HACKATHONS REGISTRY (EXTENSIBLE DATA STRUCTURE) ──
  window.portfolioHackathons = [
    {
      id: 'learnbridge-ai',
      name: 'LearnBridge AI',
      subtitle: 'Adaptive AI Learning Platform',
      challenge: 'ML Empowerment Build Challenge 2026',
      challengeUrl: 'https://ml-empowerment-build-challenge.devpost.com/',
      category: 'AI / Machine Learning / Education',
      focus: 'Personalized Learning',
      platform: 'Online',
      github: 'https://github.com/eliyahydermalik/learnbridge-ai',
      certificate: 'certificate-learnbridge.png',
      tags: ['AI', 'Machine Learning', 'Education', 'React', 'Express', 'Tailwind CSS']
    }
  ];

  // ── HERO TERMINAL TYPEWRITER ──
  const terminalBody = document.getElementById('terminalBody');

  if (terminalBody) {
    const commandSets = [
      [
        { type: 'cmd', text: '$ whoami' },
        { type: 'val', text: 'Malik Eliya Hyder' },
        { type: 'gap' },
        { type: 'cmd', text: '$ role' },
        { type: 'val', text: 'Data Science Student' },
        { type: 'val', text: 'AI/ML Developer' },
        { type: 'val', text: 'Linux Enthusiast' },
        { type: 'val', text: 'Content Creator' },
      ],
      [
        { type: 'cmd', text: '$ stack' },
        { type: 'val', text: 'Python · SQL · PyTorch · FastAPI' },
        { type: 'gap' },
        { type: 'cmd', text: '$ mindset' },
        { type: 'val', text: 'Build' },
        { type: 'val', text: 'Learn' },
        { type: 'val', text: 'Experiment' },
        { type: 'val', text: 'Repeat' },
      ],
      [
        { type: 'cmd', text: '$ cat projects.txt' },
        { type: 'val', text: 'Skelton AI — CLI assistant' },
        { type: 'val', text: 'Momentum — Study timer' },
        { type: 'val', text: 'Keylogger Detection' },
        { type: 'val', text: 'Solar System Sim' },
        { type: 'gap' },
        { type: 'cmd', text: '$ uptime' },
        { type: 'val', text: 'always building...' },
      ],
    ];

    let setIndex = 0;

    function delay(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }

    async function typeChar(el, text) {
      for (let i = 0; i < text.length; i++) {
        el.textContent += text[i];
        await delay(25 + Math.random() * 30);
      }
    }

    async function runTerminal() {
      while (true) {
        const lines = commandSets[setIndex % commandSets.length];
        terminalBody.innerHTML = '';

        for (const line of lines) {
          if (line.type === 'gap') {
            const gap = document.createElement('div');
            gap.className = 'terminal__line terminal__line--gap';
            terminalBody.appendChild(gap);
            await delay(150);
            continue;
          }

          const div = document.createElement('div');
          div.className = 'terminal__line' + (line.type === 'val' ? ' terminal__line--value' : '');
          terminalBody.appendChild(div);

          if (line.type === 'cmd') {
            // Type out commands character by character
            const prompt = document.createElement('span');
            prompt.className = 'terminal__prompt';
            prompt.textContent = '$';
            div.appendChild(prompt);
            div.appendChild(document.createTextNode(' '));
            const cmd = document.createElement('span');
            cmd.className = 'terminal__cmd';
            div.appendChild(cmd);
            await typeChar(cmd, line.text.slice(2)); // skip '$ '
            await delay(300);
          } else {
            // Values appear with a quick fade
            div.style.opacity = '0';
            div.style.transform = 'translateY(3px)';
            div.textContent = line.text;
            await delay(60);
            div.style.transition = 'opacity 0.25s, transform 0.25s';
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
          }
        }

        // Add blinking cursor at the end
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal__line';
        cursorLine.innerHTML = '<span class="terminal__prompt">$</span> <span class="terminal__cursor">▌</span>';
        terminalBody.appendChild(cursorLine);

        await delay(5000); // pause before cycling
        setIndex++;

        // Fade out
        terminalBody.style.transition = 'opacity 0.4s';
        terminalBody.style.opacity = '0';
        await delay(400);
        terminalBody.style.opacity = '1';
      }
    }

    if (!prefersReducedMotion) {
      setTimeout(runTerminal, 1200);
    } else {
      // Show first set immediately without animation
      const lines = commandSets[0];
      for (const line of lines) {
        const div = document.createElement('div');
        if (line.type === 'gap') {
          div.className = 'terminal__line terminal__line--gap';
        } else if (line.type === 'cmd') {
          div.className = 'terminal__line';
          div.innerHTML = '<span class="terminal__prompt">$</span> <span class="terminal__cmd">' + line.text.slice(2) + '</span>';
        } else {
          div.className = 'terminal__line terminal__line--value';
          div.textContent = line.text;
        }
        terminalBody.appendChild(div);
      }
    }
  }

  // ── PROJECT CARD TILT ON HOVER ──
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.project-card__visual').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  // ── SKILL TAG HOVER ──
  document.querySelectorAll('.skill-tag').forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });

  // ── YEAR IN FOOTER ──
  const footerCopy = document.querySelector('.footer__copy');
  if (footerCopy) {
    footerCopy.textContent = `© ${new Date().getFullYear()} Malik Eliya Hyder`;
  }

})();
