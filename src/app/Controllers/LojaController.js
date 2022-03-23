const Loja = require("../models/Loja");
const Recuperarsenha = require("../models/Recuperarsenha");
const bcrypt = require("bcrypt");

class LojaController {
  async store(req, res) {
    const loja = await Loja.create(req.body);
    return res.json({
      loja,
      msg: null,
    });
  }


  async index(req, res) {
    const loja = await Loja.findAll({
      
    });
    return res.json({
      loja,
      error: null,
    });
  }

  async select(req, res) {
    const { id } = req.params
    const loja = await Loja.findOne({
      where: {
        id,
      },
      include: { all: true },
    });

    if (loja) {
      return res.json(loja);
    } else {
      return res.json({ error: "erro" });
    }
  }

  async verificaEmail(req, res) {
    const { email } = req.body;

    const loja = await Loja.findOne({
      where: {
        email,
      },
    });

    if (loja) {
      return res.json({
        loja,
        error: null,
      });
    }

    return res.json({
      msg: "disponivel",
      error: "disponivel",
    });
  }

  async cadastraLoja(req, res) {
    const { 
        
        razao_social,
        cnpj,
        ins_estadual,
        endereco,
        cep, 
        email,
        whatsapp,
        nome_responsavel,
        cpf,
        rg,
        telefone,
        foto,
        senha,
     } = req.body;

    const loja = await Loja.create({

        razao_social,
        cnpj,
        ins_estadual,
        endereco,
        cep, 
        email,
        whatsapp,
        nome_responsavel,
        cpf,
        rg,
        telefone,
        foto,
        senha,
    });

    return res.json({
        loja,
      error: null,
    });
  }

  async atualizaLoja(req, res) {
    const { 
      id,
      razao_social,
      cnpj,
      ins_estadual,
      endereco,
      cep, 
      email,
      whatsapp,
      nome_responsavel,
      cpf,
      rg,
      telefone,
      foto,
      senha,
   } = req.body;

    const loja = await Loja.findOne({
      where: {
        id,
      },
    });

    if (loja) {
      loja.razao_social = razao_social,
      loja.cnpj = cnpj,
      loja.ins_estadual = ins_estadual,
      loja.endereco = endereco,
      loja.cep = cep, 
      loja.email = email,
      loja.whatsapp = whatsapp,
      loja.nome_responsavel = nome_responsavel,
      loja.cpf = cpf,
      loja.rg = rg,
      loja.telefone = telefone,
      loja.foto = foto,
      loja.senha = senha
      if(senha !== '') {
        usuario.senha = await bcrypt.hash(senha, 10);
      }
      await loja.save();
      return res.json({
        loja,
        error: null,
      });
    }

    return res.json({
      error: "Loja não atualizado.",
    });
  }

  async login(req, res) {
    const { email, senha } = req.body;

    const loja = await Loja.findOne({
      where: {
        email,
      },
      
    });

    if (!loja) {
      return res.json({
        error: "Loja não encontrado.",
      });
    }

    if (!(await bcrypt.compare(senha, loja.senha))) {
      return res.json({
        error: "Dados de acesso incorretos.",
      });
    }

    return res.json({
      loja,
      error: null,
    });
  }

  async mudaSenha(req, res) {
    const { email, senha } = req.body;

    const loja = await Loja.findOne({
      where: {
        email,
      },
    });

    if (loja) {
      loja.senha = await bcrypt.hash(senha, 10);
      await loja.save();

      // deleta o recuperar senha do usuário
      await Recuperarsenha.destroy({
        where: {
          loja_email: email,
        },
      });

      return res.json({
        loja,
        error: null,
      });
    }

    return res.json({
      error: "Não foi possivel atualizar a senha",
    });
  }

  async confirmaTrocaSenha(req, res) {
    const {id, senha } = req.body;

    const loja = await Loja.findOne({
      where: {
        id,
      },
    });
   
    if (!loja) {
      return res.json({
        error: "Usuário não encontrado.",
      });
    }

    if (!(await bcrypt.compare(senha, loja.senha))) {
      return res.json({
        error: "Senha atual incorreta.",
      });
    }

    return res.json({
      loja,
      error: null,
    });
  }
}

module.exports = new LojaController();
