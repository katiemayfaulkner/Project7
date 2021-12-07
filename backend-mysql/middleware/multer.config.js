// Middleware for handling multimedia data (in this case images)
const multer = require('multer');

// Import node package "path", which allows access to folder paths
const path = require('path'); 

// Different types of media
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Tells multer where to store incoming files ("images" folder)
const storage = multer.diskStorage({
  destination: (req, file, callback) => { 
    callback(null, 'images');

  },
  filename: (req, file, callback) => {                      // Tells multer to use original name, but..
    const name = file.originalname.split(' ').join('_');    // spaces become underscores
    const extension = MIME_TYPES[file.mimetype];            // uses MIME type map to resolve appropriate file extension
    callback(null, name + Date.now() + '.' + extension);    // timestamp is added
  }
});

module.exports = multer({ storage: storage,                   
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('File format is invalid.'))
        }
        callback(null, true)
    }
}).single('image');