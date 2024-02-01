const express = require("express");
const router = express.Router();
const db = require("../db");

// endpoint untuk mendapatkan data dari tabel customer
router.get("/", (req, res) => {
  const query = "SELECT * FROM barang";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
    } else {
      res.json(results);
    }
  });
});

// endpoint tambah data barang
router.post("/", (req, res) => {
  // ambil data dari body permintaan
  const { kode_barang, merek, harga } = req.body;
  // query tambah data customer ke tabel barang
  const query = "INSERT INTO barang (kode_barang, merek, harga) VALUES (?,?,?)";
  // eksekusi query dengan parameter yang diberikan
  db.query(query, [kode_barang, merek, harga], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
    } else {
      res.status(201).json({ message: "data barang berhasil ditambahkan" });
    }
  });
});

// endpoint edit data customer
router.put("/:id", (req, res) => {
  const kode_barang = req.params.id;
  const { merek, harga } = req.body;

  // Pastikan ada data yang diterima dari body
  if (!merek || !harga) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Query untuk melakukan update data customer
  const query = "UPDATE barang SET merek=?,harga=? WHERE kode_barang=?";

  db.query(query, [merek, harga, kode_barang], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Data barang updated successfully" });
    }
  });
});

// endpoint unutk menghapus data customer berdasarkan ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM barang WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      // Periksa apakah ada baris yang terhapus
      if (result.affectedRows > 0) {
        // Kirim respons bahwa data barang telah dihapus
        res.status(200).json({ message: "Data customer telah dihapus" });
      } else {
        // Jika tidak ada baris yang terhapus, kirim respons bahwa data tidak ditemukan
        res.status(404).json({ message: "Data customer tidak ditemukan" });
      }
    }
  });
});
module.exports = router;
