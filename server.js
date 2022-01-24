const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const express = require('express');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware that makes certain files readily available and to not gate it behind a server endpoint
app.use(express.static('public'));
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());
// Routes

app.get('/api/notes', (req, res) => {
    res.sendFile(
        path.join(__dirname, './db/db.json')
    )
});

app.post('/api/notes', (req, res) => {
    // console.info(`${req.method}`);

    const { title, text } = req.body

    // console.info(`${JSON.stringify(req.body)}`);

    let newData = {};

    if (title && text) {
        const newNote = {
            id: uuid.v4(),
            title,
            text
        }

        newData = {
            status: 'success',
            body: JSON.stringify(newNote),
        };
        fs.readFile('./db/db.json', function (err, data) {
            if (err) throw err

            const parsedData = JSON.parse(data);

            parsedData.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 2), function(err) {
                if (err) throw err

                console.log('Success')
            });
        });
        return res.json(newData)
    }
    else {
        res.json(`ERROR ${JSON.stringify(req.body)}`);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});