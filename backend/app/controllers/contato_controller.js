var model_contatos = require('../models/contatos');

var controller = {};

module.exports = function() {
	var contatos = model_contatos();
	var contato_id = 1;

	controller.home = function(req, res) {
		res.render('index', 
			{ cabecalho: 'UFC Quixadá',
			  contacts: contatos 
			}
		);
	};
	
	controller.novo = function(req, res) {
		var novoNome = req.body.nome;
		var novoEmail = req.body.email;
		var pessoa = { _id: contato_id++, nome: novoNome, email: novoEmail };
		console.log('adicionar: ' + pessoa);
		contatos.push(pessoa);
		//res.json(contatos) ;
		res.json({ "status": "Adicionado"}) ;
	};


	controller.atualizar = function(req, res) {
		var id = parseInt(req.params.id);
		var novoNome = req.body.nome;
		var novoEmail = req.body.email;
		var updated = false;

		for (var i=0; i<contatos.length; i++) {
			if (contatos[i]._id === id) {
				contatos[i] = { _id: id, nome: novoNome, email: novoEmail };
				updated = true;
			}
		}

		if (updated) {
			res.json ({ "status": "Atualizado" });
		}
		else {
			res.json({ "status" : "ID não encontrado" });
		}
	};

	controller.deletar = function(req, res) {
		var id = parseInt(req.params.id);
		var deleted = false;
		
		for (var i=0; i<contatos.length; i++) {
			if (contatos[i]._id === id) {
				contatos.splice(i, 1);
				deleted = true;
				break;
			}
		} 
		if (deleted) {
			res.json({ "status": "Deletado" });
		}
		else {
			res.json({"status": "ID não encontrado" });
		}
		
	};

	controller.contatos = function(req,res) {
		res.json(contatos);
	};

	return controller;
};
