const express = require('express');
const bodyParser = require('body-parser');
const { dataBase } = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api', require('./routes/convertDocsToPdfRoute'))
app.use('/api', require('./routes/convertPdfToDocsRoute'));

app.listen(5500, '0.0.0.0', () => {
    console.log('Server running on port 5500');
});