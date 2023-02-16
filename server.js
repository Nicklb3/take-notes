const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.static('public'));

// parse incoming JSON data
app.use(express.json());

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});