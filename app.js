const express = require('express');
const path = require('path');
const fs = require('fs');
let app = express();
const dotenv = require('dotenv');

dotenv.config();

/**
 * Define os cabeçalhos em comum em todas as requisições, os quais impedem erros relacionados ao CORS policy.
 */
app.use((_, res, next) => {
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    next();
});

app.use(
    express.urlencoded({
        extended: false,
        limit: '10mb',
    }),
);

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

app.use('/public', express.static(`${__dirname}/public`));
app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')));

// Função para carregar dinamicamente os arquivos de rotas
const loadRoutes = (directory) => {
    fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.join(directory, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            // Recursivamente carrega subdiretórios
            loadRoutes(fullPath);
        } else if (file.endsWith('.js')) {
            // Carrega apenas arquivos .js
            const route = require(fullPath);
            app.use(route);
        }
    });
};

loadRoutes(path.join(__dirname, 'src/module/receyecle/api/v1/rest'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.set('view engine', 'ejs');
app.set('views', '.');

module.exports = app;
