const Carrinho = require("../models/Carrinho");

class CarrinhoController {


  async store(req, res) {
    //nao usa
    const carrinho = await Carrinho.create(req.body);
    return res.json({
      carrinho,
      error: null,
    });
  }

  async index(req, res) {
    const carrinhos = await Carrinho.findAll({
      include: ({all: true})
    });
    return res.json({
      carrinhos,
      error: null,
    });
  }

  async select(req, res) {
    const { id } = req.body;
    const carrinhos = await Carrinho.findOne({
      where: {
        id,
      },
      include: { association: 'item'},
    });
    return res.json({
      carrinhos,
      error: null
    });
  }

  async cadastraCarrinho(req, res) {
    const { id_usuario } = req.body;

    const carrinho = await Carrinho.create({
      id_usuario,
    });
    return res.json({
      carrinho,
      error: null,
    });
  }

  async buscarProduto(req, res) {
    const { id } = req.body;
    const produto = await Produto.findOne({
      where: {
        id: id,
      },
    });

    return res.json({
      produto,
      error: null,
    });
  }

}

module.exports = new CarrinhoController();
