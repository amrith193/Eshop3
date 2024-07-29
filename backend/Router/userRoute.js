const express = require ('express')
const router = express.Router()
const multer = require('multer')
const authController = require("../Controller/user")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Images/users')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+ '-' +file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  const {Register ,Login, Singleview,View, Delete,ViewStatus,Update}= require('../Controller/user')
  router.post ('/register',upload.single('image'),Register)
 
  router.get('/singleview/:id',Singleview)
  router.get('/view',View)
  router.delete('/delete/:id',Delete)
  router.post ('/login',Login)
  router.put ('/update/:userId',Update)

  router.post("/register", authController.Register);
  // Change POST to GET for fetching pending sellers
router.get("/admin/approve-seller", authController.GetPendingSellers);
router.get('/view-status/:userId', ViewStatus);

router.patch("/admin/approve-seller/:userId/:approvalStatus", authController.AdminApproveSeller);

module.exports=router