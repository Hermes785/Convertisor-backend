
const express = require('express')
const { ConvertDocxsToPdf } = require('../CovertDocsToPdf')
const router = express.Router()

router.post('/convertDocxsToPdf', ConvertDocxsToPdf)

module.exports = router