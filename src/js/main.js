import './contact';
import './mobile-menu';
import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    lng: 'fr', 
    fallbackLng: 'fr',
    supportedLngs: ['fr','en'],
    debug: true,
    ns: ['about', 'hero', 'menu', 'features', 'optimize', 'partners', 'team', 'careers', 'logos', 'contact'],
    defaultNS: 'hero',
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  })
  .then(() => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n')
      el.innerHTML = i18next.t(key)
    })
  })

document.getElementById('lang-switcher')
  .addEventListener('change', e => {
    i18next.changeLanguage(e.target.value)
      .then(() => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          el.innerHTML = i18next.t(el.dataset.i18n)
        })
      })
  })