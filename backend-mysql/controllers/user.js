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

			// TODO: Encrypt passzord first, then add it to `newUser`
			// let hashedPass = .....
	
			const newUser = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
			}

			console.log(newUser)
	
			// const query = 'INSERT INTO User SET ?;
			const query = 'INSERT INTO User SET ?';

	
			// SQL Queries
			connection.query(query, [newUser], (err, rows) => {
				
				if(!err) {

					console.log(rows);
					res.send('Your account has been created successfully!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
};

exports.login = (req, res) => {

	// Log user in
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {

			// console.log(req.body)

			// TODO
			// 1. FE to send EMAIL & PASS to validate
			// 2. BE to validate if EMAIL exists
			// 3. If exists, HASH the Pass + COMPARE it to the existing hashed pass
			// 4. If MATCHED, create JWT
			// 5. RETURN/SEND this specific user info to the FE (userID, FIRST NAME, TOKEN)
	
			// Request data
			let email = req.body.email;
			let password = req.body.password;
	
			// SQL Queries
			const query = 'SELECT * FROM User WHERE email = ?';
	
			connection.query(query, [email], (err, rows) => {
				if(!err) {
					if(rows.length > 0) { // There's data
						res.status(200).json({
							userId: rows[0].userID, 
							firstName: rows[0].firstName
						})
					} else { // No data
						res.status(400).json({
							error: "Incorrect email or password."
						})
					}
					console.log(rows)
					
				} else {
					console.log(err)
				}
			})
		}
	})
};

exports.getUser = (req, res) => {

	// Retrieve user
    mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {
			// console.log('BODY PARAMS:', req.body); // { id: 17 }
			// console.log('QUERY PARAMS:', req.query); // ?id=17
			// console.log('PATH/URL PARAMS:', req.params); // user/:id -> user/17
			// console.log('HEADERS PARAMS:', req.headers)
			
	
			// SELECT * FROM users
			let userID = req.params.id;
	
			const query = 'SELECT * FROM User WHERE userID = ?';
	
			// SQL Queries
			connection.query(query, [userID], (err, rows) => {
				if(!err) {
					if(rows.length > 0) { // There's data
						res.status(200).json({
							firstName: rows[0].firstName,
							lastName: rows[0].lastName,
							email: rows[0].email,
						})

					} else { // No data
						res.status(400).json({
							error: "This user doesn't exist"
						})
					}
					console.log(rows)
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
};

exports.deleteUser = (req, res)=> {

	// Delete user
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {
	
			// DELETE FROM users
			let userID = req.params.id;

			console.log(userID)
	
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
