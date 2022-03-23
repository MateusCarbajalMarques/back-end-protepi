"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("enderecos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      rua: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("enderecos");
  },
};
