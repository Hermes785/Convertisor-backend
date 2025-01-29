const express = require('express')
const { convertPdfToDocxs, tes } = require('../ConvertPdfToDocx')


const router = express.Router()

router.post('/convertPdfToDocx', convertPdfToDocxs)

router.get('/test', tes)

module.exports = router