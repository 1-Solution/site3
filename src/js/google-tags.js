const GTAG_SCRIPT_ID = 'gtag-library';

const measurementIds = Array.isArray(window.GTAG_MEASUREMENT_IDS)
  ? window.GTAG_MEASUREMENT_IDS
  : [];

if (measurementIds.length) {
  const ensureGtagFunction = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
  };

  const loadGtagLibrary = () => {
    if (document.getElementById(GTAG_SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      measurementIds[0],
    )}`;
    document.head.appendChild(script);
  };

  const removeGtagLibrary = () => {
    const script = document.getElementById(GTAG_SCRIPT_ID);
    if (script) {
      script.remove();
    }
  };

  const configureMeasurementIds = () => {
    measurementIds.forEach((id) => {
      window.gtag('config', id, { anonymize_ip: true });
    });
  };

  const updateGoogleConsent = (value) => {
    const granted = value === 'accepted';
    const consentState = granted ? 'granted' : 'denied';

    measurementIds.forEach((id) => {
      window[`ga-disable-${id}`] = !granted;
    });

    ensureGtagFunction();

    window.gtag('consent', 'update', {
      ad_storage: consentState,
      analytics_storage: consentState,
      personalization_storage: consentState,
      functionality_storage: 'granted',
      security_storage: 'granted',
    });

    if (granted) {
      loadGtagLibrary();
      window.gtag('js', new Date());
      configureMeasurementIds();
    } else {
      removeGtagLibrary();
    }
  };

  const applyInitialPreference = () => {
    const initialPreference = window.__cookieConsentPreference;
    if (initialPreference) {
      updateGoogleConsent(initialPreference);
    } else {
      updateGoogleConsent('declined');
    }
  };

  document.addEventListener('cookie-consent-change', (event) => {
    const preference = event && event.detail ? event.detail.value : undefined;
    if (!preference) return;
    updateGoogleConsent(preference);
  });

  applyInitialPreference();
}
