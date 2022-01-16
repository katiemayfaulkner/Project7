const http = require('http');
const express = require('express');     // Fast & minimalist web framework
const bodyParser = require('body-parser');  // Body parsing middleware : Converts body into useable json object
const cors = require('cors');   // Cross origin resource sharing : allows resources on a web page to be requested from a domain outside the domain from which the first resource was served
const path = require('path');   // Import node package "path", which allows access to folder paths

// Express App & Configuration
const port = process.env.PORT || 3000;
const app = express();
app.set('port', port);

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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