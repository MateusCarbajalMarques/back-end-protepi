'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('compras', {   
		id: 
		{
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},

		id_usuario: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references:  {model: 'usuarios', key: 'id'},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},

    pagamento_dinheiro: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },

    troco: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },

    total: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },

    data_status_pedido_realizado: {
      type: Sequelize.STRING,
      allowNull: true
    },

    hora_status_pedido_realizado: {
      type: Sequelize.STRING,
      allowNull: true
    },

    data_status_pedido_aceito: {
      type: Sequelize.STRING,
      allowNull: true
    },

    hora_status_pedido_aceito: {
      type: Sequelize.STRING,
      allowNull: true
    },

    data_status_pedido_cancelado: {
      type: Sequelize.STRING,
      allowNull: true
    },

    hora_status_pedido_cancelado: {
      type: Sequelize.STRING,
      allowNull: true
    },

    data_status_pedido_transporte: {
      type: Sequelize.STRING,
      allowNull: true
    },

    hora_status_pedido_transporte: {
      type: Sequelize.STRING,
      allowNull: true
    },

    data_status_pedido_entregue: {
      type: Sequelize.STRING,
      allowNull: true
    },

    hora_status_pedido_entregue: {
      type: Sequelize.STRING,
      allowNull: true
    },

    status_atual: {
      type: Sequelize.STRING,
      allowNull: true
    },

    modalidade_frete: {
      type: Sequelize.STRING,
      allowNull: false
    },

    valor_frete: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },

    forma_pagamento: {
      type: Sequelize.STRING,
      allowNull: false
    },

    taxa_pagamento: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },

    estado: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cidade: {
      type: Sequelize.STRING,
      allowNull: false
    },

    bairro: {
      type: Sequelize.STRING,
      allowNull: false
    },

    rua: {
      type: Sequelize.STRING,
      allowNull: false
    },

    numero: {
      type: Sequelize.STRING,
      allowNull: false
    },

    complemento: {
      type: Sequelize.STRING,
      allowNull: true
    },
	
		created_at:{
			type: Sequelize.DATE,
			allowNull: false
		},

		updated_at:{
			type: Sequelize.DATE,
			allowNull: false
		}, 
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('compras');
  }
};
