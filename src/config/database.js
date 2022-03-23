module.exports = {

  // username: "root", //USUARIO DO BANCO DE DADOS LOCAL
  // password: "", //SENHA DO BANCO DE DADOS LOCAL
  // host: "127.0.0.1", //LOCAL

  // username: "protepidelivery", //USUARIO DO BANCO DE DADOS ONLINE
  // password: "senhafacil1970", //SENHA DO BANCO DE DADOS ONLINE
  // host: "mysql742.umbler.com", //HOST DO BANCO DE DADOS ONLINE

  username: "root", //USUARIO DO BANCO DE DADOS ONLINE (protepidelivery.com.br)
  password: "", //SENHA DO BANCO DE DADOS ONLINE (protepidelivery.com.br)
  host: "127.0.0.1", //HOST DO BANCO DE DADOS ONLINE (protepidelivery.com.br)
  //sequelize-cli db:migrate
  // database: "protepi", //NOME DO BANCO DE DADOS LOCAL E ONLINE
  database: "protepidelivery", //NOME DO BANCO DE DADOS ONLINE (protepidelivery.com.br)
  dialect: "mysql",
  operatorsAliases: 0,
  define: {
    timestamps: 1,
    underscored: 1,
    underscoredAll: 1,
  },
};

// 20210210230725-produto.js

// 20210210231558-produto.js esse é que tava