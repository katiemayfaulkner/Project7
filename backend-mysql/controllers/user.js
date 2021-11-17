// DB Connection
const mySqlConnection = require('../config/database');


// Requests
exports.signup = (req, res) => { 
	
	// Adding a new user
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newUser = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
			}
	
			// const query = 'UPDATE User SET ? WHERE userID = ?';
			const query = 'INSERT INTO User(firstName, lastName, email, password) VALUES (firstName, lastName, email, password)';

	
			// SQL Queries
			connection.query(query, [newUser, 1], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Your account has been created successfully!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
}

exports.login = (req, res) => {

	// Log user in
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {

			console.log(req.body)
	
			// SELECT * FROM users
			let userID = req.body.userID;
	
			const query = 'SELECT * FROM User WHERE userID = ?';
	
			// SQL Queries
			connection.query(query, [userID], (err, rows) => {
				if(!err) {
					console.log(rows)
					res.send('You have successfully been logged in!');
				} else {
					console.log(err)
				}
			})
		}
	})
}

exports.getUser = (req, res, next) => {

	// Retrieve user
    mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {

			console.log(req.body)
	
			// SELECT * FROM users
			let userID = req.body.userID;
	
			const query = 'SELECT * FROM User WHERE userID = ?';
	
			// SQL Queries
			connection.query(query, [userID], (err, rows) => {
				if(!err) {
					console.log(rows)
					res.send('Account retrieved successfully!');
				} else {
					console.log(err)
				}
			})
		}
	})
};

exports.modifyUser = (req, res) => { 
	
	// Modifying a user
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newUser = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
			}
	
			const query = 'UPDATE User SET ? WHERE userID = ?';
	
			// SQL Queries
			connection.query(query, [newUser, 1], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Your account has been updated successfully!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
}

exports.deleteUser = (req, res, next)=> {

	// Delete user
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {

			console.log(req.body)
	
			// SELECT * FROM users
			let userID = req.body.userID;
	
			const query = 'DELETE FROM User WHERE userID = ?';
	
			// SQL Queries
			connection.query(query, [userID], (err, rows) => {
				if(!err) {
					console.log(rows)
					res.send('Account successfully deleted!');
				} else {
					console.log(err)
				}
			})
		}
	})
};
