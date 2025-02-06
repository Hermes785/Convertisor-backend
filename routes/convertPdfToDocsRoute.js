const express = require('express')
const { convertPdfToDocxs, tes } = require('../ConvertPdfToDocx')
const { sendRequestIdAfterUpload } = require('../requestIdController')
const { dowloadFileAfterConvertionCOntroller } = require('../dowloadFileAfterConvertionContoller')


const router = express.Router()

router.post('/convertPdfToDocx', sendRequestIdAfterUpload)

router.get('/urlFile/:requestId', dowloadFileAfterConvertionCOntroller)

router.get('/test', tes)

module.exports = router