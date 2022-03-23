const Sequelize = require('sequelize');
// const Endereco = require('../models/Endereco');
const bcrypt = require('bcrypt');

class Usuario extends Sequelize.Model {
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        celular: Sequelize.STRING,
        cpf: Sequelize.STRING,
        senha: Sequelize.STRING,
        data_nascimento: Sequelize.STRING,
      },
      {
        hooks: {
          beforeCreate: async (usuario, options) => {
              usuario.senha = await bcrypt.hash(usuario.senha, 10);
          },
        },
        sequelize,
        tableName: 'usuarios',
      }
    );
    return this;
  }
  static associate(models){
    this.hasOne(models.Carrinho, { foreignKey: 'id_usuario', as:'carrinho'});
    this.hasMany(models.Endereco, { foreignKey: 'id_usuario', as:'endereco'});
    this.hasMany(models.Compra, { foreignKey: 'id_usuario', as:'compra'});
  }
}

module.exports = Usuario;