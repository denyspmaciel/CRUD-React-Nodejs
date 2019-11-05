// rotas
var controller = require('../controllers/contato_controller')();

module.exports = function(app) {
	//app.get('/', controller.home);
	app.get('/contatos', controller.contatos);

	app.post('/contatos', controller.novo);

	app.put('/contatos/:id', controller.atualizar);

	app.delete('/contatos/:id', controller.deletar);
}