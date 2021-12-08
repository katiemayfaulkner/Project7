const mysql = require('mysql');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'My1$ecure2P@$$sw0rd3',
	database: 'groupomania',
	connectTimeout: 50,
	multipleStatements: true
})

module.exports = db;