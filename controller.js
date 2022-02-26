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
    validatePasien : async(req, res) => {
        let nik = req.body.nik
        let tglLahir = req.body.tglLahir
        
        try {
            
            let qry =  `SELECT pasien.tglPenerimaan, pasien.waktuPenerimaan, pasien.tglPemeriksaan, pasien.pengirim, pasien.namaPasien,
            pasien.NIK, pasien.tglLahir, pasien.jenisSpecimen, pasien.pemeriksaan,
           detailDokumen.geneTarget, detailDokumen.nilaiCT,
           kesimpulanPemeriksaan.kesimpulan
           FROM pasien
           INNER JOIN detailDokumen ON pasien.IDPasien = detailDokumen.IDPasien
           INNER JOIN kesimpulanPemeriksaan ON pasien.IDPasien = kesimpulanPemeriksaan.idPasien
            WHERE pasien.NIK = '${nik}' AND pasien.tglLahir='${tglLahir}';`;
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
        if (IDPasien == 0 || IDPasien == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'IDPasien tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let tglPenerimaan = req.body.tglPenerimaan
        if (tglPenerimaan == 0 || tglPenerimaan == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'tgl Penerimaan tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let waktuPenerimaan = req.body.waktuPenerimaan
        if (waktuPenerimaan == 0 || waktuPenerimaan == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'waktu Penerimaan tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let tglPemeriksaan = req.body.tglPemeriksaan
        if (tglPemeriksaan == 0 || tglPemeriksaan == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'tgl Pemeriksaan tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let pengirim = req.body.pengirim
        if (pengirim == 0 || pengirim == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'pengirim tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let namaPasien = req.body.namaPasien
        if (namaPasien == 0 || namaPasien == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'nama pasien tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let NIK = req.body.NIK
        if (NIK == 0 || NIK == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'NIK tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let tglLahir = req.body.tglLahir
        if (tglLahir == 0 || tglLahir == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'tgl lahir tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let jenisSpecimen = req.body.jenisSpecimen
        if (jenisSpecimen == 0 || jenisSpecimen == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'jenis specimen tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let pemeriksaan = req.body.pemeriksaan
        if (pemeriksaan == 0 || pemeriksaan == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'pemeriksaan tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

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
        let NIK = req.body.NIK
        try {
            let qry = `SELECT * FROM pasien WHERE NIK='${NIK}'`;
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `data ${NIK} berhasil di generate`,
                link: `8.215.37.21:5021/globaldoctor/pasien/getDataPasien?nik=${NIK}`
            };
            res.status(200).send(response)
            return hasil

        } catch (e) {
            let err = {
                code: 400,
                message: `data ${NIK} tidak ditemukan`,
                error:e
            };
            res.status(400).send(err)
            return err

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
    addAdmin : async(req, res) => {
        let NoPegawai = req.body.NoPegawai
        let namaDepan = req.body.namaDepan
        let namaBelakang = req.body.namaBelakang
        let username = req.body.username
        let password = req.body.password

        try {
            let qry = `INSERT INTO user (NoPegawai, namaDepan, namaBelakang,username, password,jabatan, status) 
            VALUES (${NoPegawai},${namaDepan},${namaBelakang},${username},${password},'admin','aktif');`;
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `success menambah admin ${username}`,
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
    resetPass : async(req, res) => {
        let username = req.body.username
        let password = req.body.password
        let newPassword = req.body.newPassword

        try {
            let qry = `CALL resetPass('${username}','${password}','${newPassword}')`;
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `success menambah admin ${username}`,
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