const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100
};

const pool = mysql.createPool(config);

async function poveziSeNaBazu() {
    try {
        console.log("Uspostavljanje veze sa bazom...");
        await pool.getConnection();
        console.log("Uspješno povezan sa bazom podataka.");
    } catch (error) {
        console.error('Greška prilikom povezivanja sa bazom:', error);
        throw error;
    }
}

async function izvrsiUpit(upit, params = []) {
    try {
        const [rows] = await pool.query(upit, params);
        console.log("Upit uspješno izvršen");
        return rows;
    } catch (error) {
        console.error("Greška prilikom upita", error);
        throw error;
    }
}

function zatvoriVezu() {
    pool.end();
    console.log("Veza sa bazom podataka zatvorena.");
}

module.exports = {
    poveziSeNaBazu,
    izvrsiUpit,
    zatvoriVezu
};
