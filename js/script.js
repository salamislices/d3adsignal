const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

  const defaultSrc = btn.src;
  const hoverSrc = btn.dataset.hover;

  btn.addEventListener("mouseenter", () => {
    if (hoverSrc) btn.src = hoverSrc;
  });

  btn.addEventListener("mouseleave", () => {
    btn.src = defaultSrc;
  });

});