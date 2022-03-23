const Compra = require("../models/Compra");

class CompraController {
  async store(req, res) {
    //nao usa
    const compra = await Compra.create(req.body);
    return res.json({
      compra,
      error: null,
    });
  }

  async index(req, res) {
    const compras = await Compra.findAll({
      include: { all: true },
    });
    return res.json({
      compras,
      error: null,
    });
  }

  async filtrarComprasStatus(req, res) {
    const  { status } = req.body;
    let compras;
    if(status === 'Todos') {
      compras = await Compra.findAll({
        include: { all: true },
      });
    } else {
      compras = await Compra.findAll({
        where : { status_atual : status },
        include: { all: true },
      });
    }

    return res.json({
      compras,
      error: null,
    });
  }

  async cadastroCompra(req, res) {
    const {
      id_usuario,
      pagamento_dinheiro,
      troco,
      total,
      data_status_pedido_realizado,
      hora_status_pedido_realizado,
      data_status_pedido_aceito,
      hora_status_pedido_aceito,
      data_status_pedido_cancelado,
      hora_status_pedido_cancelado,
      data_status_pedido_transporte,
      hora_status_pedido_transporte,
      data_status_pedido_entregue,
      hora_status_pedido_entregue,
      status_atual,
      modalidade_frete,
      valor_frete,
      forma_pagamento,
      taxa_pagamento,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
    } = req.body;

    const compra = await Compra.create({
      id_usuario,
      pagamento_dinheiro,
      troco,
      total,
      data_status_pedido_realizado,
      hora_status_pedido_realizado,
      data_status_pedido_aceito,
      hora_status_pedido_aceito,
      data_status_pedido_cancelado,
      hora_status_pedido_cancelado,
      data_status_pedido_transporte,
      hora_status_pedido_transporte,
      data_status_pedido_entregue,
      hora_status_pedido_entregue,
      status_atual,
      modalidade_frete,
      valor_frete,
      forma_pagamento,
      taxa_pagamento,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
    });
    return res.json({
      compra,
      error: null,
    });
  }

  async select(req, res) {
    const { id_usuario } = req.body;
    const compras = await Compra.findAll({
      where: {
        id_usuario,
      },
    });
    return res.json({
      compras,
      error: null,
    });
  }

  async counterPurchasingReceived(req, res) {
    const { Op } = require("sequelize");
    const { status } = req.body;
    const compras = await Compra.findAndCountAll({
      where: {
        status_atual: {
          [Op.like] : status
         }
      },
      // offset: 10,
      // limit: 2
    })
    // .then(result => {
    //   console.log(result.count);
    //   console.log(result.rows);
    // })
    return res.json({
      compras,
      error: null,
    })
  }

  async selectOneBuy(req, res) {
    const { id, id_usuario } = req.body;
    const compras = await Compra.findOne({
      where: {
        id,
        id_usuario,
      },
    });
    return res.json({
      compras,
      error: null,
    });
  }

  async atualizaStatus(req, res) {
    const { id, id_usuario, status_atual, hora, data } = req.body;

    const compras = await Compra.findOne({
      where: {
        id,
        id_usuario,
      },
    });

    if(compras) {
      compras.status_atual = status_atual;

      switch(status_atual) {
        case 'Aprovado':
          compras.data_status_pedido_aceito = data;
          compras.hora_status_pedido_aceito = hora;
        break;

        case 'Saiu para entrega':
          compras.data_status_pedido_transporte = data;
          compras.hora_status_pedido_transporte = hora;
        break;

        case 'Entregue':
          compras.data_status_pedido_entregue = data;
          compras.hora_status_pedido_entregue = hora;
        break;

        case 'Cancelado':
          compras.data_status_pedido_cancelado = data;
          compras.hora_status_pedido_cancelado = hora;
        break;
      }

      await compras.save();

    }

    return res.json({
      compras,
      error: null,
    });
  }
}

module.exports = new CompraController();
