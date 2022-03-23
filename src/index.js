const express = require('express');

const app = express();

require('./app/database');

const routes = require('./routes');

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static('uploads')); // deixa os arquivos dessa pasta acessáveis
app.use('/images', express.static('images')); // deixa os arquivos dessa pasta acessáveis

app.listen(3000);