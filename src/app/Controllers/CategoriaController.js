const Categoria = require("../models/Categoria");

class CategoriaController {

  async store(req, res) {
    const categoria = await Categoria.create(req.body);
    return res.json(
      {
        categoria,
        msg : null
      });
  }

  async index(req, res) {
    const categorias = await Categoria.findAll({
      include : ({all: true})
    });
    return res.json({
      categorias,
      error: null
    });
  }

  async buscarCategoria(req, res) {
    const { id } = req.params;
    const categorias = await Categoria.findAll({
      where: {
        id_loja : id
      },
      include: ({association: 'produto'}),
    });

    return res.json(
      {
        categorias,
        error : null
      });
  }


  
  async cadastraCategoria(req, res) {
    const { nome, id_loja } = req.body;

    const categoria = await Categoria.create({
      nome,
      id_loja
    });

    return res.json({
      categoria,
      error : null,
    });
  }


  async atualizaCategoria(req, res) {
    const { id, nome } = req.body;

    const categoria = await Categoria.findOne({
      where: {
        id,
      },
    });

    if (categoria) {
      categoria.nome = nome;
      await categoria.save();
      return res.json({
        categoria,
        error: null,
      });
    }

    return res.json({
      error: "error",
    });
  }

   async apagaCategoria(req, res) {

        const { id } = req.body;

        const categoria = await Categoria.destroy({
            where: {
                id: id,
            }
        });

        if(categoria) {
            return res.json({
                error: null
            });
        }

        return res.json({
            error: "Falha ao deletar categoria.",
        });
    }
}

module.exports = new CategoriaController();






