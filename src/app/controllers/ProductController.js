import * as Yup from 'yup';

import Product from '../models/Product';
import User from '../models/User';

class ProductController {
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

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      quantity: Yup.number().required(),
      price: Yup.number().required(),
      bushel: Yup.boolean().required(),
    });

    if (!(await schema.isValid)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const { name, quantity, price, bushel } = req.body;

    await Product.create({
      name,
      quantity,
      price,
      bushel,
      user_id: user.id,
    });

    return res.json({
      name,
      quantity,
      price,
      bushel,
      userId: user.id,
      userName: user.name,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      quantity: Yup.number(),
      price: Yup.number(),
      bushel: Yup.boolean(),
    });

    if (!(await schema.isValid)) {
      return res.status(400).json({ error: 'Validation fails' });
    }
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
