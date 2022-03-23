const Usuario = require("../models/Usuario");
const Recuperarsenha = require("../models/Recuperarsenha");
const bcrypt = require("bcrypt");

class UsuarioController {
  async store(req, res) {
    const usuario = await Usuario.create(req.body);
    return res.json({
      usuario,
      msg: null,
    });
  }

  async index(req, res) {
    const usuarios = await Usuario.findAll({
      include: { all: true },
    });
    return res.json({
      usuarios,
      error: null,
    });
  }

  async select(req, res) {
    const { id } = req.body;
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
      include: { all: true },
    });

    if (usuario) {
      return res.json(usuario);
    } else {
      return res.json({ error: "erro" });
    }
  }

  async verificaEmail(req, res) {
    const { email } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (usuario) {
      return res.json({
        usuario,
        error: null,
      });
    }

    return res.json({
      msg: "disponivel",
      error: "disponivel",
    });
  }

  async cadastraUsuario(req, res) {
    const { nome, email, celular, cpf, senha, data_nascimento } = req.body;

    const usuario = await Usuario.create({
      nome,
      email,
      celular,
      cpf,
      senha,
      data_nascimento,
    });

    return res.json({
      usuario,
      error: null,
    });
  }

  async atualizaUsuario(req, res) {
    const { id, nome, email,  celular, cpf, senha, data_nascimento } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });

    if (usuario) {
      usuario.nome = nome;
      usuario.email = email;
      usuario.celular = celular;
      usuario.cpf = cpf;
      usuario.data_nascimento = data_nascimento;
      if(senha !== '') {
        usuario.senha = await bcrypt.hash(senha, 10);
      }
      await usuario.save();
      return res.json({
        usuario,
        error: null,
      });
    }

    return res.json({
      error: "Usuário não atualizado.",
    });
  }

  async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
      include: [{ association: "endereco" }, { association: "carrinho" }],
    });

    if (!usuario) {
      return res.json({
        error: "Usuário não encontrado.",
      });
    }

    if (!(await bcrypt.compare(senha, usuario.senha))) {
      return res.json({
        error: "Dados de acesso incorretos.",
      });
    }

    return res.json({
      usuario,
      error: null,
    });
  }

  async mudaSenha(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (usuario) {
      usuario.senha = await bcrypt.hash(senha, 10);
      await usuario.save();

      // deleta o recuperar senha do usuário
      await Recuperarsenha.destroy({
        where: {
          usuario_email: email,
        },
      });

      return res.json({
        usuario,
        error: null,
      });
    }

    return res.json({
      error: "Não foi possivel atualizar a senha",
    });
  }

  async confirmaTrocaSenha(req, res) {
    const {id, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
   
    if (!usuario) {
      return res.json({
        error: "Usuário não encontrado.",
      });
    }

    if (!(await bcrypt.compare(senha, usuario.senha))) {
      return res.json({
        error: "Senha atual incorreta.",
      });
    }

    return res.json({
      usuario,
      error: null,
    });
  }
}

module.exports = new UsuarioController();
