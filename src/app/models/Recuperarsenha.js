const Sequelize = require('sequelize');

class Recuperarsenha extends Sequelize.Model {
  static init(sequelize){
    super.init(
      {
        usuario_id: Sequelize.INTEGER,
        usuario_email: Sequelize.STRING,
        codigo: Sequelize.STRING,
      },
      {
        sequelize
      }
    );
    return this
  }
}

module.exports = Recuperarsenha;