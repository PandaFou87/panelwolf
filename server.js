const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // ✅

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'wolf-secret', resave: false, saveUninitialized: true }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 50 }));

// Static (pour images/logo si tu veux)
app.use('/public', express.static(path.join(__dirname, 'public')));

// EJS + Layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);                    // ✅ active express-ejs-layouts
app.set('layout', 'layout');                // ✅ views/layout.ejs

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil', botName: 'Wolf' });
});

app.get('/tickets', (req, res) => {
  // Données d’exemple (tu brancheras sur ta vraie config ensuite)
  res.render('tickets', {
    title: 'Tickets',
    config: { salon: '1380454863808368660', couleur: '#2b82f6', roles: '123,456' }
  });
});

app.listen(PORT, () => {
  console.log(`[Panel] en ligne sur le port ${PORT}`);
});
