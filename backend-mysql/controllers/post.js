// DB Connection
const mySqlConnection = require('../config/database');

// Requests
exports.createPost = (req, res) => {
	
		
	// Create initial empty "newPost" to be filled according to the condition below
	let newPost;

	// If there's an attachment file, add its uploaded URL to the "newPost"
	if(req.file) {
		let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
		
		newPost = {
			userId: req.body.userId,
			caption: req.body.caption,
			postImg: image,	
		}
		
	} else { // No attachments.
		newPost = {
			userId: req.body.userId,
			caption: req.body.caption,
			postImg: null,	
		}
	}
	
	// Adding a new post
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
			
		} else {
	
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
	
			const query = 'SELECT post.postImg, post.caption, user.firstName, user.lastName, user.userImg FROM post INNER JOIN user ON post.userId = user.userId';
	
			// SQL Queries
			connection.query(query, (err, rows) => {
				if(!err) {
					
					if(rows.length > 0) { // There's data
						console.log("🚀 ~ file: post.js ~ line 103 ~ connection.query ~ rows", rows)

						res.status(200).json({
							result: rows
						});

					} else { // No data
						res.status(400).json({
							error: "This user does not exist."
						})
					}

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
	
			const newView = {
				view: req.body.view,
                userId: req.body.userId,
				postId: req.params.id,
			}

			console.log(newView)
	
			// const query = 'UPDATE Post SET ? WHERE postId = ?';
            const query = 'INSERT INTO View SET ?';
	
			// SQL Queries
			connection.query(query, [newView], (err, rows) => {
				
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
	
	// Delete post
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {
	
			// SELECT * FROM Post
			let postId = req.params.id;
	
			const query = 'DELETE FROM View WHERE postId = ?';
	
			// SQL Queries
			connection.query(query, [postId], (err, rows) => {

				if(!err) {
					console.log(rows)
					res.send('View successfully deleted!');

				} else {
					console.log(err)
				}
			})
		}
	})
};

exports.getView = (req, res) => {

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
	
			const query = 'SELECT * FROM View WHERE userId = ?';

			console.log(userId)
	
			// SQL Queries
			connection.query(query, [userId], (err, rows) => {
				if(!err) {
					if(rows.length > 0) { // There's data
						res.status(200).json({
							view: rows[0].view,
							postId: rows[0].postId,
							userId: rows[0].userId
						})

					} else { // No data
						res.status(400).json({
							error: "No view."
						})
					}
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
	
			const newComment = {
				content: req.body.content,
				userId: req.body.userId,
				postId: req.params.id,
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

			let postId = req.params.id
	
			const query = 'SELECT * FROM Comments where postId = ?';
	
			// SQL Queries
			connection.query(query, [postId], (err, rows) => {
				if(!err) {
					res.send(rows)
                    console.log("🚀 ~ file: post.js ~ line 298 ~ connection.query ~ rows", rows)		

				} else {
					console.log(err)
				}
			})
		}
	})
};
