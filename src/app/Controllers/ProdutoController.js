const Produto = require("../models/Produto");
const fs = require('fs');

class ProdutoController {
  async store(req, res) {
    //nao usa
    const produto = await Produto.create(req.body);
    return res.json({
      produto,
      error: null,
    });
  }

  async index(req, res) {
    const produtos = await Produto.findAll();
    return res.json({
      produtos,
      error: null,
    });
  }

  async buscarProduto(req, res) {
    const { id } = req.params;
    const produto = await Produto.findAll({
      where: {
        id_loja: id,
      },
    });

    return res.json({
      produto,
      error: null,
    });
  }

  async buscarProdutoLoja(req, res) {
    const { id } = req.params;
    const produto = await Produto.findAll({
      where: {
        id_loja: id,
      },
    });

    return res.json({
      produto,
      error: null,
    });
  }

  
  async buscarProdutoLoja(req, res) {
    const { id_categoria, id_loja } = req.params;

    const produto = await Produto.findAll({
      where: {
        id_categoria: id_categoria,
        id_loja: id_loja
      },
      //include: ({association: 'loja'}),
    });

    return res.json(
      {
        produto,
        error : null
      });
  }

  async cadastraProduto(req, res) {
    const { nome, id_categoria, detalhes, valor, foto, quantidade, id_loja} = req.body;

    const produto = await Produto.create({
      nome,
      id_categoria,
      detalhes,
      valor,
      foto,
      quantidade,
      id_loja
    });
    return res.json({
      produto,
      error: null,
    });
  }

  async removeProduto(req, res) {
      const { id, foto } = req.body;

      await Produto.destroy({
        where: {
          id,
        }
      });

      if(foto.split("/")[4] !== "default.png") {
        // Deletando o arquivo
        // O fs.stat serve para testar se o arquivo realmente existe, evitando bugs
        fs.stat("./uploads/"+foto.split("/")[4], (err) => {
            // Um erro significa que a o arquivo não existe, então não tentamos apagar
            if (!err) {
                //Se não houve erros, tentamos apagar
                fs.unlink("./uploads/"+foto.split("/")[4], err => {
                    if (err) console.log("Erro ao remover a imagem")
                    else console.log("Sucesso ao remover imagem");
                })
            } else console.log("arquivo não existe");
        });
      }  else {
        console.log("Imagem padrao não apagada")
      }


      return res.json({
        error: null,
      });
  }

  async atualizaProduto(req, res) {
      const {
        id,
        nome,
        id_categoria,
        detalhes,
        valor,
        foto,
        quantidade,
       } = req.body;

      const produto = await Produto.findOne({
        where: {
          id,
        }
      });

      if(produto) {
        if(produto.foto !== foto) {
          const fotoAtual = produto.foto;
          if(fotoAtual.split("/")[4] !== "default.png") {
            fs.stat("./uploads/"+fotoAtual.split("/")[4], (err) => {
                if (!err) {
                    fs.unlink("./uploads/"+fotoAtual.split("/")[4], err => {
                        if (err) console.log("Erro ao remover a imagem")
                        else console.log("Sucesso ao remover imagem");
                    })
                } else console.log("arquivo não existe");
            });
          }  else {
            console.log("Imagem padrao não apagada")
          }
          produto.foto = foto;
        }

        produto.nome = nome;
        produto.id_categoria = id_categoria;
        produto.detalhes = detalhes;
        produto.valor = valor;
        produto.quantidade = quantidade;
        await produto.save();
      }

      return res.json({
        error: null,
      });
  }

}

module.exports = new ProdutoController();
