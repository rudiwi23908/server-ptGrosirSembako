const mysql = require("mysql");

// konfigurasi koneksi ke MySQL
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "server-grosir-sembako",
});
