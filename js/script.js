
let offset = 0;
function vhsShake() {
  document.body.style.transform = `translateX(${Math.sin(offset) * 0.4}px)`;
  offset += 0.2;
  requestAnimationFrame(vhsShake);
}
vhsShake();

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const trigger = window.innerHeight * 0.8;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) section.classList.add("visible");
  });
});

// Glitch animation
anime({
  targets: '.glitch',
  scale: [1, 1.03],
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
  duration: 1500
});

document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('fullscreen-img').src = img.src;
    document.getElementById('fullscreen-viewer').style.display = 'flex';
  });
});

function closeFullscreen() {
  document.getElementById('fullscreen-viewer').style.display = 'none';
}

document.getElementById('fullscreen-viewer').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeFullscreen();
});

// ESC key closes
document.addEventListener('keydown', e => {
  if (e.key === "Escape") closeFullscreen();
});

