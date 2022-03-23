const Sequelize = require('sequelize');

class Item extends Sequelize.Model{
    static init(sequelize){
        super.init({
            id_carrinho: Sequelize.INTEGER,
            id_produto: Sequelize.INTEGER,
            quantidade: Sequelize.INTEGER,
		},
        {
            sequelize,
			tableName: 'items',
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Carrinho, {foreignKey: 'id_carrinho', as:'carrinho'});
        this.belongsTo(models.Produto, { foreignKey: 'id_produto', as: 'produto' });        
    }
}

module.exports = Item;


