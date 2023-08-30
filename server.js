const express = require('express');
const path = require('path');
const noteData = require('./db/db.json')

const api = require('./routes/index')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', api)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('api/notes', (req, res) => res.json(noteData))

app.listen(PORT, () => console.info(`App listening on port ${PORT}`));