const Sequelize = require('sequelize');

class Compra extends Sequelize.Model{
    static init(sequelize){
        super.init({
            id_usuario: Sequelize.INTEGER,
            pagamento_dinheiro: Sequelize.DOUBLE,
            troco: Sequelize.DOUBLE,
            total: Sequelize.DOUBLE,
            data_status_pedido_realizado: Sequelize.STRING,
            hora_status_pedido_realizado: Sequelize.STRING,
            data_status_pedido_aceito: Sequelize.STRING,
            hora_status_pedido_aceito: Sequelize.STRING,
            data_status_pedido_cancelado: Sequelize.STRING,
            hora_status_pedido_cancelado: Sequelize.STRING,
            data_status_pedido_transporte: Sequelize.STRING,
            hora_status_pedido_transporte: Sequelize.STRING,
            data_status_pedido_entregue: Sequelize.STRING,
            hora_status_pedido_entregue: Sequelize.STRING,
            status_atual: Sequelize.STRING,
            modalidade_frete: Sequelize.STRING,
            valor_frete: Sequelize.DOUBLE,
            forma_pagamento: Sequelize.STRING,
            taxa_pagamento: Sequelize.STRING,
            estado: Sequelize.STRING,
            cidade: Sequelize.STRING,
            bairro: Sequelize.STRING,
            rua: Sequelize.STRING,
            numero: Sequelize.STRING,
            complemento: Sequelize.STRING,
		},
        {
            sequelize,
			tableName: 'compras',
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as:'usuario'});
        this.hasMany(models.Itemcompra, { foreignKey: 'id_compra', as: 'itemcompra' })
    }
}

module.exports = Compra;


