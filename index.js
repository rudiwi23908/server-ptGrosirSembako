const { db } = require("./connection");
const express = require("express");
const app = express();
const port = 3004;

// buat koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to mysql:", err);
  } else {
    console.log("connected to mysql");
  }
});

// middleware untuk membaca JSON
app.use(express.json());

// route
app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM barang";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result);
    }
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
