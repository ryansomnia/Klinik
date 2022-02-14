const express = require('express');
const router = express.Router();
const control = require('./controller')


// Pasien
router.post('/globaldoctor/pasien/getDataPasien', control.pasien.getDataPasien)
router.post('/globaldoctor/pasien/addDataPasien', control.pasien.addDataPasien)
router.post('/globaldoctor/pasien/updateDataPasien', control.pasien.updateDataPasien)
router.post('/globaldoctor/pasien/deleteDataPasien', control.pasien.deleteDataPasien)

// QRCode
router.post('/globaldoctor/pasien/generateQRlink',control.QR.generateLink)
router.get('/globaldoctor/pasien/callData',control.QR.callData)
// User
router.post('/globaldoctor/pasien/updateDataUser', control.user.updateDataUser)

module.exports = router;