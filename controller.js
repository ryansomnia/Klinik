const connection = require("./conn");
let dotenv = require("dotenv");
let env = dotenv.config();
const moment = require("moment");

let pasien = {
  getDataPasien: async (req, res) => {
    let nik = req.body.nik;
    if (nik == 0 || nik == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "nik tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `SELECT tglPenerimaan, waktuPenerimaan, tglPemeriksaan, pengirim, namaPasien,
          NIK, tglLahir, jenisSpecimen, pemeriksaan,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('geneTarget', geneTarget, 'nilaiCT',nilaiCT)) FROM detailDokumen INNER JOIN pasien 
                  ON pasien.IDPasien = detailDokumen.IDPasien ) 
            as detailDokumen,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('kesimpulan', kesimpulan)) from kesimpulanPemeriksaan INNER JOIN pasien 
                  ON pasien.IDPasien =  kesimpulanPemeriksaan.IDPasien) 
            as kesimpulanPemeriksaan 
            FROM pasien
         WHERE pasien.NIK = '${nik}';`;
      console.log(qry);
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: "success",
        data: hasil,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
  validatePasien: async (req, res) => {
    //param
    let nik = req.body.nik;
    if (nik == 0 || nik == null) {
      // tambah param tgl lahir
      let response = {
        code: 400,
        message: "Error",
        error: "nik tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let tglLahir = req.body.tglLahir;
    if (tglLahir == 0 || tglLahir == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "tgl Lahir tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `SELECT * FROM pasien WHERE NIK = '${nik}' AND tglLahir='${tglLahir}';`;

      let hasil = await connection.execQry(qry);
      console.log(hasil);
      console.log(hasil.length);
      if(hasil.length > 0){
        let response = {
          code: 200,
          message: "success",
          data: hasil,
        };
        res.status(200).send(response);
        return hasil;
      } else {
        let response = {
          code: 400,
          message: "error",
          data: [],
        };
        res.status(400).send(response);
        return hasil;
      }

     
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: "tanggal lahir dan nik tidak cocok",
      };
      res.status(400).send(response);
    }
  },
  getAllDataPasien: async (req, res) => {
    try {
      let qry = `SELECT * FROM pasien`;
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: "success",
        data: hasil,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
  addDataPasien: async (req, res) => {
    let IDPasien = req.body.IDPasien;
    if (IDPasien == 0 || IDPasien == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "IDPasien tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let waktuPengambilanSampel = req.body.waktuPengambilanSampel;
    if (waktuPengambilanSampel == 0 || waktuPengambilanSampel == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Waktu Pengambilan Sampel tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let namaPasien = req.body.namaPasien;
    if (namaPasien == 0 || namaPasien == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nama pasien tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let tglLahir = req.body.tglLahir;
    if (tglLahir == 0 || tglLahir == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "tgl lahir tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let jenisKelamin = req.body.jenisKelamin;
    if (jenisKelamin == 0 || jenisKelamin == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Jenis kelamin tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let NIK = req.body.NIK;
    if (NIK == 0 || NIK == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "NIK tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let tglPemeriksaan = req.body.tglPemeriksaan;
    if (tglPemeriksaan == 0 || tglPemeriksaan == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Tanggal Pemeriksaan tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let waktuPemeriksaan = req.body.waktuPemeriksaan;
    if (waktuPemeriksaan == 0 || waktuPemeriksaan == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "waktu Pemeriksaan tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    let tipePemeriksaan = req.body.tipePemeriksaan;
    if (tipePemeriksaan == 0 || tipePemeriksaan == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Tipe pemeriksaan tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let hasilPemeriksaan = req.body.hasilPemeriksaan;
    if (hasilPemeriksaan == 0 || hasilPemeriksaan == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "hasil tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let nilaiNormal = req.body.nilaiNormal;
    if (nilaiNormal == 0 || nilaiNormal == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nilai normal tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let kesimpulanEng = req.body.kesimpulanEng;
    if (kesimpulanEng == 0 || kesimpulanEng == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "kesimpulan English tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let kesimpulanIna = req.body.kesimpulanIna;
    if (kesimpulanIna == 0 || kesimpulanIna == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "kesimpulan Indonesia tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      // let qry = `INSERT INTO pasien (IDPasien, waktuPengambilanSampel, namaPasien, tglLahir, jenisKelamin, NIK, tglPemeriksaan, waktuPemeriksaan, tipePemeriksaan, hasilPemeriksaan, nilaiNormal, kesimpulanEng, kesimpulanIna)
      // VALUES ('${IDPasien}','${waktuPengambilanSampel}','${namaPasien}','${tglLahir}','${jenisKelamin}','${NIK}','${tglPemeriksaan}','${waktuPemeriksaan}','${tipePemeriksaan}','${hasilPemeriksaan}', '${nilaiNormal}', '${kesimpulanEng}', '${kesimpulanIna}')`;
      let qry = `call klinik.insertPasien('${IDPasien}', '${waktuPengambilanSampel}', '${namaPasien}', '${tglLahir}', '${jenisKelamin}', '${NIK}', '${tglPemeriksaan}', '${waktuPemeriksaan}', '${tipePemeriksaan}', '${hasilPemeriksaan}', '${nilaiNormal}', '${kesimpulanEng}', '${kesimpulanIna}');`;
      let hasil = await connection.execQry(qry);
      if (hasil[0][0].code == 400) {
        let response = {
          code: 400,
          message: hasil[0][0].error,
        };
        res.status(400).send(response);
        return response;
      }
      if (hasil[0][0].code == 200) {
        let response = {
          code: 200,
          message: `data ${namaPasien} berhasil di input.`,
        };
        res.status(200).send(response);
        return response;
      }
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
  updateDataPasien: async (req, res) => {
    let IDPasien = req.body.IDPasien;
    if (IDPasien == 0 || IDPasien == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "IDPasien tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let namaPasien = req.body.namaPasien;
    if (namaPasien == 0 || namaPasien == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nama pasien tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let tglLahir = req.body.tglLahir;
    if (tglLahir == 0 || tglLahir == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "tgl lahir tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let jenisKelamin = req.body.jenisKelamin;
    if (jenisKelamin == 0 || jenisKelamin == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Jenis kelamin tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let NIK = req.body.NIK;
    if (NIK == 0 || NIK == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "NIK tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let hasilPemeriksaan = req.body.hasilPemeriksaan;
    if (hasilPemeriksaan == 0 || hasilPemeriksaan == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "hasil tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let nilaiNormal = req.body.nilaiNormal;
    if (nilaiNormal == 0 || nilaiNormal == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nilai normal tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let kesimpulanEng = req.body.kesimpulanEng;
    if (kesimpulanEng == 0 || kesimpulanEng == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "kesimpulan English tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let kesimpulanIna = req.body.kesimpulanIna;
    if (kesimpulanIna == 0 || kesimpulanIna == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "kesimpulan Indonesia tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `UPDATE pasien
                        SET namaPasien = '${namaPasien}',
                         tglLahir = '${tglLahir}', jenisKelamin = '${jenisKelamin}',
                          NIK = '${NIK}', hasilPemeriksaan = '${hasilPemeriksaan}', nilaiNormal = '${nilaiNormal}',
                         kesimpulanEng = '${kesimpulanEng}', kesimpulanIna = '${kesimpulanIna}'
                        WHERE IDPasien='${IDPasien}'`;
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: `data ID : ${IDPasien} berhasil di update.`,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
  deleteDataPasien: async (req, res) => {
    let IDPasien = req.body.IDPasien;
    if (IDPasien == 0 || IDPasien == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "IDPasien tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    try {
      let qry = `DELETE FROM pasien WHERE IDPasien='${IDPasien}'`;

      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: `data ID : ${IDPasien} berhasil di hapus.`,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
};
let QR = {
  generateLink: async (req, res) => {
    let NIK = req.body.NIK;
    if (NIK == 0 || NIK == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "NIK tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    try {
      let qry = `SELECT IDPasien, tglLahir FROM pasien WHERE NIK='${NIK}'`;
      let hasil = await connection.execQry(qry);
      let tglLahir = moment(hasil[0].tglLahir).format("YYYY-MM-DD");
      let response = {
        code: 200,
        message: `data ${NIK} berhasil di generate`,
        data: {
          IDPasien: hasil[0].IDPasien,
          tglLahir: tglLahir,
        },
        link: `8.215.37.21:5021/globaldoctor/pasien/validatePasien?nik=${NIK}`,
      };
      console.log(response);
      res.status(200).send(response);
      return hasil;
    } catch (e) {
      let err = {
        code: 400,
        message: `data ${NIK} tidak ditemukan`,
        error: e,
      };
      res.status(400).send(err);
      return err;
    }
  },
  callData: async (req, res) => {
    let NIK = req.params.NIK;
    if (NIK == 0 || NIK == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "NIK tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    onsole.log(NIK);

    try {
      let qry = `SELECT * FROM pasien WHERE NIK ='${NIK}'`;
      //join
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: `success`,
        data: hasil,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {}
  },
};
let user = {
  updateDataUser: async (req, res) => {
    let NoPegawai = req.body.NoPegawai;
    if (NoPegawai == 0 || NoPegawai == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "No Pegawai tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let username = req.body.username;
    if (username == 0 || username == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "username tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let password = req.body.password;
    if (password == 0 || password == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "password tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `UPDATE user
                        SET username = '${username}', password = '${password}'
                        WHERE NoPegawai='${NoPegawai}'`;
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: `data NoPegawai : ${NoPegawai} berhasil di update.`,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
  login: async (req, res) => {
    let username = req.body.username;
    if (username == 0 || username == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "username tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let password = req.body.password;
    if (password == 0 || password == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "password tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `CALL login('${username}','${password}') `;
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: `succes login`,
        data: username,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
  addAdmin: async (req, res) => {
    let NoPegawai = req.body.NoPegawai;
    if (NoPegawai == 0 || NoPegawai == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "No Pegawai tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let namaDepan = req.body.namaDepan;
    if (namaDepan == 0 || namaDepan == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nama Depan tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let namaBelakang = req.body.namaBelakang;
    if (namaBelakang == 0 || namaBelakang == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "Nama Belakang tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let username = req.body.username;
    if (username == 0 || username == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "username tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let password = req.body.password;
    if (password == 0 || password == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "password tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `INSERT INTO user (NoPegawai, namaDepan, namaBelakang,username, password,jabatan, status) 
            VALUES (${NoPegawai},${namaDepan},${namaBelakang},${username},${password},'admin','aktif');`;
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: `success menambah admin ${username}`,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
  resetPass: async (req, res) => {
    let username = req.body.username;
    if (username == 0 || username == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "username tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let password = req.body.password;
    if (password == 0 || password == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "password tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    let newPassword = req.body.newPassword;
    if (newPassword == 0 || newPassword == null) {
      let response = {
        code: 400,
        message: "Error",
        error: "New Password tidak terisi",
      };
      res.status(400).send(response);
      return response;
    }
    if (password !== newPassword) {
      let response = {
        code: 400,
        message: "Error",
        error: "Confirmasi password tidak cocok",
      };
      res.status(400).send(response);
      return response;
    }

    try {
      let qry = `CALL resetPass('${username}','${password}','${newPassword}')`;
      let hasil = await connection.execQry(qry);
      let response = {
        code: 200,
        message: `success menambah admin ${username}`,
      };
      res.status(200).send(response);
      return hasil;
    } catch (error) {
      console.log(error);
      let response = {
        code: 400,
        message: "error",
        data: error,
      };
      res.status(400).send(response);
    }
  },
};
module.exports = { pasien, QR, user };
