const express = require('express');
const bodyParser = require('body-parser');
let cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://convertisseur.mia-services.fr'

    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', require('./routes/convertDocsToPdfRoute'))
app.use('/api', require('./routes/convertPdfToDocsRoute'));

app.listen(5500, '0.0.0.0', () => {
    console.log('Server running on port 5500');
});