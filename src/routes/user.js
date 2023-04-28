const express = require("express")
const router = express.Router()

const {
  allUser,
  register,
  login,
  authorize,
  userById,
} = require("../controllers/user")

router.get("/v1/allUser", allUser)

// act
router.post("/v1/register", register)
router.post("/v1/login", login)
router.post("/v1/authorize", authorize)

router.get("/v1/userById/:id", userById)

module.exports = router
