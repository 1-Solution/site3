import './contact';
import './mobile-menu';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    debug: true,
    ns: [
      'hero',
      'header',
      'services',
      'optimize',
      'partners',
      'values',
      'team',
      'careers',
      'connect',
      'contact',
      'footer',
      'focus',
      'recrute',
      'discuss',
      'work',
      'cv',
      'job',
      'meta',
    ],
    defaultNS: 'hero',
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  })
  .then(() => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = i18next.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', i18next.t(key));
    });

    // Update meta tags content attributes
    document.querySelectorAll('meta[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.setAttribute('content', i18next.t(key));
    });

    // Update title tag
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      titleEl.textContent = i18next.t(key);
    }

    // Update Open Graph and Twitter meta tags
    document
      .querySelectorAll('meta[property][data-i18n], meta[name][data-i18n]')
      .forEach((el) => {
        const key = el.getAttribute('data-i18n');
        el.setAttribute('content', i18next.t(key));
      });
  });
