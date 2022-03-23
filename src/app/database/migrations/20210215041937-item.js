"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("items", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      id_carrinho: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "carrinhos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "produtos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    return queryInterface.dropTable("items");
  },
};
