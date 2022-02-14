const connection = require('./conn');
let dotenv = require('dotenv');
let env = dotenv.config();
const moment = require('moment');

let pasien = {
    getDataPasien : async(req, res) => {
        let nik = req.query.nik
        console.log(nik);
        try {
            //JOIN detail
            let qry =  `SELECT * FROM pasien WHERE NIK = ${nik};`;
            console.log(qry);
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
    getAllDataPasien : async(req, res) => {
        try {
            //JOIN detail
            let qry =  `SELECT * FROM pasien`
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
        let IDPasien = req.body.IDPasien
        let tglPenerimaan = req.body.tglPenerimaan
        let waktuPenerimaan = req.body.waktuPenerimaan
        let tglPemeriksaan = req.body.tglPemeriksaan
        let pengirim = req.body.pengirim
        let namaPasien = req.body.namaPasien
        let NIK = req.body.NIK
        let tglLahir = req.body.tglLahir
        let jenisSpecimen = req.body.jenisSpecimen
        let pemeriksaan = req.body.pemeriksaan

        try {
            let qry = `INSERT INTO pasien (IDPasien, tglPenerimaan, waktuPenerimaan,tglPemeriksaan, pengirim, namaPasien,NIK, tglLahir, jenisSpecimen, pemeriksaan) 
            VALUES ('${IDPasien}','${tglPenerimaan}','${waktuPenerimaan}','${tglPemeriksaan}','${pengirim}','${namaPasien}','${NIK}','${tglLahir}','${jenisSpecimen}','${pemeriksaan}')`;

            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `data ${namaPasien} berhasil di input.`
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
    updateDataPasien : async(req, res) => {
        let IDPasien = req.body.IDPasien
        let tglPenerimaan = req.body.tglPenerimaan
        let waktuPenerimaan = req.body.waktuPenerimaan
        let tglPemeriksaan = req.body.tglPemeriksaan
        let pengirim = req.body.pengirim
        let namaPasien = req.body.namaPasien
        let NIK = req.body.NIK
        let tglLahir = req.body.tglLahir
        let jenisSpecimen = req.body.jenisSpecimen
        let pemeriksaan = req.body.pemeriksaan

        try {
            let qry = `UPDATE pasien
                        SET tglPenerimaan = '${tglPenerimaan}', waktuPenerimaan = '${waktuPenerimaan}',
                        tglPemeriksaan = '${tglPemeriksaan}', pengirim = '${pengirim}',
                        namaPasien = '${namaPasien}' ,NIK = '${NIK}', tglLahir = '${tglLahir}',
                         jenisSpecimen = '${jenisSpecimen}', pemeriksaan = '${pemeriksaan}'
                        WHERE IDPasien='${IDPasien}'`;
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `data ID : ${IDPasien} berhasil di update.`
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
    deleteDataPasien : async(req, res) => {
        let IDPasien = req.body.IDPasien
        try {
            let qry = `DELETE FROM pasien WHERE IDPasien='${IDPasien}'`;

            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `data ID : ${IDPasien} berhasil di hapus.`
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
let QR = {
    generateLink : async(req, res) => {
        let IDPasien = req.body.IDPasien
        let tglPenerimaan = req.body.tglPenerimaan
        let waktuPenerimaan = req.body.waktuPenerimaan
        let tglPemeriksaan = req.body.tglPemeriksaan
        let pengirim = req.body.pengirim
        let namaPasien = req.body.namaPasien
        let NIK = req.body.NIK
        let tglLahir = req.body.tglLahir
        let jenisSpecimen = req.body.jenisSpecimen
        let pemeriksaan = req.body.pemeriksaan

        try {
            let qry = `CALL generateLink ('${IDPasien}','${tglPenerimaan}','${waktuPenerimaan}','${tglPemeriksaan}','${pengirim}','${namaPasien}','${NIK}','${tglLahir}','${jenisSpecimen}','${pemeriksaan}')`;

            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `data ${namaPasien} berhasil di generate`,
                link: `8.215.37.21:5021/globaldoctor/pasien/getDataPasien?nik=${NIK}`
            };
            res.status(200).send(response)
            return hasil

        } catch (error) {
        }
    },
    callData : async(req, res) => {
        let NIK = req.params.NIK
        console.log(NIK);
        // param ngapa ga bisa ya?

        try {
            let qry = `SELECT * FROM pasien WHERE NIK ='${NIK}'`
            //join
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `success`,
                data:hasil
            };
            res.status(200).send(response)
            return hasil

        } catch (error) {
        }
    },
}
let user = {
    updateDataUser : async(req, res) => {
        let NoPegawai = req.body.NoPegawai
        let username = req.body.username
        let password = req.body.password

        try {
            let qry = `UPDATE user
                        SET username = '${username}', password = '${password}'
                        WHERE NoPegawai='${NoPegawai}'`;
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `data NoPegawai : ${NoPegawai} berhasil di update.`
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
    login : async(req, res) => {
        let username = req.body.username
        let password = req.body.password

        try {
            let qry = `CALL login('${username}','${password}') `;
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `succes login`,
                data:username
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
module.exports = {pasien, QR, user}