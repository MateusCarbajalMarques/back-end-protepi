const {Router} = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer'); // configurações do upload da foto

const routes = new Router();

const UsuarioController = require('./app/Controllers/UsuarioController');
const RecuperarsenhaController = require('./app/Controllers/RecuperarsenhaController');
const CategoriaController = require('./app/Controllers/CategoriaController');
const ProdutoController = require('./app/Controllers/ProdutoController');
const EnderecoController = require('./app/Controllers/EnderecoController');
const CarrinhoController = require('./app/Controllers/CarrinhoController');
const ItemcarrinhoController = require('./app/Controllers/ItemcarrinhoController');
const CompraController = require('./app/Controllers/CompraController.js');
const ItemcompraController = require('./app/Controllers/ItemcompraController.js');
const LojaController = require('./app/Controllers/LojaController.js');

//ROTAS DOS USUARIOS
// routes.post('/usuarios', UsuarioController.store);
routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios/verificaemail', UsuarioController.verificaEmail);
routes.post('/usuarios/cadastro', UsuarioController.cadastraUsuario);
routes.post('/usuarios/update', UsuarioController.atualizaUsuario);
routes.post('/usuarios/autenticacao', UsuarioController.login);
routes.post('/usuarios/mudaSenha', UsuarioController.mudaSenha);
routes.post('/usuarios/select', UsuarioController.select);
routes.post('/usuarios/senhaatual', UsuarioController.confirmaTrocaSenha);

//ROTAS DOS ENDEREÇO
routes.post('/enderecos', EnderecoController.store);
routes.get('/enderecos', EnderecoController.index);
routes.post('/enderecos/cadastro', EnderecoController.cadastraEndereco);
routes.post('/enderecos/atualizacao', EnderecoController.atualizaEndereco);
routes.post('/enderecos/remocao', EnderecoController.removeEndereco);

//ROTAS DOS PRODUTOS
// routes.post('/usuarios', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);

routes.get('/produtos/buscarproduto/:id', ProdutoController.buscarProduto);

//routes.get('/produtos/buscarproduto/:id', ProdutoController.buscarProdutoLoja);

routes.post('/produtos/cadastro', ProdutoController.cadastraProduto);
routes.post('/produtos/remocao', ProdutoController.removeProduto);
routes.post('/produtos/update', ProdutoController.atualizaProduto);
routes.post('/produtos/cadastro/foto', multer(multerConfig).single('foto'), (req, res) => {
  if (req.file) console.log(req.file)
  return res.json({
    caminhoFoto : req.file.filename,
    error : null
  });
});

//ROTAS DAS RECUPERAÇÕES DE SENHA
routes.post('/recuperarsenha', RecuperarsenhaController.store);
routes.get('/recuperarsenha', RecuperarsenhaController.index);
routes.post('/recuperarsenha/cadastro', RecuperarsenhaController.cadastraRecuperarSenha);
routes.post('/recuperarsenha/busca', RecuperarsenhaController.buscaRecuperarSenha);

//ROTAS DAS CATEGORIAS
routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.post('/categorias/cadastro', CategoriaController.cadastraCategoria);
routes.post('/categorias/update', CategoriaController.atualizaCategoria);
routes.post('/categorias/delete', CategoriaController.apagaCategoria);
routes.get('/categorias/select/:id', CategoriaController.buscarCategoria);


routes.get('/categorias/all/:id_categoria/:id_loja', ProdutoController.buscarProdutoLoja);


//ROTAS DOS CARRINHOS
routes.get('/carrinhos', CarrinhoController.index);
routes.post('/carrinhos/cadastro', CarrinhoController.cadastraCarrinho);
routes.post('/carrinhos/seleciona', CarrinhoController.select);

//ROTAS DOS ITEMS DOS CARRINHOS
routes.get('/itemcarrinhos', ItemcarrinhoController.index);
routes.post('/itemcarrinhos/cadastro', ItemcarrinhoController.cadastraItemCarrinho);
routes.post('/itemcarrinhos/cadastromuitos', ItemcarrinhoController.cadastraMuitosItemCarrinho);
routes.post('/itemcarrinhos/atualizacao', ItemcarrinhoController.atualizaItemCarrinho);
routes.post('/itemcarrinhos/remove', ItemcarrinhoController.removeItemCarrinho);
routes.post('/itemcarrinhos/seleciona', ItemcarrinhoController.select);

//ROTAS DAS COMPRAS
routes.get('/compras', CompraController.index);
routes.post('/compras/seleciona/status', CompraController.filtrarComprasStatus);
routes.post('/compras/cadastro', CompraController.cadastroCompra);
routes.post('/compras/seleciona', CompraController.select);
routes.post('/compras/seleciona/unica', CompraController.selectOneBuy);
routes.post('/compras/conta', CompraController.counterPurchasingReceived);
routes.post('/compras/update/status', CompraController.atualizaStatus);



//ROTAS DAS ITEM COMPRAS
routes.get('/itemcompras', ItemcompraController.index);
routes.post('/itemcompras/cadastro', ItemcompraController.cadastroItemCompra);
routes.post('/itemcompras/cadastromuitos', ItemcompraController.cadastraMuitosItemCompra);
routes.post('/itemcompras/seleciona', ItemcompraController.select);

//ROTAS DAS LOJAS 
routes.post('/cadastro/lojas',LojaController.cadastraLoja);
routes.get('/lista/lojas',LojaController.index);
routes.get('/lista/lojas/:id',LojaController.select);
routes.post('/loja/autenticacao',LojaController.login);


routes.get('/', (req, res) =>{
  res.json({message: 'API funcionando'})
})


module.exports = routes;


// SELECT * FROM compras WHERE status_atual = 'Aceito'
