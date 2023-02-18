//This code imports the necessary modules and creates an Express.js router with a single GET endpoint '/api/notes'. When a GET request is received at this endpoint, the 'notesData' from the 'db.json' file is returned as a JSON response.
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

router.get('/api/notes', async (req, res) => {
    let notesData = await getNotes()
    res.json(notesData)
});

async function getNotes() {
    let notesDataPath = path.join(__dirname, '../db/db.json');
    let data = await fs.readFile(notesDataPath, 'utf8')
    return JSON.parse(data)
}

router.post('/api/notes', async (req, res) => {
    let notesDataPath = path.join(__dirname, '../db/db.json');
    let createNote = req.body;

    createNote.id = uuidv4();
    let notesData = await getNotes();
    notesData.push(createNote);
    fs.writeFile(notesDataPath, JSON.stringify(notesData), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('Your note has been created!');
    });
    res.json(createNote);
});

router.delete('/api/notes/:id', async (req, res) => {
    let notesDataPath = path.join(__dirname, '../db/db.json');
    let notesData = await getNotes();
    let deletedNotes = []
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].id == req.params.id) {
            deletedNotes = notesData.splice(i, 1);
            break;
        }
    }

    await fs.writeFile(notesDataPath, JSON.stringify(notesData), );
    res.json(deletedNotes)

})

module.exports = router;

