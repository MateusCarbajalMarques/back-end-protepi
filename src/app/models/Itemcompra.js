const Sequelize = require('sequelize');

class Itemcompra extends Sequelize.Model{
    static init(sequelize){
        super.init({ 
            id_compra: Sequelize.INTEGER,
            nome: Sequelize.STRING,
            valor: Sequelize.DOUBLE,
            quantidade: Sequelize.INTEGER,
		},
        {
            sequelize,
			tableName: 'itemcompras',
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Compra, {foreignKey: 'id_compra', as:'compra'});
    }
}

module.exports = Itemcompra;