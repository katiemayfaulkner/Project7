// DB Connection
const mySqlConnection = require('../config/database');

// Requests
exports.createPost = (req, res) => {
	
	// Adding a new post
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
			
		} else {

			try{
				let image = null;
				if (req.file) {
					const image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`

					const newPost = {
						imageUrl: image,
						caption: req.body.caption,
					}
					console.log(newPost)
					console.log(req.file)

				} else {
					res.send('No image found!');
				}
			} catch (err) {
				console.log(err)
			}

			// console.log(req.body)

			// // let userId = req.session.id
			// // console.log(userId)

			// const url = req.protocol + '://' + req.get('host');
	
			// const newPost = {
			// 	imageUrl: url + '/images/' + req.file.filename,
			// 	caption: req.body.caption,
			// }

			// console.log(imageUrl)
			// console.log(newPost);
	
            // const query = 'INSERT INTO Post Set ?';
	
			// // SQL Queries
			// connection.query(query, [newPost, 1], (err, rows) => {
				
			// 	if(!err) {
			// 		console.log(rows);
			// 		res.send('Your post has been created successfully!');

			// 	} else {
			// 		console.log(err)
			// 	}
			// })
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

			console.log(req.body)
	
			// SELECT * FROM Post
			let postId = req.params.id;

			console.log(postId)
	
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

exports.postComment = (req, res) => {
	
	// Adding a new comment
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newComment = {
                userId: req.body.userId,
				comments: req.body.comments,

			}
	
			// const query = 'UPDATE Post SET ? WHERE postId = ?';
            const query = 'INSERT INTO Post(comments) VALUES (comments)';
	
			// SQL Queries
			connection.query(query, [newComment, 1], (err, rows) => {
				
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
	
			const query = 'SELECT comments FROM Post';
	
			// SQL Queries
			connection.query(query, (err, rows) => {
				if(!err) {
					console.log(rows)
					res.send('Comments have been retrieved successfully!');
				} else {
					console.log(err)
				}
			})
		}
	})
};

exports.likePost = (req, res) => {
	
	// Adding a new like
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newLike = {
                userId: req.body.userId,
				likes: req.body.likes,

			}
	
			// const query = 'UPDATE Post SET ? WHERE postId = ?';
            const query = 'INSERT INTO Post(likes) VALUES (likes)';
	
			// SQL Queries
			connection.query(query, [newLike, 1], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Post successfully liked!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
};

exports.dislikePost = (req, res) => {
	
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