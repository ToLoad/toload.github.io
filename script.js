const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const pageName = document.documentElement.dataset.page || "home";
const gameRoot = document.querySelector("[data-apple-game]");

function getPageNameFromLink(link) {
  try {
    const url = new URL(link.getAttribute("href"), window.location.href);
    const fileName = url.pathname.split("/").filter(Boolean).pop() || "index.html";
    return fileName === "index.html" ? "home" : fileName.replace(".html", "");
  } catch {
    return "home";
  }
}

navLinks.forEach((link) => {
  const isActive = getPageNameFromLink(link) === pageName;
  link.classList.toggle("is-active", isActive);
  if (isActive) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});

if (gameRoot && !window.__appleGameInstance && window.AppleGame) {
  window.__appleGameInstance = new window.AppleGame(gameRoot);
}
