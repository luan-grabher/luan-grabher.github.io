var mesMaximo = 1;
var anoAtual=2021;
var inicioMatricula = 329000000;

var Model = {
	start: function(){
		/*Diz que está executando*/
		localStorage.setItem('executando','SIM');
	
		/*Define a variavel cobranca com valores padrões*/
		this.definirValorPadraoCobranca();
		/*Define o localStorage com o novo valor padrão */
		localStorage.setItem('cobranca',JSON.stringify(cobranca));
		
		/*Recarrega a Página*/
		location.reload();
	},
	acessarMatriculaAtual: function(){
		//Se a matricula atual for maior que o maximo, para execucao
		if(cobranca.atual > cobranca.maximo){
			/*Imprime a lista atual*/
			$("#ContentPlaceHolder1_upInfoFiliados").html(
				cobranca
				.lista
				.toString()
				.replaceAll(",","<br>")
			);
			/*Guarda a lista*/
			localStorage.setItem('ultimaLista',JSON.stringify(cobranca.lista));
			
			/*Termina execucao*/
			localStorage.removeItem('executando');
		}else{
			var cssInput = "input#ContentPlaceHolder1_txbMatricula";
			$(cssInput).val("RS" + cobranca.atual);
			
			var cssBtn = "input#ContentPlaceHolder1_btnPesquisar";
			$(cssBtn).click();
			
			var cssEditBtn = "input#ContentPlaceHolder1_gvInfoFiliados_ibEditar_0";
			//Espera 1 segundo pra ver se tem botao de editar
			setTimeout(function(){
				//Se botao de editar existir
				if($(cssEditBtn).attr("title")){
					$(cssEditBtn).click();
				}else{
					Model.irParaProximo();
				}
			},1000);		
		}
	},
	verificarAtraso: function(){
		var cssTable = "table#ContentPlaceHolder1_gvContFiliados_gvLancamentos_0";
		
		//Se tiver algum rejeitado na tabela
		if($(cssTable).html().includes('rejeitada')){
			
			var cssObservacao = "textarea#ContentPlaceHolder1_txbObservacao";
			var obs = $(cssObservacao).html();
			
			//procura datas
			var matches = [...obs.matchAll("[0-9]+[/][0-9]+")];
			
			//se tiver alguma data
			if(matches.length > 0){
				var data = matches[matches.length-1][0];
				var dataSplit =  data.split("/");
				var mes = parseInt(dataSplit[1]);
				//var ano = parseInt(dataSplit[2]);
				//Se o ano tiver somente 2 numeros, adiciona o 20 na frente
				//if(dataSplit[2].length == 2){
				//	ano = 2000 + ano;
				//}
				
				//ano < 2020
				//ano = 2020 e mes < mes maximo				
				/*ano < cobranca.anoAtual || (ano == cobranca.anoAtual && )*/
				if(mes < mesMaximo){
					//Adiciona na lista
					cobranca.lista.push("RS" + cobranca.atual);
				}				
			}else{
				//Adiciona na lista
				cobranca.lista.push("RS" + cobranca.atual);
			}
		}
		
		//Vai pro proximo
		Model.irParaProximo();		
	},
	irParaProximo: function(){
		cobranca.atual++;
		localStorage.setItem('cobranca',JSON.stringify(cobranca));
		localStorage.setItem('ultimaLista',JSON.stringify(cobranca.lista));
		window.location.href = "https://ctn.sistematodos.com.br/paginas/filiado/ListaFiliado.aspx";
	},
	definirValorPadraoCobranca: function(){
		
		
		var iniciarEm = inicioMatricula;
		
		/*Se existir cobranca*/
		if(localStorage.getItem('cobranca') !== null){
			/*Pega valor que tava*/
			iniciarEm = (JSON.parse(localStorage.getItem('cobranca'))).maximo
		}
	
		/*inicia variavel*/
		cobranca = {
			atual:  iniciarEm,
			maximo: iniciarEm + qtdLista
			lista: []
		}
	}
}
