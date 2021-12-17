// DB Connection
const mySqlConnection = require('../config/database');

// Requests
exports.createPost = (req, res) => {
	
		
	// if(req.file) {
	// 	let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`

	// 	res.send(newPost)
	// } 

	// if (!req.file) {
	// 	res.send("File was not found");
	// 	return;
	// }

	// const file = req.file.filename;
	// res.send(`${file.name} File Uploaded`);

	
	// Adding a new post
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
			
		} else {
		
			// let userId = req.session.id
			// console.log(userId)			
	
			// let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`

			const newPost = {
				userId: req.body.userId,
				caption: req.body.caption,
				imageUrl: 'http://localhost:3000/images/HAPPY_SAUCE.jpeg1639427653157.jpg',	
				likes: req.body.likes,
			}

			console.log('File: ', req.file)
			console.log('body: ', req.body)
			
			//console.log(newPost)
	
            const query = 'INSERT INTO Post Set ?';
	
			// SQL Queries
			connection.query(query, [newPost], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Your post has been created successfully!');

				} else {
					console.log(err)
				}
			})
		}	
	})
};

exports.getAllPosts = (req, res) => {

	// Retrieve post
    mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {

			console.log(req.body)
	
			const query = 'SELECT * FROM Post';
	
			// SQL Queries
			connection.query(query, (err, rows) => {
				if(!err) {
					console.log(rows)
					res.send(rows)

				} else {
					res.status(400).json({
						error: "Posts cannot be retrieved."
					})
				}
			})
		}
	})
};

exports.deletePost = (req, res) => {

	// Delete post
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {
	
			// SELECT * FROM Post
			let postId = req.params.id;
	
			const query = 'DELETE FROM Post WHERE postId = ?';
	
			// SQL Queries
			connection.query(query, [postId], (err, rows) => {

				if(!err) {
					console.log(rows)
					res.send('Post successfully deleted!');

				} else {
					console.log(err)
				}
			})
		}
	})
};

exports.viewPost = (req, res) => {
	
	// Adding a new view
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newView = {
                // userId: req.body.userId,
				view: req.body.view,
			}
	
			// const query = 'UPDATE Post SET ? WHERE postId = ?';
            const query = 'INSERT INTO View SET ?';
	
			// SQL Queries
			connection.query(query, [newView, 1], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Post successfully viewed!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
};

exports.unviewPost = (req, res) => {
	
	// Adding a new dislike
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newDislike = {
                userId: req.body.userId,
				dislikes: req.body.dislikes,

			}
	
			// const query = 'UPDATE Post SET ? WHERE postId = ?';
            const query = 'INSERT INTO Post(dislikes) VALUES (dislikes)';
	
			// SQL Queries
			connection.query(query, [newDislike, 1], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Post successfully disliked!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
};




exports.postComment = (req, res) => {
	
	// Adding a new comment
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newComment = {
				content: req.body.content,
			}

			console.log(newComment)
	
			// const query = 'UPDATE Post SET ? WHERE postId = ?';
            const query = 'INSERT INTO Comments SET ?';
	
			// SQL Queries
			connection.query(query, [newComment], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Your comment has been posted successfully!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
}

exports.getComments = (req, res) => {

	// Retrieve comments
    mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {

			console.log(req.body)
	
			const query = 'SELECT * FROM Comments';
	
			// SQL Queries
			connection.query(query, (err, rows) => {
				if(!err) {

					console.log(rows)
					res.send(rows)

				} else {
					console.log(err)
				}
			})
		}
	})
};