var express = require('express');
var router = express.Router();
 
//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Digitize It' });
});

// GET / route for serving index.html file
router.get('/', (req, res) => {
  res.render('index');
});

// POST /upload for file upload
/* ===== Make sure that file name matches the name attribute in your html ===== */
router.post('/upload', upload.single('imageupload'), (req, res) => {
  if (req.file) {
      console.log('Uploading file...');
      var filename = req.file.filename;
      var uploadStatus = 'File Uploaded Successfully';
  } else {
      console.log('No File Uploaded');
      var filename = 'FILE NOT UPLOADED';
      var uploadStatus = 'File Upload Failed';
  }
  
  /* ===== Add the function to save filename to database ===== */
  
  res.render('index.pug', { status: uploadStatus });
});

 
// router.post('/', upload.single('imageupload'),function(req, res) {
//   res.send("File upload sucessfully.");
// });
 
module.exports = router;