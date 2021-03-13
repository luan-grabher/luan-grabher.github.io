var cobranca

//Reseta local storage para etstes
//localStorage.removeItem('cobranca');


//Se estiver setado a cobranca atual
if(localStorage.getItem('cobranca') !== null){
	cobranca = JSON.parse(localStorage.getItem('cobranca'))
	
	if(document.URL.includes('ListaFiliado')){
		//Continua código
		Model.acessarMatriculaAtual();
	}else if(document.URL.includes('EditarFiliado')){
		Model.verificarAtraso();
	}
}else if(document.URL.includes('ListaFiliado') && confirm('Deseja ver a lista de clientes para cobrar?')){
	Model.start();
}
