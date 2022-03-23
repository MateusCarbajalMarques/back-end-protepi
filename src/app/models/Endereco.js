const Sequelize = require('sequelize');

class Endereco extends Sequelize.Model{
    static init(sequelize){
        super.init({
            id_usuario: Sequelize.INTEGER,
            estado: Sequelize.STRING,
            cidade: Sequelize.STRING,
            bairro: Sequelize.STRING,
            rua: Sequelize.STRING,
            numero: Sequelize.STRING,
            complemento: Sequelize.STRING,
		},
        {
            sequelize,
			tableName: 'enderecos',
        });
        return this;
    }
    
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as:'usuario'});
    }
}

module.exports = Endereco;


