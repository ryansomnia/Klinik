const connection = require('./conn');
let dotenv = require('dotenv');
let env = dotenv.config();
const moment = require('moment');

let pasien = {
    getDataPasien : async(req, res) => {
        let nik = req.body.nik
        try {
            let qry =  `SELECT * FROM dataPasien WHERE NIK = ${nik}`
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: 'success',
                data: hasil
            };
            res.status(200).send(response)
            return hasil
        } catch (error) {
            console.log(error);
            let response = {
                code: 400,
                message: 'error',
                data: error
            };
            res.status(400).send(response)
        }
    },
    addDataPasien : async(req, res) => {
        let nik = req.body.nik
        
        try {
            let qry =  `SELECT * FROM dataPasien WHERE NIK = ${nik}`
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: 'success',
                data: hasil
            };
            res.status(200).send(response)
            return hasil
        } catch (error) {
            console.log(error);
            let response = {
                code: 400,
                message: 'error',
                data: error
            };
            res.status(400).send(response)
        }
    },
    
}

module.exports = pasien