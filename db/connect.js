const Pool = require('pg').Pool
require('dotenv').config()

const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: true
}

const pool = new Pool(dbConfig)
module.exports = {
  pool,
  query: (text, params = []) => {
    return pool.query(text, params)
  }
}
