const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const {
    validateNotes,
    createNotes,
} = require('../lib/notes');
const { notes } = require('../db/db.json')

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }
    if (!validateNotes(newNote)) {
        return res.status(400).send('The note is not properly formatted.');
    }
    else {
        createNotes(newNote, notes)
        res.json(notes);
    }
});

module.exports = router;