'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {   
		id: 
		{
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
    
		nome: {
			type: Sequelize.STRING,
			allowNull: false
		},

		id_categoria: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references:  { model: 'categorias', key: 'id'},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},
			
		detalhes: {
			type: Sequelize.STRING,
			allowNull: false
		},

		valor: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},

		
		foto: {
			type: Sequelize.STRING,
			allowNull: false
		},

    	quantidade: {
			type: Sequelize.INTEGER,
			allowNull: false
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
   return queryInterface.dropTable('produtos');
  
  }
};
