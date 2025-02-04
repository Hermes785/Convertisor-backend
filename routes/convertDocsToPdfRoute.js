
const express = require('express')
const { ConvertDocxsToPdf } = require('../CovertDocsToPdf')
const { sendRequestIdAfterUpload } = require('../requestIdController')
const router = express.Router()

router.post('/convertDocxsToPdf', sendRequestIdAfterUpload)

module.exports = router