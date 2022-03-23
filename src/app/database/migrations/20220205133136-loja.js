'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('lojas', 
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
  
        razao_social: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cnpj:{
          type: Sequelize.STRING,
          allowNull: false
        },
        ins_estadual: {
          type: Sequelize.STRING,
          allowNull: false
        },
        endereco: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cep: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        whatsapp: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nome_responsavel: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false
        },
        rg: {
          type: Sequelize.STRING,
          allowNull: false
        },
        telefone: {
          type: Sequelize.STRING,
          allowNull: false
        },
        foto: {
          type: Sequelize.STRING,
          allowNull: false
        },
        senha: {
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

      })
   
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lojas');
   
  }
};
