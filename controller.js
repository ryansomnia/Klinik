const connection = require('./conn');
let dotenv = require('dotenv');
let env = dotenv.config();
const moment = require('moment');

let pasien = {
    getDataPasien : async(req, res) => {
        let nik = req.query.nik
        if (nik == 0 || nik == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'nik tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

        try {let qry =
          `SELECT tglPenerimaan, waktuPenerimaan, tglPemeriksaan, pengirim, namaPasien,
          NIK, tglLahir, jenisSpecimen, pemeriksaan,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('geneTarget', geneTarget, 'nilaiCT',nilaiCT)) FROM detailDokumen INNER JOIN pasien 
                  ON pasien.IDPasien = detailDokumen.IDPasien ) 
            as detailDokumen,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('kesimpulan', kesimpulan)) from kesimpulanPemeriksaan INNER JOIN pasien 
                  ON pasien.IDPasien =  kesimpulanPemeriksaan.IDPasien) 
            as kesimpulanPemeriksaan 
            FROM pasien
         WHERE pasien.NIK = '${nik}';`
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
        if (nik == 0 || nik == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'nik tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let tglLahir = req.body.tglLahir
        if (tglLahir == 0 || tglLahir == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'tgl Lahir tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        
        try {
            
            let qry =  `SELECT tglPenerimaan, waktuPenerimaan, tglPemeriksaan, pengirim, namaPasien,
             NIK, tglLahir, jenisSpecimen, pemeriksaan,
               (SELECT JSON_ARRAYAGG(JSON_OBJECT('geneTarget', geneTarget, 'nilaiCT',nilaiCT)) FROM detailDokumen INNER JOIN pasien 
                     ON pasien.IDPasien = detailDokumen.IDPasien ) 
               as detailDokumen,
               (SELECT JSON_ARRAYAGG(JSON_OBJECT('kesimpulan', kesimpulan)) from kesimpulanPemeriksaan INNER JOIN pasien 
                     ON pasien.IDPasien =  kesimpulanPemeriksaan.IDPasien) 
               as kesimpulanPemeriksaan 
               FROM pasien
            WHERE pasien.NIK = '${nik}' AND pasien.tglLahir='${tglLahir}';`;
         
            let hasil = await connection.execQry(qry)
            console.log(hasil);
            let response = {
                code: 200,
                message: 'success',
                data: nik
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
            let qry =  `SELECT pasien.IDPasien, pasien.tglPenerimaan, pasien.waktuPenerimaan, pasien.tglPemeriksaan, pasien.pengirim, pasien.namaPasien,
            pasien.NIK, pasien.tglLahir, pasien.jenisSpecimen, pasien.pemeriksaan,
           detailDokumen.geneTarget, detailDokumen.nilaiCT,
           kesimpulanPemeriksaan.kesimpulan
           FROM pasien
           INNER JOIN detailDokumen ON pasien.IDPasien = detailDokumen.IDPasien
           INNER JOIN kesimpulanPemeriksaan ON pasien.IDPasien = kesimpulanPemeriksaan.idPasien`
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
                error:'Waktu Penerimaan tidak terisi'
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
                error:'Nama Pasien tidak terisi'
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
                error:'tgl Lahir tidak terisi'
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
        if (IDPasien == 0 || IDPasien == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'IDPasien tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
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
    // generateLink : async(req, res) => {
    //     let NIK = req.body.NIK
    //     if (NIK == 0 || NIK == null) {

    //         let response = {
    //             code: 400,
    //             message: 'Error',
    //             error:'NIK tidak terisi'
    //           };      
    //         res.status(400).send(response);
    //         return response;
    //       }
    //     try {
    //         let qry = `SELECT * FROM pasien WHERE NIK='${NIK}'`;
    //         let hasil = await connection.execQry(qry)
    //         let response = {
    //             code: 200,
    //             message: `data ${NIK} berhasil di generate`,
    //             link: `8.215.37.21:5021/globaldoctor/pasien/getDataPasien?nik=${NIK}`
    //         };
    //         res.status(200).send(response)
    //         return hasil

    //     } catch (e) {
    //         let err = {
    //             code: 400,
    //             message: `data ${NIK} tidak ditemukan`,
    //             error:e
    //         };
    //         res.status(400).send(err)
    //         return err

    //     }
    // },
    callData : async(req, res) => {
        let NIK = req.params.NIK
        if (NIK == 0 || NIK == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'NIK tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        onsole.log(NIK);
       

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
        if (NoPegawai == 0 || NoPegawai == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'No Pegawai tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let username = req.body.username
        if (username == 0 || username == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'username tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let password = req.body.password
        if (password == 0 || password == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'password tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

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
        if (username == 0 || username == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'username tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let password = req.body.password
        if (password == 0 || password == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'password tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }

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
        if (NoPegawai == 0 || NoPegawai == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'No Pegawai tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let namaDepan = req.body.namaDepan
        if (namaDepan == 0 || namaDepan == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Nama Depan tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let namaBelakang = req.body.namaBelakang
        if (namaBelakang == 0 || namaBelakang == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Nama Belakang tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let username = req.body.username
        if (username == 0 || username == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'username tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let password = req.body.password
        if (password == 0 || password == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'password tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        
        try {
            let qry = `INSERT INTO user (NoPegawai, namaDepan, namaBelakang,username, password,jabatan, status) 
            VALUES (${NoPegawai},${namaDepan},${namaBelakang},${username},${password},'admin','aktif');`;
            let hasil = await connection.execQry(qry)
            let response = {
                code: 200,
                message: `success menambah admin ${username}`
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
        if (username == 0 || username == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'username tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let password = req.body.password
        if (password == 0 || password == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'password tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
        let newPassword = req.body.newPassword
        if (newPassword == 0 || newPassword == null) {

            let response = {
                code: 400,
                message: 'Error',
                error:'New Password tidak terisi'
              };      
            res.status(400).send(response);
            return response;
          }
          if (password !== newPassword) {

            let response = {
                code: 400,
                message: 'Error',
                error:'Confirmasi password tidak cocok'
              };      
            res.status(400).send(response);
            return response;
          }

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