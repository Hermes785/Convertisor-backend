const express = require('express')
const { convertPdfToDocxs, tes } = require('../ConvertPdfToDocx')
const { sendRequestIdAfterUpload } = require('../requestIdController')


const router = express.Router()

router.post('/convertPdfToDocx', sendRequestIdAfterUpload)

router.get('/test', tes)

module.exports = router