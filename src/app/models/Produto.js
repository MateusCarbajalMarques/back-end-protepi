const Sequelize = require('sequelize');

class Produto extends Sequelize.Model{
    static init(sequelize){
        super.init({
            nome: Sequelize.STRING,
            id_categoria: Sequelize.INTEGER,
            detalhes: Sequelize.STRING,
            valor: Sequelize.DOUBLE,
            foto: Sequelize.STRING,
            quantidade: Sequelize.INTEGER,
            id_loja: Sequelize.INTEGER,
		},
        {
            sequelize,
			tableName: 'produtos',
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Categoria, {foreignKey: 'id_categoria', as: 'categoria' });
        this.belongsTo(models.Loja, { foreignKey: 'id_loja', as:'loja'});
        this.hasOne(models.Item, { foreignKey: 'id_produto', as: 'item' });
    }
}

module.exports = Produto;


