/* Import required modules for building a web application using the Express framework
   express: The Express framework
   router: An instance of the Express Router, used as middleware
   path: The path module, used for handling and transforming file paths
*/
const express = require('express');
const router = express.Router();
const path = require('path');

//This code exports an Express.js router with two GET endpoints: '/notes' and '/'. When a GET request is received at either endpoint, the corresponding HTML file in the 'public' directory is sent as the response.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../pulbic/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pulbic/index.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../pulbic/index.html'));
});

module.exports = router;