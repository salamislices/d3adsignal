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
anime({
  targets: '.glitch',
  scale: [1, 1.03],
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
  duration: 1500
});
