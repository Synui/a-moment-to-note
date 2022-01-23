const fs = require('fs');
const path = require('path');

const getNotes = () => {
    let noteArray = fs.readFileSync(
        path.join(__dirname, '../db/db.json'), 'utf8');
        return JSON.parse(noteArray);
};

function nextId(NotesArray) {
    let i = 0;

    let nextNotes = [];

    NotesArray.forEach((note) => {
        note.id = i.toString();
        i++;
        nextNotes.push(note); 
    });
    return nextNotes;
}

const createNotes = (newNote) => {
    let NotesArray = getNotes();

    NotesArray.notes.push(newNote);

    const nextNotes = nextId(NotesArray.notes);

    fs.writeFileSync(
        path.join(__dirname, '..db/db.json'),
        JSON.stringify({ notes: nextNotes })
    );
    return nextNotes;
};

const deleteNotes = (id) => {
    let notesArray = getNotes();

    notes = [];

    notesArray.notes.filter((note) => {
        if (note.id !== id) {
            notes.push(note);
        }
    });

    const nextNotes = nextId(notes);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: nextNotes})
    );
    return nextNotes;
};

module.exports = {
    getNotes,
    nextId,
    createNotes,
    deleteNotes
};