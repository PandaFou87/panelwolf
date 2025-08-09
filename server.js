const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'wolf-secret',
    resave: false,
    saveUninitialized: true
}));
app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 50
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Page d'accueil
app.get('/', (req, res) => {
    res.render('index', { botName: 'Wolf' });
});

// Exemple route config tickets
app.get('/tickets', (req, res) => {
    res.render('tickets', { config: { salon: 'Salon Tickets', couleur: '#ff0000' } });
});

app.listen(PORT, () => {
    console.log(`[Panel] en ligne sur le port ${PORT}`);
});
