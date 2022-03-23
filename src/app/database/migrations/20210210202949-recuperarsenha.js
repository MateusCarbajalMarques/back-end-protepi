'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('recuperarsenhas',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },

        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        usuario_email: {
          type: Sequelize.STRING,
          allowNull: false
        },

        codigo: {
          type: Sequelize.STRING,
          allowNull: false
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },

      });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recuperarsenhas');
  }
};