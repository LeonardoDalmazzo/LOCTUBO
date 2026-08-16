const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const scrollTopButton = document.querySelector("[data-scroll-top]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
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

  const syncMenuState = (isOpen, focusFirst = false) => {
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

    if (shouldShowMobileMenu && focusFirst) {
      window.requestAnimationFrame(() => menuLinks[0]?.focus());
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = !menu?.classList.contains("is-open");
    syncMenuState(isOpen, isOpen);
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
    if (focusableItems.length === 0) return;

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

const campaignName = document.body.dataset.campaign || "";
const serviceName = document.body.dataset.service || "";
const trackingParameters = (extra = {}) => ({
  campaign_name: campaignName,
  page_path: window.location.pathname,
  service_name: serviceName,
  ...extra
});

const trackEvent = (eventName, parameters = {}) => {
  const eventParameters = trackingParameters(parameters);

  if (window.LoctuboTracking?.track) {
    window.LoctuboTracking.track(eventName, eventParameters);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...eventParameters });
};

const openWhatsApp = (url) => {
  const whatsappWindow = window.open(url, "_blank");
  if (whatsappWindow) {
    whatsappWindow.opener = null;
    return;
  }

  window.location.assign(url);
};

document.querySelectorAll("[data-whatsapp-cta]").forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("whatsapp_click", {
      cta_location: link.dataset.ctaLocation || "landing_page"
    });
  });
});

document.querySelectorAll("[data-track-call]").forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("click_to_call", {
      cta_location: link.dataset.ctaLocation || "landing_page"
    });
  });
});

const onlyNumbers = (value) => value.replace(/\D/g, "");

const normalizePhone = (value) => {
  const digits = onlyNumbers(value);

  return digits.startsWith("55") && digits.length >= 12
    ? digits.slice(2, 13)
    : digits.slice(0, 11);
};

const formatPhone = (value) => {
  const digits = normalizePhone(value);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const setFormFeedback = (form, message = "") => {
  const feedback = form.querySelector("[data-form-feedback]");
  if (!feedback) return;

  feedback.textContent = message;
  feedback.hidden = message.length === 0;
};

const setFieldValidity = (field, isValid) => {
  if (!field) return;
  field.toggleAttribute("aria-invalid", !isValid);
};

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  const phoneInput = form.querySelector("input[name='telefone']");

  phoneInput?.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
    const digits = normalizePhone(phoneInput.value);
    setFieldValidity(phoneInput, digits.length === 0 || (digits.length >= 10 && digits.length <= 11));
  });

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.value.trim()) setFieldValidity(field, true);
    });
    field.addEventListener("change", () => {
      if (field.value.trim()) setFieldValidity(field, true);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setFormFeedback(form);

    const requiredFields = Array.from(form.querySelectorAll("[required]"));
    let firstInvalidField = null;
    requiredFields.forEach((field) => {
      const isValid = field.value.trim().length > 0;
      setFieldValidity(field, isValid);
      if (!isValid && !firstInvalidField) firstInvalidField = field;
    });

    const phoneDigits = normalizePhone(phoneInput?.value || "");
    const hasValidPhone = phoneDigits.length >= 10 && phoneDigits.length <= 11;
    setFieldValidity(phoneInput, hasValidPhone);
    if (!hasValidPhone && !firstInvalidField) firstInvalidField = phoneInput;

    if (firstInvalidField) {
      setFormFeedback(form, "Confira os campos obrigatórios e informe um WhatsApp com DDD.");
      firstInvalidField.focus();
      return;
    }

    const formData = new FormData(form);
    const formService = form.dataset.service || serviceName;
    const lines = [
      "Olá, gostaria de solicitar um orçamento pela LocTubo.",
      `Serviço: ${formService}`,
      `Nome: ${String(formData.get("nome") || "").trim()}`,
      `WhatsApp: ${String(formData.get("telefone") || "").trim()}`,
      `Necessidade: ${String(formData.get("necessidade") || "").trim()}`,
      `Prazo: ${String(formData.get("prazo") || "Não informado").trim() || "Não informado"}`,
      `Local da obra: ${String(formData.get("local") || "Não informado").trim() || "Não informado"}`,
      String(formData.get("medidas") || "").trim() ? `Medidas / informações: ${String(formData.get("medidas")).trim()}` : "",
      String(formData.get("detalhes") || "").trim() ? `Observações: ${String(formData.get("detalhes")).trim()}` : ""
    ].filter(Boolean);

    const trackingData = {
      form_name: form.dataset.formName || "landing_quote",
      form_variant: form.dataset.formVariant || "default"
    };
    trackEvent("generate_lead", { ...trackingData, lead_channel: "whatsapp" });
    setFormFeedback(form, "Abrindo o WhatsApp para enviar seu pedido…");

    const phone = form.dataset.whatsappNumber || "5511986740961";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
    openWhatsApp(url);
  });
});

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
