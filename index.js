// FEATURES
const express = require("express")
const bodyParser = require("body-parser")
const port = process.env.PORT || 8000
const cors = require("cors")

// MULTER
const path = require("path")

// ROUTES
const user = require("./src/routes/user")
const product = require("./src/routes/product")

const app = express()
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors((Credential = "false")))
// ROUTES
app.use("/user", user)
app.use("/product", product)
app.use("/images", express.static(path.join(__dirname, "images")))

app.listen(port, () => console.log(`berjalan di http://localhost:${port}/`))
