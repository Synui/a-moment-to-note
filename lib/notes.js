const fs = require('fs');
const path = require('path');

const validateNotes = newNote => {
    if (!newNote.title || typeof newNote.title !== 'string') {
        console.group('error')
        return false;
    }
    if (!newNote.text || typeof newNote.text !== 'string') {
        console.log('error 1')
        return false;
    }
    return true
};

const createNotes = (newNote, notes) => {
    notes.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes}, null, 2)
    );
    return notes;
};

module.exports = {
    validateNotes,
    createNotes
};