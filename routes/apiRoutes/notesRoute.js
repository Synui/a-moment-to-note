const router = require('express').Router();
const {
    getNotes,
    nextId,
    createNotes,
    deleteNotes
} = require('../../lib/notes');

router.get('/notes', (req, res) => {
    let note = getNotes();
    res.json(note.notes);
});

router.post('/notes', (req, res) => {
    const note = createNotes(req.body.note);
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    const params = req.params.id;

    const note = deleteNotes(params);

    console.log(note);
    res.json(note);
});

module.exports = router;