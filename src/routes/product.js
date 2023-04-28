const express = require("express")
const multer = require("multer")
const {
  getAllProduct,
  addProduct,
  getProductById,
} = require("../controllers/product")

const router = express.Router()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images")
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname)
  },
})
var upload = multer({ storage: storage })

router.use(upload.single("images"))

router.get("/v1/allProduct", getAllProduct)
router.get("/v1/getProductById/:id", getProductById)
router.post("/v1/addProduct", addProduct)

module.exports = router
