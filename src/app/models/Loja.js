const Sequelize = require('sequelize');
// const Endereco = require('../models/Endereco');
const bcrypt = require('bcrypt');

class Loja extends Sequelize.Model {
  static init(sequelize){
    super.init(
      {
        razao_social: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        ins_estadual: Sequelize.STRING,
        endereco: Sequelize.STRING,
        cep: Sequelize.STRING, 
        email: Sequelize.STRING,
        whatsapp: Sequelize.STRING,
        nome_responsavel: Sequelize.STRING,
        cpf: Sequelize.STRING,
        rg:Sequelize.STRING,
        telefone: Sequelize.STRING,
        foto: Sequelize.STRING,
        senha: Sequelize.STRING,
        
      },
      {
        hooks: {
          beforeCreate: async (loja, options) => {
              loja.senha = await bcrypt.hash(loja.senha, 10);
          },
        },
        sequelize,
        tableName: 'lojas',
      }
    );
    return this;
  }
  static associate(models){
    this.hasMany(models.Produto, { foreignKey: 'id_loja', as:'produto'});
    this.hasMany(models.Categoria, { foreignKey: 'id_loja', as:'categoria'});
  }
}

module.exports = Loja;