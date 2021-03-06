'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('carrinhos', {   
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
   return queryInterface.dropTable('carrinhos');
  }
};
