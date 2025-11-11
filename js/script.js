// Scroll animation for sections
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const trigger = window.innerHeight * 0.8;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) {
      section.classList.add("visible");
    }
  });
});

// Use Anime.js for a slight floating text effect
anime({
  targets: '.glitch',
  translateY: [0, 3],
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
  duration: 2000
});
