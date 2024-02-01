const express = require("express");
const router = express.Router();
const db = require("../db");

// endpoint untuk mendapatkan data dari tabel customer
router.get("/", (req, res) => {
  const query = "SELECT * FROM kasir";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
    } else {
      res.json(results);
    }
  });
});

// Endpoint untuk mendapatkan data berdasarkan ID
router.get("/:id", (req, res) => {
  const dataId = req.params.id;

  // Query ke MySQL untuk mendapatkan data berdasarkan ID
  const query = `SELECT * FROM kasir WHERE id = ?`;

  db.query(query, [dataId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: "Data not found" });
      }
    }
  });
});

// endpoint tambah data barang
router.post("/", (req, res) => {
  // ambil data dari body permintaan
  const { id_kasir, nama, alamat, no_telepon } = req.body;
  // query tambah data customer ke tabel customer
  const query =
    "INSERT INTO kasir (id_kasir, nama,alamat,no_telepon) VALUES (?,?,?,?)";
  // eksekusi query dengan parameter yang diberikan
  db.query(query, [id_kasir, nama, alamat, no_telepon], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
    } else {
      // kirim response bahwa data customer telah ditambahkan
      res.status(201).json({ message: "data kasir berhasil ditambahkan" });
    }
  });
});

// endpoint edit data kasir
router.put("/:id", (req, res) => {
  const kasirId = req.params.id;
  const { nama, alamat, no_telepon } = req.body;

  // Pastikan ada data yang diterima dari body
  if (!nama || !alamat || !no_telepon) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Query untuk melakukan update data customer
  const query =
    "UPDATE kasir SET nama=?, alamat=?, no_telepon=? WHERE id_kasir=?";

  db.query(query, [nama, alamat, no_telepon, kasirId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Data kasir updated successfully" });
    }
  });
});

// endpoint unutk menghapus data customer berdasarkan ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM kasir WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      // Periksa apakah ada baris yang terhapus
      if (result.affectedRows > 0) {
        // Kirim respons bahwa data barang telah dihapus
        res.status(200).json({ message: "Data kasir telah dihapus" });
      } else {
        // Jika tidak ada baris yang terhapus, kirim respons bahwa data tidak ditemukan
        res.status(404).json({ message: "Data kasir tidak ditemukan" });
      }
    }
  });
});
module.exports = router;
