const express = require('express');
const router = express.Router();
const control = require('./controller')


// Pasien
router.get('/globaldoctor/pasien/getAllDataPasien', control.pasien.getAllDataPasien)
router.get('/globaldoctor/pasien/getDataPasien', control.pasien.getDataPasien)
router.post('/globaldoctor/pasien/addDataPasien', control.pasien.addDataPasien)
router.post('/globaldoctor/pasien/updateDataPasien', control.pasien.updateDataPasien)
router.post('/globaldoctor/pasien/deleteDataPasien', control.pasien.deleteDataPasien)

// QRCode
router.post('/globaldoctor/qr/generateQRlink',control.QR.generateLink)
router.get('/globaldoctor/qr/callData',control.QR.callData)
// User
router.post('/globaldoctor/user/updateDataUser', control.user.updateDataUser)
router.post('/globaldoctor/user/login', control.user.login)

module.exports = router;