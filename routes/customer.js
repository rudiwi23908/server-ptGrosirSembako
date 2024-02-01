const express = require("express");
const router = express.Router();
const db = require("../db");

// endpoint untuk mendapatkan data dari tabel customer
router.get("/", (req, res) => {
  const query = "SELECT * FROM customer";

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
  const query = `SELECT * FROM customer WHERE id = ?`;

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
  const { id_customer, nama, alamat, no_telepon } = req.body;
  // query tambah data customer ke tabel customer
  const query =
    "INSERT INTO customer (id_customer, nama,alamat,no_telepon) VALUES (?,?,?,?)";
  // eksekusi query dengan parameter yang diberikan
  db.query(query, [id_customer, nama, alamat, no_telepon], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal server error");
    } else {
      // kirim response bahwa data customer telah ditambahkan
      res.status(201).json({ message: "data customer berhasil ditambahkan" });
    }
  });
});

// endpoint edit data customer
router.put("/:id", (req, res) => {
  const customerId = req.params.id;
  const { nama, alamat, no_telepon } = req.body;

  // Pastikan ada data yang diterima dari body
  if (!nama || !alamat || !no_telepon) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Query untuk melakukan update data customer
  const query =
    "UPDATE customer SET nama=?, alamat=?, no_telepon=? WHERE id_customer=?";

  db.query(query, [nama, alamat, no_telepon, customerId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Data customer updated successfully" });
    }
  });
});

// endpoint unutk menghapus data customer berdasarkan ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM customer WHERE id = ?";
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
