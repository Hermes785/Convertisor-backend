const express = require('express')
const { convertPdfToDocxs } = require('../ConvertPdfToDocx')

const router = express.Router()

router.post('/convertPdfToDocx', convertPdfToDocxs)

module.exports = router