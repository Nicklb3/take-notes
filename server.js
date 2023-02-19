const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');



app.use(express.static('public'));

//parse incoming JSON data
app.use(express.json());

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// apiRoutes
app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});