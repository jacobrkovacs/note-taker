const notes = require('express').Router();
const uuid = require('../helper/uuid')
let data = require('../db/db.json')

const { readFromFile, readAndAppend, readAndDelete} = require('../helper/fsUtils.js');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    const { title, text } = req.body

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
        readAndAppend(newNote, './db/db.json')
        res.json('Note added succesfully')
    } else {
        res.error('Note add unsuccesful')
    }
});

notes.delete('/:id', (req, res) => {
    if (req.params.id) {
        readAndDelete(req.params.id,'./db/db.json')
        res.json('Note deleted succesfully')
    }
    
});

module.exports = notes;