'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('usuarios',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      celular: {
        type: Sequelize.STRING,
        allowNull: false
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },

      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },

      data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('usuarios');
  }
};
