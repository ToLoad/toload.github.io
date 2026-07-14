const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const pageName = document.documentElement.dataset.page || "home";
const currentHash = window.location.hash || "";
const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".site-menu-button");
const menuPanel = document.querySelector(".site-menu-panel");
const gameRoot = document.querySelector("[data-apple-game]");

function getPageNameFromLink(link) {
  try {
    const url = new URL(link.getAttribute("href"), window.location.href);
    const fileName = url.pathname.split("/").filter(Boolean).pop() || "index.html";

    if (url.hash === "#about") {
      return "about";
    }

    if (url.hash === "#contact") {
      return "contact";
    }

    return fileName === "index.html" ? "home" : fileName.replace(".html", "");
  } catch {
    return "home";
  }
}

function isActiveLink(link) {
  const target = getPageNameFromLink(link);

  if (target === "home") {
    return pageName === "home" && currentHash === "";
  }

  if (target === "about") {
    return pageName === "about" || (pageName === "home" && currentHash === "#about");
  }

  if (target === "contact") {
    return pageName === "contact" || currentHash === "#contact";
  }

  return target === pageName;
}

navLinks.forEach((link) => {
  const isActive = isActiveLink(link);
  link.classList.toggle("is-active", isActive);
  if (isActive) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});

function updateHeaderState() {
  if (!siteHeader) {
    return;
  }

  const isCompact = window.scrollY > 24;
  siteHeader.classList.toggle("site-header--compact", isCompact);

  if (menuPanel) {
    if (isCompact) {
      const isOpen = siteHeader.classList.contains("site-header--menu-open");
      menuPanel.hidden = !isOpen;
      if (menuButton) {
        menuButton.setAttribute("aria-expanded", String(isOpen));
      }
    } else {
      siteHeader.classList.remove("site-header--menu-open");
      menuPanel.hidden = false;
      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
      }
    }
  }
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", updateHeaderState);
updateHeaderState();

function closeMenu() {
  if (!siteHeader || !menuPanel || !menuButton) {
    return;
  }

  siteHeader.classList.remove("site-header--menu-open");
  menuPanel.hidden = !siteHeader.classList.contains("site-header--compact");
  menuButton.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!siteHeader || !menuPanel || !menuButton) {
    return;
  }

  if (!siteHeader.classList.contains("site-header--compact")) {
    return;
  }

  const isOpen = siteHeader.classList.toggle("site-header--menu-open");
  menuPanel.hidden = !isOpen;
  menuButton.setAttribute("aria-expanded", String(isOpen));
}

if (menuButton && menuPanel) {
  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  menuPanel.addEventListener("click", (event) => {
    const link = event.target.closest?.(".nav-link");
    if (link) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader?.contains?.(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

if (gameRoot && !window.__appleGameInstance && window.AppleGame) {
  window.__appleGameInstance = new window.AppleGame(gameRoot);
}
