# Portfolio One - Multilingual Business Website

A modern, responsive business website built with Vite, Handlebars, and Tailwind CSS, featuring full internationalization support and a component-based architecture.

## 📋 TODO

### 🚨 High Priority

- [ ] Fix form submissions with powerautomate pipeline => done when migrating to new netlify
- [ ] Ajouter les cookies de navigation et les popup relevant

## ✨ Features

- **🌍 Multilingual Support** - Full internationalization with French and English
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🧩 Component-Based Architecture** - Modular partials and reusable components
- **⚡ Fast Development** - Vite for lightning-fast builds and hot reload
- **📝 Contact Forms** - Netlify-ready form handling
- **🎨 Custom Styling** - Tailwind CSS with custom brand colors
- **📄 Multi-Page Support** - Individual pages for different sections

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd site3

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── data/              # JSON data files for content
│   ├── careers.json
│   ├── menu.json
│   ├── sections-*.json
│   └── ...
├── js/                # JavaScript modules
│   ├── main.js        # Main entry point
│   ├── contact.js     # Contact form handling
│   └── mobile-menu.js # Mobile navigation
├── pages/             # HTML page templates
│   ├── index.html
│   ├── careers.html
│   ├── contact.html
│   └── services.html
├── partials/          # Reusable HTML components
│   ├── header.html
│   ├── footer.html
│   ├── section-*.html
│   └── icons/
└── styles/            # CSS files
    ├── main.css
    ├── custom.css
    └── ...

public/
├── images/            # Static images
├── locales/           # Translation files
│   ├── en/           # English translations
│   └── fr/           # French translations
└── content/          # Static content files
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

### Adding New Pages

1. Create a new HTML file in `src/pages/`
2. Add the page to `vite.config.js` in the `rollupOptions.input` object
3. Create corresponding data files in `src/data/` if needed
4. Update navigation in `src/data/menu.json`

Example:

```javascript
// vite.config.js
input: {
  // existing pages...
  newpage: path.resolve(__dirname, 'src/pages/newpage.html'),
}
```

### Creating New Sections

1. Create a new partial in `src/partials/section-[name].html`
2. Add section data to appropriate `src/data/sections-*.json` file
3. Add translations to `public/locales/en/` and `public/locales/fr/`

### Internationalization

The project uses i18next for translations:

- **Translation files**: `public/locales/{lang}/{namespace}.json`
- **Usage in HTML**: `data-i18n="namespace:key"`
- **Placeholders**: `data-i18n-placeholder="namespace:key"`

Example:

```html
<h1 data-i18n="hero:title"></h1>
<input data-i18n-placeholder="contact:form-name" />
```

## 🍪 Cookie consent & Google tags

The cookie consent banner records the visitor's choice in `localStorage` under the
`cookie-consent-preference` key and exposes it globally as `window.__cookieConsentPreference`.
Every time the preference changes a `cookie-consent-change` custom event is dispatched with the
current value (`accepted` or `declined`) so additional scripts can react accordingly.

For Google Analytics / Google Tag Manager integrations:

1. Declare the measurement IDs before `src/js/main.js` loads, for example in the page `<head>`:

   ```html
   <script>
     window.GTAG_MEASUREMENT_IDS = ['G-XXXXXXX'];
   </script>
   ```

2. The `src/js/google-tags.js` module automatically listens to the consent events. When visitors
   accept, it injects the Google tag script, initialises the `dataLayer`, and configures all
   declared IDs with IP anonymisation.
3. When visitors decline, the module prevents Google tags from firing by removing the injected
   script, setting `window['ga-disable-&lt;ID&gt;'] = true` for each measurement ID, and keeping Google
   consent signals in the `denied` state. No additional action is required on your part.

If you need to handle other third-party tools, hook into the `cookie-consent-change` event:

```js
document.addEventListener('cookie-consent-change', (event) => {
  if (event.detail.value === 'declined') {
    // pause or disable additional tracking pixels here
  }
});
```

For LinkedIn Insight Tag integrations:

1. Declare the partner IDs before `src/js/main.js` loads, for example in the page `<head>`:

   ```html
   <script>
     window.LINKEDIN_PARTNER_IDS = ['8366626'];
   </script>
   ```

2. The `src/js/linkedin-tags.js` module listens to the same consent events and injects the LinkedIn
   Insight Tag only after visitors accept tracking.
3. If visitors decline, or later revoke consent, the LinkedIn script is removed and no new Insight
   Tag library loads are triggered.

## 🎨 Styling

### Tailwind Configuration

Custom brand colors are defined in `tailwind.config.js`:

- `brand-blue`: #0C2830
- `brand-orange`: #42B5C5

### CSS Structure

- `main.css` - Main Tailwind imports and base styles
- `custom.css` - Custom component styles
- `animations.css` - Animation definitions
- `button.css` - Button component styles
- `mobile-menu.css` - Mobile navigation styles
- `navbar.css` - Navigation styles

## 📝 Contact Forms

Forms are configured for Netlify deployment with the `netlify` attribute:

```html
<form name="contact" netlify>
  <!-- form fields -->
</form>
```

**Note**: Forms only work when deployed to Netlify. For local development, form submissions will result in 404 errors.

## 🌍 Language Support

Currently supports:

- **French (fr)** - Default language
- **English (en)**

Languages are auto-detected based on browser settings, with French as fallback.

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Forms will be automatically handled by Netlify

### Manual Deployment

Build the project and upload the `dist` folder to your web server:

```bash
npm run build
# Upload dist/ folder contents
```

## 🔧 Configuration

### Vite Configuration

Key features enabled in `vite.config.js`:

- Handlebars templating with partials support
- Tailwind CSS integration
- Hot reload for partials changes
- Multi-page build configuration
- Automatic data loading from JSON files

### Data-Driven Content

Content is managed through JSON files in `src/data/`:

- `sections-*.json` - Define which sections appear on each page
- `menu.json` - Navigation structure
- `careers.json`, `team.json`, etc. - Page-specific content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Format code: `npm run format`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Open a pull request

## 📄 License

ISC License - see package.json for details.

## 🆘 Support

For questions or issues, please contact info@1-solution.ca or open an issue in the repository.
