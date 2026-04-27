const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroCarouselDots = document.querySelector("[data-hero-carousel-dots]");
const searchPanel = document.querySelector(".search-panel");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const equipmentDrawer = document.querySelector("[data-equipment-drawer]");
const equipmentDrawerPanel = equipmentDrawer?.querySelector(".equipment-drawer__panel");
const equipmentDrawerContent = document.querySelector("[data-equipment-drawer-content]");
let lastFocusedElement = null;

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

  menuButton.addEventListener("click", () => {
    const isOpen = menu?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    header?.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      header?.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

if (heroCarousel) {
  const slides = Array.from(heroCarousel.querySelectorAll(".hero-carousel__image"));
  const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  const dots = [];

  const setActiveSlide = (index) => {
    activeIndex = index;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "hero-carousel__dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Mostrar imagem ${index + 1}`);
    dot.addEventListener("click", () => setActiveSlide(index));
    heroCarouselDots?.append(dot);
    dots.push(dot);
  });

  setActiveSlide(activeIndex);

  if (slides.length > 1 && !shouldReduceMotion) {
    window.setInterval(() => {
      setActiveSlide((activeIndex + 1) % slides.length);
    }, 5200);
  }
}

document.querySelectorAll("[data-card-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".card-carousel__image"));
  const dotsContainer = carousel.querySelector("[data-card-carousel-dots]");
  const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dots = [];
  let activeIndex = 0;

  const setActiveSlide = (index) => {
    activeIndex = index;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = index === activeIndex ? "is-active" : "";
    dotsContainer?.append(dot);
    dots.push(dot);
  });

  setActiveSlide(activeIndex);

  if (slides.length > 1 && !shouldReduceMotion) {
    window.setInterval(() => {
      setActiveSlide((activeIndex + 1) % slides.length);
    }, 3600);
  }
});

const closeEquipmentDrawer = (restoreFocus = true) => {
  if (!equipmentDrawer) return;

  equipmentDrawer.classList.remove("is-open");
  equipmentDrawer.setAttribute("aria-hidden", "true");
  equipmentDrawer.inert = true;
  document.body.classList.remove("details-open");

  if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

const openEquipmentDrawer = (detailId, trigger) => {
  if (!equipmentDrawer || !equipmentDrawerContent) return;

  const source = document.getElementById(detailId);
  if (!source) return;

  const detail = source.cloneNode(true);
  detail.removeAttribute("id");
  detail.classList.remove("is-highlighted");

  const title = detail.querySelector("h3");
  if (title) {
    title.id = "equipment-drawer-title";
  }

  equipmentDrawerContent.replaceChildren(detail);
  lastFocusedElement = trigger;
  equipmentDrawer.inert = false;
  equipmentDrawer.classList.add("is-open");
  equipmentDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("details-open");
  equipmentDrawerPanel?.focus();
};

document.querySelectorAll(".product-card[href^='#']").forEach((card) => {
  card.addEventListener("click", (event) => {
    const detailId = card.getAttribute("href")?.slice(1);
    if (!detailId || !document.getElementById(detailId)) return;

    event.preventDefault();
    openEquipmentDrawer(detailId, card);
  });
});

document.querySelectorAll("[data-equipment-drawer-close]").forEach((trigger) => {
  trigger.addEventListener("click", closeEquipmentDrawer);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && equipmentDrawer?.classList.contains("is-open")) {
    closeEquipmentDrawer();
  }
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    if (form.classList.contains("quote-form")) {
      event.preventDefault();
      const formData = new FormData(form);
      const message = [
        "Ola, gostaria de solicitar um orcamento pela LocTubo.",
        `Nome: ${formData.get("nome") || ""}`,
        `Telefone: ${formData.get("telefone") || ""}`,
        `Empresa: ${formData.get("empresa") || ""}`,
        `Equipamento: ${formData.get("equipamento") || ""}`,
        `Periodo: ${formData.get("periodo") || ""}`,
        `CEP: ${formData.get("cep") || ""}`,
        `Detalhes: ${formData.get("detalhes") || ""}`
      ].join("\n");

      window.location.href = `https://wa.me/5511986740961?text=${encodeURIComponent(message)}`;
    }
  });
});

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

if (searchPanel) {
  searchPanel.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchPanel.querySelector("input[type='search']");
    const term = normalizeText(input?.value.trim() || "");
    const targets = Array.from(document.querySelectorAll(".product-card"));

    targets.forEach((target) => target.classList.remove("is-highlighted"));

    if (!term) {
      document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const match = targets.find((target) => normalizeText(target.textContent || "").includes(term));

    if (match) {
      match.classList.add("is-highlighted");
      match.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      document.querySelector("#orcamento")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-quote-equipment]");
  if (!trigger) return;

  const select = document.querySelector(".quote-form select[name='equipamento']");
  if (select) {
    select.value = trigger.dataset.quoteEquipment || "";
  }

  closeEquipmentDrawer(false);
});

const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const reduceScrollMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let revealTicking = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const setRevealProgress = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  revealItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const rawProgress = (viewportHeight - rect.top) / (viewportHeight * 0.72 + rect.height);
    const staggeredProgress = clamp((rawProgress - index * 0.08) / 0.82, 0, 1);
    const easedProgress = 1 - Math.pow(1 - staggeredProgress, 3);

    item.style.setProperty("--reveal-opacity", easedProgress.toFixed(3));
    item.style.setProperty("--reveal-y", `${((1 - easedProgress) * 1.8).toFixed(3)}rem`);
    item.style.setProperty("--reveal-scale", (0.96 + easedProgress * 0.04).toFixed(3));
  });

  revealTicking = false;
};

const requestRevealProgress = () => {
  if (revealTicking) return;

  revealTicking = true;
  window.requestAnimationFrame(setRevealProgress);
};

if (revealItems.length > 0) {
  if (reduceScrollMotion) {
    revealItems.forEach((item) => {
      item.style.setProperty("--reveal-opacity", "1");
      item.style.setProperty("--reveal-y", "0rem");
      item.style.setProperty("--reveal-scale", "1");
    });
  } else {
    setRevealProgress();
    window.addEventListener("scroll", requestRevealProgress, { passive: true });
    window.addEventListener("resize", requestRevealProgress);
  }
}
