const express = require('express');
const router = express.Router();
const pasien = require('./controller')


router.post('/globaldoctor/pasien/getDataPasien', pasien.getDataPasien)

module.exports = router;