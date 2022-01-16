// DB Connection
const mySqlConnection = require("../config/database");

// Requests
exports.createPost = (req, res) => {
  // Create initial empty "newPost" to be filled according to the condition below
  let newPost;

  // If there's an attachment file, add its uploaded URL and written content to "newPost",
  if (req.file) {
    let image = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    newPost = {
      userId: req.body.userId,
      caption: req.body.caption,
      postImg: image,
    };
  } else {
    // No attachments, send only written content
    newPost = {
      userId: req.body.userId,
      caption: req.body.caption,
      postImg: null,
    };
  }

  // Adding a new post
  mySqlConnection.getConnection((err, connection) => {
    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {
      const query = "INSERT INTO Post Set ?";

      // SQL Queries
      connection.query(query, [newPost], (err, rows) => {
        if (!err) {
          res.send("Your post has been created successfully!");
        } else {
          console.log(err);
        }
      });
    }
  });
};

exports.getAllPosts = (req, res) => {
  // Retrieve all posts
  mySqlConnection.getConnection((err, connection) => {
    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {
      const query =
        "SELECT post.postId, post.postImg, post.caption, user.firstName, user.lastName, user.userImg FROM post INNER JOIN user ON post.userId = user.userId";

      // SQL Queries
      connection.query(query, (err, rows) => {
        if (!err) {
          if (rows.length > 0) {
            // There's data

            res.status(200).json({
              result: rows,
            });
          } else {
            // No data
            res.status(400).json({
              error: "These posts do not exist.",
            });
          }
        } else {
          res.status(400).json({
            error: "Posts cannot be retrieved.",
          });
        }
      });
    }
  });
};

exports.deletePost = (req, res) => {
  // Delete post
  mySqlConnection.getConnection((err, connection) => {
    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {
      let postId = req.params.id;

      const query = "DELETE FROM Post WHERE postId = ?";

      // SQL Queries
      connection.query(query, [postId], (err, rows) => {
        if (!err) {
          res.send("Post successfully deleted!");
        } else {
          console.log(err);
        }
      });
    }
  });
};

exports.postComment = (req, res) => {
  // Adding a new comment
  mySqlConnection.getConnection((err, connection) => {
    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {
      const newComment = {
        content: req.body.content,
        userId: req.body.userId,
        postId: req.params.id,
      };

      const query = "INSERT INTO Comments SET ?";

      // SQL Queries
      connection.query(query, [newComment], (err, rows) => {
        if (!err) {
          res.send("Your comment has been posted successfully!");
        } else {
          console.log(err);
        }
      });
    }
  });
};

exports.getComments = (req, res) => {
  // Retrieve comments
  mySqlConnection.getConnection((err, connection) => {
    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {
      let postId = req.params.id;

      const query =
        "SELECT comments.content, user.userImg, user.firstName, user.lastName FROM comments INNER JOIN user ON comments.userId = user.userId WHERE postId = ?";

      // SQL Queries
      connection.query(query, [postId], (err, rows) => {
        if (!err) {
          if (rows.length > 0) {
            // There's data
            res.status(200).json({
              result: rows,
            });
          } else {
            // No data
            res.status(400).json({
              error: "These comments can not be retrieved.",
            });
          }
        } else {
          console.log(err);
        }
      });
    }
  });
};

exports.viewPost = (req, res) => {
  // Adding a new view
  mySqlConnection.getConnection((err, connection) => {
    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {
      const newView = {
        postId: req.params.id,
        userId: req.body.userId,
      };

      const query = "INSERT INTO View SET ?";

      // SQL Queries
      connection.query(query, [newView], (err, rows) => {
        if (!err) {
          res.send("Post successfully viewed!");
        } else {
          console.log(err);
        }
      });
    }
  });
};

exports.unviewPost = (req, res) => {
  // Unview post
  mySqlConnection.getConnection((err, connection) => {
    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {
      let postId = req.params.id;
      let userId = req.body.userId;

      const query = "DELETE FROM View WHERE postId = ? AND userId = ?";

      // SQL Queries
      connection.query(query, [postId, userId], (err, rows) => {
        if (!err) {
          res.send("View successfully deleted!");

        } else {
          console.log(err);
        }
      });
    }
  });
};

exports.getView = (req, res) => {

  // Retrieve views
  mySqlConnection.getConnection((err, connection) => {

    // If there's a problem throw error, else, continue
    if (err) {
      throw err;
    } else {

      let userId = req.params.id;
      let postId = req.query.postId;

      const query = "SELECT * FROM View WHERE userId = ? AND postId = ?";

      // SQL Queries
      connection.query(query, [userId, postId], (err, rows) => {
        if (!err) {
          if (rows.length > 0) { // There's data
            res.status(200).json({
              result: rows,

            });
          } else { // No data
            res.status(404).json({
              error: "No view.",
            });
          }
        } else {
          console.log(err);
        }
      });
    }
  });
};