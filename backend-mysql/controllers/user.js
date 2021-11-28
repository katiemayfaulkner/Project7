// DB Connection
const mySqlConnection = require('../config/database');

// Password hashing
const bcrypt = require("bcrypt");


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
					
							// Define new user and get all required elements
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
							error: "This user does not exist."
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
