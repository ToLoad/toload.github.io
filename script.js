import { AppleGame } from "./game.js";

const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const gameRoot = document.querySelector("[data-apple-game]");

function setActiveLink(targetId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${targetId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function getFirstVisibleSection() {
  const threshold = window.innerHeight * 0.35;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= threshold && rect.bottom > threshold) {
      return section.id;
    }
  }

  return sections[0]?.id ?? "home";
}

function syncActiveLink() {
  setActiveLink(location.hash.slice(1) || getFirstVisibleSection());
}

window.addEventListener("hashchange", syncActiveLink);
window.addEventListener("scroll", () => {
  if (!location.hash) {
    setActiveLink(getFirstVisibleSection());
  }
});

syncActiveLink();

if (gameRoot && !window.__appleGameInstance) {
  window.__appleGameInstance = new AppleGame(gameRoot);
}
