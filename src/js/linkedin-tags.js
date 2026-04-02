const LINKEDIN_SCRIPT_ID = 'linkedin-insight-script';

const partnerIds = Array.isArray(window.LINKEDIN_PARTNER_IDS)
  ? window.LINKEDIN_PARTNER_IDS
  : [];

if (partnerIds.length) {
  const ensureLinkedInGlobals = () => {
    window._linkedin_data_partner_ids =
      window._linkedin_data_partner_ids || [];

    partnerIds.forEach((id) => {
      if (!window._linkedin_data_partner_ids.includes(id)) {
        window._linkedin_data_partner_ids.push(id);
      }
    });
  };

  const loadLinkedInLibrary = () => {
    if (document.getElementById(LINKEDIN_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = LINKEDIN_SCRIPT_ID;
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);
  };

  const removeLinkedInLibrary = () => {
    const script = document.getElementById(LINKEDIN_SCRIPT_ID);
    if (script) {
      script.remove();
    }
  };

  const updateLinkedInConsent = (value) => {
    if (value === 'accepted') {
      ensureLinkedInGlobals();
      loadLinkedInLibrary();
      return;
    }

    removeLinkedInLibrary();
  };

  const applyInitialPreference = () => {
    const initialPreference = window.__cookieConsentPreference;
    if (initialPreference) {
      updateLinkedInConsent(initialPreference);
    } else {
      updateLinkedInConsent('declined');
    }
  };

  document.addEventListener('cookie-consent-change', (event) => {
    const preference = event && event.detail ? event.detail.value : undefined;
    if (!preference) return;
    updateLinkedInConsent(preference);
  });

  applyInitialPreference();
}
