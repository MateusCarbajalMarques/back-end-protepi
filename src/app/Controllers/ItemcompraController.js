const Itemcompra = require("../models/Itemcompra");
const Item = require("../models/Item");

class ItemcompraController {

  async store(req, res) {
    //nao usa
    const itemcompra = await Itemcompra.create(req.body);
    return res.json({
      itemcompra,
      error: null,
    });
  }

  async index(req, res) {
    const itemcompras = await Itemcompra.findAll({
      include : ({all:true})
    });
    return res.json({
      itemcompras,
      error: null,
    });
  }

  async select(req, res) {
    const { id_compra } = req.body;
    const itemcompra = await Itemcompra.findAll({
      where: {
        id_compra,
      },
      // include: { association: 'produto'},
    });

    return res.json({
      itemcompra,
      error : null
    });

  }

  async cadastroItemCompra(req, res) {
    const { id_compra, nome, valor, quantidade } = req.body;

    const itemcompra = await Itemcompra.create({
      id_compra,
      nome,
      valor,
      quantidade
    });
    return res.json({
      itemcompra,
      error: null,
    });
  }

  async cadastraMuitosItemCompra(req, res) {
    const { id_compra, id_carrinho, itens } = req.body;

    itens.forEach(async (item) => {
        console.log(id_compra)
        console.log(id_carrinho)
        console.log(item.nome)
        console.log(item.valor)
        console.log(item.unidades)

        await Itemcompra.create({
          id_compra,
          nome : item.nome,
          valor : item.valor,
          quantidade : item.unidades,
        });

        await Item.destroy({
          where: {
            id_carrinho,
            id_produto : item.id,
          }
        });
    });

    return res.json({
      error: null,
    });
  }
}

module.exports = new ItemcompraController();
