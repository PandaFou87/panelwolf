const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

// Static (si tu veux mettre des images dans /public)
app.use('/public', express.static(path.join(__dirname, 'public')));

// EJS + Layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Thème par défaut (rouge) dispo dans toutes les vues
app.use((req, res, next) => {
  res.locals.theme = {
    brand: 'Wolf',
    accent: '#dc2626', // rouge
    mode: 'dark',
    radius: 14,
    logo: ''
  };
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil', botName: 'Wolf' });
});

app.get('/tickets', (req, res) => {
  res.render('tickets', {
    title: 'Tickets',
    config: { salon: '1380454863808368660', couleur: '#dc2626', roles: '123,456' }
  });
});

// Page placeholder Suggestions pour éviter les 404 si tu cliques dessus
app.get('/suggestions', (req, res) => {
  res.send('<div style="padding:24px;font-family:system-ui">Suggestions — bientôt ✨ <a href="/">← retour</a></div>');
});

app.listen(PORT, () => {
  console.log(`[Panel] en ligne sur le port ${PORT}`);
});
