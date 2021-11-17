// DB Connection
const mySqlConnection = require('../config/database');

// Requests
exports.createPost = (req, res, next) => {
	
	// Adding a new post
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newPost = {
                userID: req.body.userID,
				creator: req.body.creator,
				imageUrl: req.body.imageUrl,
				caption: req.body.caption,
			}
	
			// const query = 'UPDATE Post SET ? WHERE postID = ?';
            const query = 'INSERT INTO Post(userID,creator,imageUrl,caption) VALUES (userID,creator,imageUrl,caption)';
	
			// SQL Queries
			connection.query(query, [newPost, 1], (err, rows) => {
				
				if(!err) {
					console.log(rows);
					res.send('Your post has been created successfully!');
				} else {
					console.log(err)
				}
			})

		}
		
	})
}

exports.getAllPosts = (req, res, next) => {

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
					res.send('Posts have been retrieved successfully!');
				} else {
					console.log(err)
				}
			})
		}
	})
};

exports.deletePost = (req, res, next)=> {

	// Delete post
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue 
		if(err) {
			throw err;

		} else {

			console.log(req.body)
	
			// SELECT * FROM Post
			let postID = req.body.postID;
	
			const query = 'DELETE FROM Post WHERE postID = ?';
	
			// SQL Queries
			connection.query(query, [postID], (err, rows) => {
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

exports.postComment = (req, res, next) => {
	
	// Adding a new comment
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newComment = {
                userID: req.body.userID,
				comments: req.body.comments,

			}
	
			// const query = 'UPDATE Post SET ? WHERE postID = ?';
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

exports.getComments = (req, res, next) => {

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

exports.likePost = (req, res, next) => {
	
	// Adding a new like
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newLike = {
                userID: req.body.userID,
				likes: req.body.likes,

			}
	
			// const query = 'UPDATE Post SET ? WHERE postID = ?';
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
}

exports.dislikePost = (req, res, next) => {
	
	// Adding a new dislike
	mySqlConnection.getConnection((err, connection) => {

		// If there's a problem throw error, else, continue
		if(err) {
			throw err;
		} else {

			console.log(req.body)
	
			const newDislike = {
                userID: req.body.userID,
				dislikes: req.body.dislikes,

			}
	
			// const query = 'UPDATE Post SET ? WHERE postID = ?';
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
}