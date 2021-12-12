const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');   // Import node package "path", which allows access to folder paths
const fileupload = require("express-fileupload");

// Express App & Configuration
const port = process.env.PORT || 3000;
const app = express();
app.set('port', port);

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// FYI: This line fixes the "undefined" req.body issue
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(fileupload());

// // Image upload error handler
// app.post("/", (req, res) => {
//   if (!req.file) {
//     res.send("File was not found");
//     return;
//   }

//   const file = req.file.filename;
//   res.send(`${file.name} File Uploaded`);
// });

app.use(cors({
    origin: "*",
}))

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);

// Actual Server
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`))