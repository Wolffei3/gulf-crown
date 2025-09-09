function toggleMode() {
  document.body.classList.toggle("light-mode");
}

function setLanguage(lang) {
  document.querySelectorAll("[data-lang-ar]").forEach(el => {
    el.textContent = el.getAttribute(`data-lang-${lang}`);
  });
}

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Scroll animations
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in, .slide-up").forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
      el.style.animationPlayState = "running";
    }
  });
});
