import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'quantity', 'price', 'bushel'],
    });
    return res.json(products);
  }

  async store(req, res) {
    const product = await Product.create(req.body);
    return res.json(product);
  }
}

export default new ProductController();
