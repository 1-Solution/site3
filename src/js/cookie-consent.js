const STORAGE_KEY = 'cookie-consent-preference';

const showBanner = (banner) => {
  banner.classList.remove('hidden');
  requestAnimationFrame(() => {
    banner.classList.remove('opacity-0', 'translate-y-4');
  });
};

const hideBanner = (banner) => {
  banner.classList.add('opacity-0', 'translate-y-4');
  const handleTransitionEnd = () => {
    banner.classList.add('hidden');
    banner.removeEventListener('transitionend', handleTransitionEnd);
  };
  banner.addEventListener('transitionend', handleTransitionEnd);
};

const initCookieConsent = () => {
  const banner = document.querySelector('[data-cookie-consent]');
  if (!banner) return;

  const storedPreference = window.localStorage.getItem(STORAGE_KEY);

  if (!storedPreference) {
    showBanner(banner);
  }

  const savePreference = (value) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    hideBanner(banner);
  };

  const acceptButton = banner.querySelector('[data-cookie-accept]');
  const declineButton = banner.querySelector('[data-cookie-decline]');

  if (acceptButton) {
    acceptButton.addEventListener('click', () => {
      savePreference('accepted');
    });
  }

  if (declineButton) {
    declineButton.addEventListener('click', () => {
      savePreference('declined');
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}
