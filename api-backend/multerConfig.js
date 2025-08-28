const express = require('express');
const multer = require('multer');
let router = express()


// Storage and file name settings
const storage = multer.diskStorage({
    destination:  'public/images',// Folder where images will be stored
    filename: function (req, file, cb) {
       cb(null, file.originalname)
           }
});


const upload = multer({
    storage: storage
});

module.exports = upload;
