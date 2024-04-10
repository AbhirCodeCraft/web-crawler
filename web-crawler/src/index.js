const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./configs/database');
const crawler = require('./scripts/crawler');
const getAll = require('./scripts/getAll');
const getById = require('./scripts/getById');
const deleteClient = require('./scripts/delete');
const updateClient = require('./scripts/update');
const addClient = require('./scripts/addClient');

const port = 3005;
app.use(cors());
app.use(express.json());

app.get('/crawler', (req, res) => crawler(req, res, db));
app.get('/clients', (req, res) => getAll(req, res, db));
app.get('/clients/:id', (req, res) => getById(req, res, db));

app.delete('/clients/:id', (req, res) => deleteClient(req, res, db));

app.post('/clients/:id', (req, res) => updateClient(req, res, db));
app.post('/clients', (req, res) => addClient(req, res, db));

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
