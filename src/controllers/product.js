const { Product } = require("../models")

module.exports = {
  async getAllProduct(req, res) {
    const allProduct = await Product.findAll()
    if (allProduct) {
      res.status(201).json({
        msg: "berhasil get all product",
        data: allProduct,
      })
    }
  },
  async addProduct(req, res) {
    await Product.create({
      productName: req.body.productName,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      images: req.file.path,
      idUser: req.body.idUser,
    }).then((response) => {
      res.status(201).json({
        msg: "post data berhasil",
      })
    })
  },
  async getProductById(req, res) {
    const productById = await Product.findOne({
      where: {
        idUser: req.params.id,
      },
    })
    if (productById) {
      res.status(422).json({
        message: "berhasil get product by id",
        data: productById,
      })
    }
  },
}
