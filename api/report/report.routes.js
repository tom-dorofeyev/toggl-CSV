const express = require('express');
const { query } = require('./report.controller')

const router = express.Router()
module.exports = router

//REPORT
router.get('/', query)

