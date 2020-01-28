import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'quantity', 'price', 'bushel'],
    });

    if (products.length === 0) {
      return res.status(400).json({ error: 'There are no products available' });
    }

    return res.json(products);
  }

  async store(req, res) {
    const product = await Product.create(req.body);
    return res.json(product);
  }

  async update(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(400).json({ error: 'Product does not exists' });
    }

    const { id, name, quantity, price, bushel } = await product.update(
      req.body
    );

    return res.json({ id, name, quantity, price, bushel });
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(400).json({ error: 'Product does not exists' });
    }

    await product.destroy();

    return res.json({ message: 'Product deleted' });
  }
}

export default new ProductController();
