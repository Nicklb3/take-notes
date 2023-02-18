//Imports the necessary modules and creates an Express.js router with a single GET endpoint '/api/notes'. When a GET request is received at this endpoint, the 'notesData' from the 'db.json' file is returned as a JSON response.
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


// Creates a POST endpoint '/api/notes' in an Express.js router. When a POST request is received at this endpoint, it extracts the request body and adds a unique ID to it using the uuid module. The updated data is then added to the notesData array and saved to the 'db.json' file. Finally, the created note is returned as a JSON response.
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

// Creates a DELETE endpoint '/api/notes/:id' in an Express.js router. When a DELETE request is received at this endpoint with an id parameter, it searches the notesData array for a note with a matching ID and removes it. The updated notesData array is then written to the 'db.json' file.
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


    // Writes the notesData array to a file using the synchronous version of fs.writeFile, fs.writeFileSync, and returns the updated notesData as a JSON response. If the write operation fails, an error message is logged to the console.
    await fs.writeFile(notesDataPath, JSON.stringify(notesData), );
    res.json(deletedNotes)

})

module.exports = router;

