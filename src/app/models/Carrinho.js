const Sequelize = require('sequelize');

class Carrinho extends Sequelize.Model{
    static init(sequelize){
        super.init({
            id_usuario: Sequelize.INTEGER,
		},
        {
            sequelize,
			tableName: 'carrinhos',
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });        
        this.hasMany(models.Item, { foreignKey: 'id_carrinho', as: 'item' });
    }
}

module.exports = Carrinho;