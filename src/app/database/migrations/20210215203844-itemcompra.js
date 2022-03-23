"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("itemcompras", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      id_compra: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "compras", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable("itemcompras");
  },
};
