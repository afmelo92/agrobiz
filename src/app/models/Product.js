import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        quantity: Sequelize.FLOAT,
        price: Sequelize.FLOAT,
        bushel: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async product => {
      if (product.bushel) {
        product.quantity = await (product.quantity * 27.2155).toFixed(2);
      }
    });

    return this;
  }
}

export default Product;
