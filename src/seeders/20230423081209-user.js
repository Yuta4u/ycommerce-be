"use strict"
const { Op } = require("sequelize")
const bcrypt = require("bcryptjs")

const names = ["yuta", "tama", "tommy"]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123456"
    const encryptedPassword = bcrypt.hashSync(password, 10)
    const balance = "1000000"
    const images = "images\\avatar.jpeg"
    const timestamp = new Date()

    const users = names.map((name) => ({
      username: name,
      email: `${name.toLowerCase()}@mail.com`,
      password: encryptedPassword,
      images,
      balance,
      createdAt: timestamp,
      updatedAt: timestamp,
    }))

    await queryInterface.bulkInsert("Users", users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { name: { [Op.in]: names } }, {})
  },
}
