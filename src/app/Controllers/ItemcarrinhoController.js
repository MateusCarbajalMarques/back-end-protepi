const Item = require("../models/Item");

class ItemController {


  async store(req, res) {
    //nao usa
    const itemcarrinho = await Item.create(req.body);
    return res.json({
      itemcarrinho,
      error: null,
    });
  }

  async index(req, res) {
    const itemcarrinhos = await Item.findAll({
      include : ({association: 'produto'})
    });
    return res.json({
      itemcarrinhos,
      error: null,
    });
  }

  async select(req, res) {
    const { id_carrinho } = req.body;
    const item = await Item.findAll({
      where: {
        id_carrinho,
      },
      include: { association: 'produto'},
    });

    return res.json({
      item,
      error : null
    });

  }

  async cadastraItemCarrinho(req, res) {
    const { id_carrinho, id_produto, quantidade } = req.body;

    let item = await Item.findOne({
      where : {
        id_carrinho,
        id_produto,
      }
    });

    if(!item) {
      item = await Item.create({
        id_carrinho,
        id_produto,
        quantidade
      });
    } else {
      item.quantidade += quantidade;
      await item.save();
    }

    return res.json({
      item,
      error: null,
    });
  }

  async cadastraMuitosItemCarrinho(req, res) {
    const { id_carrinho, itens } = req.body;

    itens.forEach(async (item) => {
      console.log(item.nome, "\n");

      console.log(item.id, "\n");
      console.log(id_carrinho, "\n");

      let itemCarrinho = await Item.findOne({
        where : {
          id_carrinho,
          id_produto : item.id,
        }
      });

      if(!itemCarrinho) {
        itemCarrinho = await Item.create({
          id_carrinho,
          id_produto: item.id,
          quantidade : item.unidades
        });
      } else {
        itemCarrinho.quantidade += item.unidades;
        await itemCarrinho.save();
      }
    });

    return res.json({
      error: null,
    });
  }

  async atualizaItemCarrinho(req, res) {
    const { id_carrinho, id_produto, quantidade } = req.body;

    const item = await Item.findOne({
      where : {
        id_carrinho,
        id_produto,
      }
    });

    if(item) {
      item.quantidade = quantidade;
      await item.save();
    }

    return res.json({
      item,
      error: null,
    });
  }

  async removeItemCarrinho(req, res) {
    const { id_carrinho, id_produto } = req.body;

    const item = await Item.destroy({
      where: {
        id_carrinho,
        id_produto,
      }
    });

    return res.json({
      error: null,
    });
  }

}

module.exports = new ItemController();
