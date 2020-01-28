import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        quantity: Sequelize.FLOAT,
        bushel: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Product;
