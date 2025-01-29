const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api', require('./routes/convertDocsToPdfRoute'))
app.use('/api', require('./routes/convertPdfToDocsRoute'));

app.listen(5500, () => {
    console.log('Server running on port 5500');
});