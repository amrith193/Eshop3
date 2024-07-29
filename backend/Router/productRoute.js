

const express = require ('express')
const router = express.Router()
const multer = require('multer')
const Seller = require ('../Middleware/Admin')


const fs = require('fs');  



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = 'productImage';
    
    
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
  const upload = multer({ storage: storage })
  const {Insert,View,Delete,Update,ViewSingle,View2,ViewById}= require('../Controller/product')




router.post('/insert', Seller, upload.array('productImage'), Insert);
router.post('/insertadmin', Seller,upload.array('productImage'),  Insert);

router.get('/view', View);
router.get('/view2', View2);
router.get('/view3/:id', ViewById);
router.get('/single/:id', ViewSingle);

router.delete('/delete/:id', Delete);
router.put('/edit/:id', Update);

module.exports = router;
