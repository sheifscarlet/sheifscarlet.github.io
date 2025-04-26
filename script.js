const canvas = document.getElementById('matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF00';
    ctx.font = `${fontSize}px JetBrains Mono`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);
}

document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;
  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove();
  }, 500);
});

document.addEventListener('mousedown', () => {
  const glow = document.createElement('div');
  glow.className = 'cursor-trail';
  glow.style.width = '16px';
  glow.style.height = '16px';
  glow.style.opacity = '1';
  glow.style.boxShadow = '0 0 20px #00FF00';
  document.body.appendChild(glow);

  setTimeout(() => {
    glow.remove();
  }, 300);
});

const modal = document.getElementById('modal');
const cards = document.querySelectorAll('.card');

if (modal && cards.length) {
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modalId = card.getAttribute('data-modal');
      document.querySelectorAll('.modal-content').forEach(content => {
        content.style.display = content.id === modalId ? 'block' : 'none';
      });
      modal.style.display = 'block';

      // Анимация элементов модалки
      const modalContent = modal.querySelector('.modal-content[style*="block"]');
      gsap.fromTo(modalContent.querySelector('h3'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(modalContent.querySelector('.modal-details'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
      );
      gsap.fromTo(modalContent.querySelector('.modal-release'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(modalContent.querySelector('.modal-description'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(modalContent.querySelector('.screenshots'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(modalContent.querySelector('iframe'), 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(modalContent.querySelector('.btn'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(modalContent.querySelector('.btn-secondary'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' }
      );
    });
  });

  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.style.display = 'none';
      document.querySelectorAll('iframe').forEach(iframe => iframe.src = '');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.querySelectorAll('iframe').forEach(iframe => iframe.src = '');
    }
  });
}

document.querySelectorAll('h1, h2').forEach(el => {
  gsap.fromTo(el, 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  );
});

document.querySelectorAll('p').forEach(el => {
  gsap.fromTo(el, 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
  );
});

document.querySelectorAll('.card').forEach(el => {
  gsap.fromTo(el, 
    { opacity: 0, scale: 0.8, x: () => Math.random() * 10 - 5 }, 
    { opacity: 1, scale: 1, x: 0, duration: 0.5, delay: 1, stagger: 0.2, ease: 'power2.out' }
  );
});