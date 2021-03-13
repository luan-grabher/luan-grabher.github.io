var cobranca;
alert("O robô está ligado!");

//Reseta local storage para testes
//localStorage.removeItem('cobranca');


//Se estiver setado a cobranca atual
if(localStorage.getItem('executando') === "SIM"){
	//copia a variavel de cobranca do local storge
	cobranca = JSON.parse(localStorage.getItem('cobranca'))
	
	/*Se tiver na pesquisa de afiliados*/
	if(document.URL.includes('ListaFiliado')){
		//Continua código
		Model.acessarMatriculaAtual();
	}
	/*Se tiver dentro do afiliado*/
	else if(document.URL.includes('EditarFiliado')){
		Model.verificarAtraso();
	}
}
/*Se não estiver executando nenhuma cobranca, pergunta se quer iniciar*/
else if(document.URL.includes('ListaFiliado') && confirm('Deseja ver a lista de clientes para cobrar?')){
	/* Pergunta quantos a pessoa quer fazer */
	var qtdLista = parseInt(prompt("Você quer verificar quantas pessoas?","1000"));
	
	if(isNaN(qtdLista){
		alert("Número inválido, irei verificar 100");
		qtdLista = 100;
	}
	
	/*Inicia a cobranca*/
	Model.start();
}
