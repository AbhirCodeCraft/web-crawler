const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'PASSWORD',
    database: 'DATABASE',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
});
// Schema for client_data
const sourceSchemaQuery = `
  CREATE TABLE IF NOT EXISTS client_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name TEXT NOT NULL,
    company_activity TEXT,
    cin TEXT,
    registration_date TEXT,
    category TEXT,
    sub_category TEXT,
    company_class TEXT,
    roc TEXT,
    company_status TEXT,
    authorised_capital INTEGER,
    paidup_capital INTEGER,
    state TEXT,
    pin_code INTEGER,
    country TEXT,
    address TEXT,
    email TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`
db.query(sourceSchemaQuery, (err, result) => {
    if (err) console.error('Error while creating table:', err);
});

module.exports = db;