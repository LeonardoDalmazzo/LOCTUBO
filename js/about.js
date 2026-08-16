const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const scrollTopButton = document.querySelector("[data-scroll-top]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const setScrollTopState = () => {
  scrollTopButton?.classList.toggle("is-visible", window.scrollY > 560);
};

setScrollTopState();
window.addEventListener("scroll", setScrollTopState, { passive: true });

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (menuButton) {
  const menu = document.querySelector(menuButton.dataset.menuToggle);
  const desktopMenuQuery = window.matchMedia("(min-width: 58rem)");
  const menuLinks = Array.from(menu?.querySelectorAll("a") || []);

  const syncMenuState = (isOpen, options = {}) => {
    const isDesktop = desktopMenuQuery.matches;
    const shouldBeInteractive = isDesktop || isOpen;
    const shouldShowMobileMenu = !isDesktop && isOpen;

    menu?.classList.toggle("is-open", shouldShowMobileMenu);
    menu?.toggleAttribute("inert", !shouldBeInteractive);
    menu?.setAttribute("aria-hidden", String(!shouldBeInteractive));
    menuLinks.forEach((link) => {
      link.tabIndex = shouldBeInteractive ? 0 : -1;
    });
    menuButton.setAttribute("aria-expanded", String(shouldShowMobileMenu));
    menuButton.setAttribute("aria-label", shouldShowMobileMenu ? "Fechar menu" : "Abrir menu");
    header?.classList.toggle("is-open", shouldShowMobileMenu);
    document.body.classList.toggle("menu-open", shouldShowMobileMenu);

    if (shouldShowMobileMenu && options.focusFirst) {
      window.requestAnimationFrame(() => menuLinks[0]?.focus());
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = !menu?.classList.contains("is-open");
    syncMenuState(isOpen, { focusFirst: isOpen });
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!desktopMenuQuery.matches) {
        window.requestAnimationFrame(() => syncMenuState(false));
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("is-open")) {
      syncMenuState(false);
      menuButton.focus();
      return;
    }

    if (event.key !== "Tab" || desktopMenuQuery.matches || !menu?.classList.contains("is-open")) {
      return;
    }

    const focusableItems = menuLinks.filter((link) => link.getClientRects().length > 0);
    if (focusableItems.length === 0) {
      event.preventDefault();
      menuButton.focus();
      return;
    }

    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];
    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  const handleDesktopMenuChange = () => syncMenuState(false);
  if (typeof desktopMenuQuery.addEventListener === "function") {
    desktopMenuQuery.addEventListener("change", handleDesktopMenuChange);
  } else if (typeof desktopMenuQuery.addListener === "function") {
    desktopMenuQuery.addListener(handleDesktopMenuChange);
  }

  syncMenuState(false);
}

const sideRevealSections = Array.from(document.querySelectorAll("[data-process-reveal], [data-side-reveal]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (sideRevealSections.length > 0) {
  sideRevealSections.forEach((section) => section.classList.add("is-reveal-ready"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    sideRevealSections.forEach((section) => section.classList.add("is-visible"));
  } else {
    const sideRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    sideRevealSections.forEach((section) => sideRevealObserver.observe(section));
  }
}
