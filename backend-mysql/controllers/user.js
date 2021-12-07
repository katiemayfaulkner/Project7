// DB Connection
const mySqlConnection = require('../config/database');

// Password hashing
const bcrypt = require("bcrypt");

// Secret or private key (token) generator for verification purpose
const jwt = require('jsonwebtoken');


// Requests
exports.signup = (req, res) => { 
	
	// Adding new user : check if user does not exist, if password is strong, then hash password, & insert user into db
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;

		} else {

			// Define user email 
			let email = req.body.email;

			// SQL Queries : if user already exists, throw error, else continue
			const query = 'SELECT * FROM User WHERE email = ?';

			connection.query(query, [email], (err, rows) => {

				if(err) {
					console.log(err)
					
				} else {

					if(rows.length > 0) { // if there's data, throw error

						res.status(400).json({
							error: "User already exists."
						})

					} else { // no data, continue signup

						// Define strong password
						let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

						// If entered password is a strong password, continue, else throw error
						if(strongPassword.test(req.body.password) && req.body.password.length >= 8) {

							// Encrypt password
							let hashedPassword = bcrypt.hashSync(req.body.password, 10);
					
							// Define new user with all required elements
							const newUser = {
								firstName: req.body.firstName,
								lastName: req.body.lastName,
								email: req.body.email,
								password: hashedPassword,
							};

							console.log(newUser);
					
							// SQL Queries : if all previous steps have been validated, insert user into db
							const query = 'INSERT INTO User SET ?';

							connection.query(query, [newUser], (err, rows) => {
								
								if(!err) {
									console.log(rows);
									res.send('Your account has been created successfully!');

								} else {
									console.log(err)
								};
							});

						} else{

							// It's a weak password, throw error and alert user
							res.status(400).json({
								message: "Weak password. Password must be at least 8 character, and contain at least one uppercase, one lowercase, one number and a special character!"
							});
						};
					};
				};
			});
		};	
	});
};

exports.login = (req, res) => {

	// Log user in
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {
	
			// Request data
			let email = req.body.email;
	
			// SQL Queries : if user already exists, continue, else throw error
			const query = 'SELECT * FROM User WHERE email = ?';
	
			connection.query(query, [email], (err, rows) => {
				if(!err) {
					if(rows.length > 0) { // There's data

						// Compare entered password and db password
						const pswdMatch = bcrypt.compareSync(req.body.password, rows[0].password) 

						if(pswdMatch) { // If passwords match

							// Create token
							const token = jwt.sign({
								email: rows[0].email,
								userId: rows[0].userId
							},
							'RANDOM_SECRET_TOKEN_WHICH_IS_LONG_BECAUSE_IT_IS_MORE_SECURE',
							{ expiresIn: '24h'}
							);

							// Send response data
							res.status(200).json({
								userId: rows[0].userId, 
								firstName: rows[0].firstName,
								token: token
							})
							
						} else { // Throw error
							res.status(400).json({
								error: "Password incorrect."
							})
						}
					} else { // No data
						res.status(400).json({
							error: "User does not exist."
						})
					}					
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
			let userId = req.params.id;
	
			const query = 'SELECT * FROM User WHERE userId = ?';

			console.log(userId)
	
			// SQL Queries
			connection.query(query, [userId], (err, rows) => {
				if(!err) {
					if(rows.length > 0) { // There's data
						res.status(200).json({
							firstName: rows[0].firstName,
							lastName: rows[0].lastName,
							email: rows[0].email,
						})

					} else { // No data
						res.status(400).json({
							error: "This user does not exist."
						})
					}
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

			// Request data
			let userId = req.params.id;
			let firstName = req.body.firstName;
			let lastName = req.body.lastName;
			let email = req.body.email;
			let password = req.body.password;

			// If password input has not been filled in by user, only send firstName, lastName, email
			if(!password) {

				let query = 'UPDATE User SET firstName = ?, lastName = ?, email = ? WHERE userId = ?';
				let inserts = [firstName, lastName, email, userId];

				// SQL Queries
				connection.query(query, inserts, (err, rows) => {
					
					if(!err) {
						console.log(rows);
						res.send('Your account has been updated successfully!');
						
					} else {
						console.log(err)
					}
				})

			} else { // else send firstName, lastName, email AND password

				// Define strong password
				let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

				// If entered password is a strong password, continue, else throw error
				if(strongPassword.test(req.body.password) && req.body.password.length >= 8) {

					// Encrypt password
					let hashedPassword = bcrypt.hashSync(req.body.password, 10);

					// SQL Queries
					let query = 'UPDATE User SET firstName = ?, lastName = ?, email = ?, password = ? WHERE userId = ?';
					let inserts = [firstName, lastName, email, hashedPassword, userId];

					connection.query(query, inserts, (err, rows) => {
						
						if(!err) {
							console.log(rows);
							res.send('Your account has been updated successfully!');
							
						} else {
							console.log(err)
						}
					})

				} else {
					// It's a weak password, throw error and alert user
					res.status(400).json({
						message: "Weak password. Password must be at least 8 character, and contain at least one uppercase, one lowercase, one number and a special character!"
					});
				}
			}
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
			let userId = req.params.id;

			console.log(userId)
	
			const query = 'DELETE FROM User WHERE userId = ?';
	
			// SQL Queries
			connection.query(query, [userId], (err, rows) => {
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
