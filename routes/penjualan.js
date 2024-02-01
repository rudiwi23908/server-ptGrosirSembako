const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/customer", (req, res) => {
  // Query untuk mendapatkan data nama_customer dan no_telepon dari tabel penjualan
  const query = "SELECT nama_customer, no_telepon FROM penjualan";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching penjualan customer data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint untuk mendapatkan data penjualan
router.get("/", (req, res) => {
  const query = "SELECT * FROM penjualan";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("internal server error");
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const dataId = req.params.id;
  const query = `SELECT * FROM penjualan WHERE id_penjualan = ?`;

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

// Endpoint untuk menambahkan data penjualan
router.post("/", (req, res) => {
  const {
    id_penjualan,
    data_pembelian,
    id_kasir,
    nama_customer,
    metode_pembayaran,
    nama_kasir,
    no_telepon,
    tanggal_penjualan,
    total_pembayaran,
  } = req.body;

  const query =
    "INSERT INTO penjualan (id_penjualan,data_pembelian, id_kasir, nama_customer, metode_pembayaran, nama_kasir, no_telepon, tanggal_penjualan, total_pembayaran) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      id_penjualan,
      data_pembelian,
      id_kasir,
      nama_customer,
      metode_pembayaran,
      nama_kasir,
      no_telepon,
      tanggal_penjualan,
      total_pembayaran,
    ],
    (err, result) => {
      if (err) {
        console.error("Error saat menambahkan data penjualan:", err);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan saat menambahkan data penjualan" });
      } else {
        res
          .status(201)
          .json({ message: "Data penjualan berhasil ditambahkan" });
      }
    }
  );
});
module.exports = router;
