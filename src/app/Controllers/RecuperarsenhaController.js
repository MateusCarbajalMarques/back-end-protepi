const Recuperarsenha = require('../models/Recuperarsenha');
const nodemailer = require('nodemailer');
const emailConfig = require('../../config/email'); // configurações do email
class RecuperarsenhaController {
  async store(req, res) {
    const recuperarsenha = await Recuperarsenha.create(req.body);

    return res.json(recuperarsenha);
  }

  async index(req, res){
    const senhasrecuperadas  = await Recuperarsenha.findAll();

    return res.json(senhasrecuperadas);
  }

  async cadastraRecuperarSenha(req, res) {
        const {
          usuario_id,
          usuario_email,
        } = req.body;

        let codigo = "";
        for(let i = 0; i < 6; i++) {
          codigo += Math.floor(Math.random() * 10).toString(); // gera numero inteiro entre 0 e 9, e passa para string
        }

        // Verifica se esse usuário ja tentou recuperar senha
        const buscaRecuperarSenha = await Recuperarsenha.findOne({
          where: {
            usuario_id,
          }
        });

        let recuperarsenha;

        if (buscaRecuperarSenha) { // caso já exista um recuperar senha desse usuário, somente atualiza o código

          buscaRecuperarSenha.codigo = codigo;
          await buscaRecuperarSenha.save();

        } else { // caso contrário, cria um recuperar senha para ele

          recuperarsenha = await Recuperarsenha.create({
            usuario_id,
            usuario_email,
            codigo
          });

        }

        let transporter = nodemailer.createTransport(emailConfig);

        transporter.sendMail({
          from: "PROT'epi Delivery <equipe@protepidelivery.com.br>", // remetente do email
          to: usuario_email, // destinatário do email
          subject: "Solicitação de redefinição de senha PROT'epi Delivery", // titulo do email
          // html: "<h4>Envio de email com Nodemailer</h4><br>Código: "+codigo, // html do email
          html:
            "<body style='background-color: #f7f7f7; padding: 20px 0;'>"+
              "<div style='border: 1px solid #E9E5E5; width: 100%; max-width: 600px; background-color: #fff; margin: 0 auto; '>"+
                "<div class='image' style='display: flex; flex-direction: column; align-items: center; margin-top: 2rem;'>"+
                    "<img src='http://protepidelivery.com.br/images/logoname.png' alt='logo PROTepi Delivey' style='width: 150px; margin: 0 auto;'>"+
                "</div>"+

                "<div style='background-color: #1389DF; width: 100%; padding: 10px; box-sizing: border-box'>"+
                    "<h1 style='color: #fff; text-align: center; font-family: sans-serif; font-size: 1.5rem; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'>"+
                        "Pedido de redefinição de senha"+
                    "</h1>"+
                "</div>"+

                "<div>"+
                    "<p style='text-align: center; font-family: sans-serif; font-size: 1rem; line-height: 1.6; color: #454343; padding: 20px 40px 30px 40px'>"+
                        "Olá, para validarmos seu acesso a redefinição de senha, <strong>use o código abaixo no campo informado no app:</strong>"+
                    "</p>"+
                "</div>"+

                "<div style='background-color: #f8f8f8;'>"+
                    "<h2 style='text-align: center; font-family: sans-serif; font-size: 2.5rem; font-weight: 700; color: #1389DF; padding: 20px 40px'>"+
                        codigo+
                    "</h2>"+
                "</div>"+

                "<div>"+
                    "<p style='text-align: center; font-family: sans-serif; font-size: 1rem; line-height: 1.6; color: #454343; padding: 20px 40px'>"+
                        "Abraços, <br>Equipe PROT'epi Delivery"+
                    "</p>"+
                "</div>"+
              "</div>"+
            "</body>"
        }).then(menssage => {
          console.log("E-mail enviado!");
          const resposta = buscaRecuperarSenha ? buscaRecuperarSenha : recuperarsenha;
          return res.json({
            resposta,
            error: null
          });
        }).catch(err => {
          return res.json({
            error : "Error ao enviar e-mail"
          });
        });
    }

  async buscaRecuperarSenha(req, res) {
    const {
      codigo,
      usuario_id,
      usuario_email,
    } = req.body;

    // verifica se o código passado pertence ao email
    const buscaCodigo = await Recuperarsenha.findOne({
      where: {
        codigo,
        usuario_id,
        usuario_email,
      }
    });

    if (buscaCodigo) {

      return res.json({
        buscaCodigo,
        error: null
      });

    }

    return res.json({
      error: "Código não encontrado"
    });


  }



}

module.exports = new RecuperarsenhaController();