const notes = require('express').Router();
const uuid = require('../helper/uuid')

const { readFromFile, readAndAppend, readAndDelete} = require('../helper/fsUtils.js');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    const { title, text, noteId} = req.body

    if (req.body) {
        const newNote = {
            title,
            text,
            noteId: uuid()
        };

        readAndAppend(newNote, './db/db.json')
        res.json('Note added succesfully')
    } else {
        res.error('Note add unsuccesful')
    }
});

notes.delete('/:id', (req, res) => {
    const { title, text, noteId } = req.body

    if (req.body) {
        const deleteNote = {
            title,
            text,
            noteId,
        };
        readAndDelete(deleteNote, './db/db.json')
        res.json('Note delete succesful')
    } else {
        res.error('Note delete unsuccesful')
    }
})

module.exports = notes;