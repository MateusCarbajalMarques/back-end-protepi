const Endereco = require("../models/Endereco");
const Usuario = require("../models/Usuario");

class EnderecoController {
  async store(req, res) {
    const endereco = await Endereco.create(req.body);
    return res.json({
      endereco,
      msg: null,
    });
  }

  async index(req, res) {
    const enderecos = await Endereco.findAll();
    return res.json(enderecos);
  }

  async cadastraEndereco(req, res) {
    const { id_usuario, estado, cidade, bairro, rua, numero, complemento } = req.body;

    const endereco = await Endereco.create({
      id_usuario,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento
    });

    if (endereco) {
      return res.json({
        endereco,
        error: null,
      });
    }

    return res.json({
      error: "Erro ao criar endereço",
    });

  }

  async atualizaEndereco(req, res) {
    const { id, id_usuario, estado, cidade, bairro, rua, numero, complemento } = req.body;

    const endereco = await Endereco.findOne({
      where: {
        id,
        id_usuario
      },
    });

    if (endereco) {
      endereco.estado = estado;
      endereco.cidade = cidade;
      endereco.bairro = bairro;
      endereco.rua = rua;
      endereco.numero = numero;
      endereco.complemento = complemento;
      await endereco.save();
      return res.json({
        endereco,
        error: null,
      });
    }

    return res.json({
      error: "Endereco não atualizado.",
    });
  }

  async removeEndereco(req, res) {
    const { id, id_usuario } = req.body;

    await Endereco.destroy({
      where: {
        id,
        id_usuario
      },
    });

    return res.json({
      error: null,
    });
  }

}

module.exports = new EnderecoController();
