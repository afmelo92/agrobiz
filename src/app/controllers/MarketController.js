import Product from '../models/Product';
import User from '../models/User';

class MarketController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const products = await Product.findAll({
      where: { available: true },
      attributes: ['id', 'name', 'quantity', 'price', 'bushel'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (products.length === 0) {
      return res.status(400).json({ error: 'There are no products available' });
    }

    return res.json(products);
  }

  async update(req, res) {
    const product = await Product.findByPk(req.params.prodId);

    if (!product) {
      return res.status(400).json({ error: 'Product does not exists' });
    }

    if (product.user_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'You can not buy your own product' });
    }

    product.available = false;

    await product.save();

    return res.json({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      bushel: product.bushel,
    });
  }
}

export default new MarketController();
