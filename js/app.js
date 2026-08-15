/**
 * RoomRent Application Entry Point
 * Tích hợp SPA Router, Navbar, Footer và Hệ thống Hiệu ứng Hạt Bụi Vàng Kim Toàn Cục (Global Golden Sparks)
 */
import { initRouter } from './router.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render layout components
  renderNavbar();
  renderFooter();

  // 2. Initialize Global Golden Dust Sparks Particles (Mọi trang)
  initGlobalSparks();

  // 3. Initialize SPA Router
  initRouter();
});

/**
 * Global Golden Dust Particles Engine (60 luminous floating golden sparks)
 * Hoạt động liên tục xuyên suốt toàn bộ ứng dụng SPA
 */
function initGlobalSparks() {
  const canvas = document.getElementById('global-sparks-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 60;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 1.0,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -(Math.random() * 0.45 + 0.2),
      alpha: Math.random() * 0.6 + 0.2,
      maxAlpha: Math.random() * 0.5 + 0.4,
      alphaSpeed: Math.random() * 0.015 + 0.005,
      pulseDirection: Math.random() > 0.5 ? 1 : -1,
      colorType: Math.random() > 0.3 ? 'gold' : 'amber'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      // Move particle
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Pulse alpha
      p.alpha += p.alphaSpeed * p.pulseDirection;
      if (p.alpha >= p.maxAlpha) {
        p.alpha = p.maxAlpha;
        p.pulseDirection = -1;
      } else if (p.alpha <= 0.15) {
        p.alpha = 0.15;
        p.pulseDirection = 1;
      }

      // Draw particle with gentle radial glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
      if (p.colorType === 'gold') {
        gradient.addColorStop(0, `rgba(243, 209, 126, ${p.alpha})`);
        gradient.addColorStop(0.5, `rgba(224, 180, 69, ${p.alpha * 0.65})`);
        gradient.addColorStop(1, 'rgba(224, 180, 69, 0)');
      } else {
        gradient.addColorStop(0, `rgba(255, 235, 175, ${p.alpha})`);
        gradient.addColorStop(0.5, `rgba(195, 110, 34, ${p.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(195, 110, 34, 0)');
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Sharp core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
