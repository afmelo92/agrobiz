module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'available', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'available');
  },
};
