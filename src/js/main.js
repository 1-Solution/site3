import './contact';
import './mobile-menu';
import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr','en'],
    debug: true,
    ns: ['about', 'hero', 'header', 'features', 'optimize', 'partners', 'perks', 'team', 'careers', 'connect', 'contact', 'footer'],
    defaultNS: 'about',
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  })
  .then(() => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n')
      el.innerHTML = i18next.t(key)
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', i18next.t(key));
    });
  })