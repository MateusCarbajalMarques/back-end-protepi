const Sequelize = require('sequelize');

const Usuario = require('../models/Usuario');
const Recuperarsenha = require('../models/Recuperarsenha');
const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');
const Carrinho = require('../models/Carrinho');
const Item = require('../models/Item');
const Compra = require('../models/Compra');
const Itemcompra = require('../models/Itemcompra');
const Endereco = require('../models/Endereco');
const Loja = require('../models/Loja');


const databaseConfig = require('../../config/database');

const models = [Usuario, Recuperarsenha, Categoria, Produto, Carrinho, Item, Compra, Itemcompra, Endereco, Loja];

class Database {
  constructor() {
    this.init();
  }

  init(){

    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();