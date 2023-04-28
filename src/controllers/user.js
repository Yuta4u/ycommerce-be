const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { User } = require("../models")

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, encryptedPassword) => {
      if (!!err) {
        reject(err)
        return
      }
      resolve(encryptedPassword)
    })
  })
}

const checkPassword = (encryptedPassword, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err)
        return
      }
      resolve(isPasswordCorrect)
    })
  })
}

const createToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "Rahasia", {
    expiresIn: "1d",
  })
}

module.exports = {
  async allUser(req, res) {
    await User.findAll()
      .then((response) => {
        res.status(200).json({
          message: "berhasil",
          data: response,
        })
      })
      .catch((err) => {
        res.status(400).json({
          status: "failed",
          message: err,
        })
      })
  },
  async register(req, res) {
    const encryptedPassword = await encryptPassword(req.body.password)
    let existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (existingUser) {
      res.status(422).json({
        message: "Email sudah dipakai",
      })
      return
    }

    await User.create({
      username: req.body.username,
      password: encryptedPassword,
      email: req.body.email,
      saldo: 0,
      images: "images\\avatar.png",
      role: 1,
    }).then((response) => {
      res.status(201).json({
        data: response,
        available: true,
      })
    })
  },
  async login(req, res) {
    const email = req.body.email
    const pwd = req.body.password
    const loginAccess = await User.findOne({
      where: {
        email: email,
      },
    })
    if (!loginAccess) {
      res.status(404).json({
        message: "Email tidak ditemukan",
      })
      return
    }
    const isPasswordCorrect = await checkPassword(loginAccess.password, pwd)
    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Password salah!",
      })
      return
    }
    const accessToken = createToken({
      id: loginAccess.id,
      username: loginAccess.username,
      email: loginAccess.email,
      saldo: loginAccess.saldo,
      images: loginAccess.images,
    })
    res.status(200).json({
      statusLogin: "Berhasil",
      token: `Bearer ${accessToken}`,
    })
  },
  async userById(req, res) {
    const data = await User.findOne({
      where: {
        id: req.params.id,
      },
    })
    res.send({
      msg: "berhasil get user by id",
      data,
    })
  },
  async updateUserById(req, res) {},
  async authorize(req, res) {
    try {
      const token = req.headers.authorization
      if (!token) {
        res.status(401).json({
          message: "Token Required!",
        })
        return
      }
      const bearerToken = token.split("Bearer ")[1]
      const tokenPayload = jwt.verify(
        bearerToken,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      )
      res.send({
        msg: "authorize berhasil",
        data: tokenPayload,
      })
    } catch (err) {}
  },
}
