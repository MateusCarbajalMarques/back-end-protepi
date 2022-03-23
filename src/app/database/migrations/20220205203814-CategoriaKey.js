'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      queryInterface.addColumn('categorias', 'id_loja', {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'lojas',
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
			  onDelete: 'CASCADE'
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('categorias','id_loja');
  }
};
