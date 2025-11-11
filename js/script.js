// script.js — cleaned, robust, DOM-ready
window.addEventListener('DOMContentLoaded', () => {
  // ---- ScrollReveal (safe check) ----
  try {
    if (typeof ScrollReveal !== 'undefined') {
      ScrollReveal().reveal('.content-section h2', {
        duration: 800,
        origin: 'left',
        distance: '30px',
        easing: 'ease-in-out'
      });
      ScrollReveal().reveal('.content-section p, .game-list article', {
        duration: 1000,
        origin: 'bottom',
        distance: '20px',
        easing: 'ease-in-out',
        interval: 100
      });
    } else {
      // fallback: simple fade-in
      document.querySelectorAll('.content-section').forEach((el) => {
        el.style.opacity = 1;
      });
    }
  } catch (err) {
    // Don't break if ScrollReveal misbehaves
    // console.warn('ScrollReveal error', err);
  }

  // ---- Year fill ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Contact form handler (safe) ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Small UX: disable button briefly
      const submit = contactForm.querySelector('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Sending...';
      }

      // Demo behavior — replace with real API call (Formspree/EmailJS) later
      setTimeout(() => {
        alert('Transmission sent. (Demo)');
        contactForm.reset();
        if (submit) {
          submit.disabled = false;
          submit.textContent = 'Send Signal';
        }
      }, 700);
    });
  }

  // ---- Three.js background (safe) ----
  (function initThreeBackground() {
    // require a canvas with id 'bg' and THREE available
    const canvas = document.getElementById('bg');
    if (!canvas || typeof THREE === 'undefined') return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // Low-poly retro object
    const geometry = new THREE.IcosahedronGeometry(2.2, 0); // low-poly look (PS1)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff003c,
      wireframe: true,
      opacity: 0.85,
      transparent: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // gentle ambient points for depth (subtle)
    const pointsGeom = new THREE.BufferGeometry();
    const pointsCount = 120;
    const positions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    pointsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({ size: 0.035, color: 0xffffff, opacity: 0.06, transparent: true });
    const points = new THREE.Points(pointsGeom, pointsMat);
    scene.add(points);

    // subtle camera bob parameters
    let t = 0;
    function animate() {
      t += 0.01;
      mesh.rotation.x = Math.sin(t * 0.3) * 0.15 + t * 0.0015;
      mesh.rotation.y = Math.cos(t * 0.17) * 0.12 + t * 0.002;
      mesh.rotation.z = Math.sin(t * 0.11) * 0.08;

      // slight parallax effect for points
      points.rotation.y = t * 0.02;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Resize handling
    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }
    window.addEventListener('resize', onResize);
  })();

  // ---- Optional: smooth scrolling for nav anchors ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Tiny accessibility: reveal/hide mobile nav (if you add a burger) ----
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-menu');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navList.setAttribute('data-open', String(!open));
    });
  }
});
