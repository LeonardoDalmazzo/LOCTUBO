(() => {
  const googleAdsTagId = "AW-18308865189";
  // Preencha somente depois de criar as ações de conversão no Google Ads.
  // Enquanto vazios, os eventos continuam disponíveis no dataLayer/Google tag,
  // mas não são enviados como conversões do Google Ads.
  const googleAdsConversionLabels = Object.freeze({
    whatsapp_click: "",
    click_to_call: "",
    generate_lead: ""
  });
  const allowedEventParameters = new Set([
    "campaign_name",
    "page_path",
    "service_name",
    "cta_location",
    "form_name",
    "form_variant",
    "lead_channel"
  ]);
  const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"];
  let fallbackTimer = 0;
  let tagState = "idle";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", googleAdsTagId);

  const getSafeEventParameters = (parameters = {}) => Object.fromEntries(
    Object.entries(parameters).filter(([key, value]) => (
      allowedEventParameters.has(key)
      && typeof value === "string"
      && value.length > 0
      && value.length <= 160
    ))
  );

  const track = (eventName, parameters = {}) => {
    const safeParameters = getSafeEventParameters(parameters);

    // Este objeto é útil para uma futura configuração de GTM e não inclui PII.
    window.dataLayer.push({ event: eventName, ...safeParameters });
    window.gtag("event", eventName, safeParameters);

    const conversionLabel = googleAdsConversionLabels[eventName];
    if (conversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${googleAdsTagId}/${conversionLabel}`,
        ...safeParameters
      });
    }
  };

  window.LoctuboTracking = Object.assign(window.LoctuboTracking || {}, {
    track
  });

  const removeInteractionListeners = () => {
    interactionEvents.forEach((eventName) => {
      window.removeEventListener(eventName, loadGoogleTag);
    });
  };

  function loadGoogleTag() {
    if (tagState !== "idle") return;

    tagState = "loading";
    window.clearTimeout(fallbackTimer);
    removeInteractionListeners();

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAdsTagId)}`;
    script.addEventListener("load", () => {
      tagState = "loaded";
    }, { once: true });
    script.addEventListener("error", () => {
      tagState = "failed";
    }, { once: true });
    document.head.append(script);
  }

  interactionEvents.forEach((eventName) => {
    window.addEventListener(eventName, loadGoogleTag, { once: true, passive: true });
  });

  const scheduleFallbackLoad = () => {
    fallbackTimer = window.setTimeout(loadGoogleTag, 7000);
  };

  if (document.readyState === "complete") {
    scheduleFallbackLoad();
  } else {
    window.addEventListener("load", scheduleFallbackLoad, { once: true });
  }
})();
