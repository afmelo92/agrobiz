import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        quantity: Sequelize.FLOAT,
        price: Sequelize.FLOAT,
        bushel: Sequelize.BOOLEAN,
        available: Sequelize.BOOLEAN,
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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Product;
