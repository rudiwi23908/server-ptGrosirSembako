require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
// const ip = process.env.IP;
const cors = require("cors");

const barang = require("./routes/barang");
const costumer = require("./routes/customer");
const kasir = require("./routes/kasir");
const penjualan = require("./routes/penjualan");

// middleware CORS
app.use(cors({ origin: true, credentials: true }));

// Middleware untuk mem-parsing JSON
app.use(express.json());

// middleware penanganan kesalahan parsing JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next();
});

// modul routes
app.use("/barang", barang);
app.use("/customer", costumer);
app.use("/kasir", kasir);
app.use("/penjualan", penjualan);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://:${port}`);
});

module.exports = { app, port, express, cors };
