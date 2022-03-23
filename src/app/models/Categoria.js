const Sequelize = require("sequelize");

class Categoria extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "categorias",
      }
    );
    return this;
  }
  static associate(models){
    this.hasMany(models.Produto, { foreignKey: 'id_categoria', as:'produto'});
    this.belongsTo(models.Loja, { foreignKey: 'id_loja', as:'loja'});
  }
}

module.exports = Categoria;
