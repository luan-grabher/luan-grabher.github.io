var dataAtual = new Date();
var diaAtual = dataAtual.getDate();
var mesAtual = dataAtual.getMonth() + 1;
var anoAtual= dataAtual.getFullYear();
var inicioMatricula = 329000100;

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
		var primeiraBolinha = $("#ContentPlaceHolder1_gvContFiliados_gvLancamentos_0_ibStatusLancamento_0").attr("src");
		var formaPagamento = $("#ContentPlaceHolder1_gvContFiliados_lbFormaReceb_0").html();
		
		//Se tiver algum rejeitado na tabela
		if(
			(primeiraBolinha.includes('aberta') /*não pode ser amarela*/
			|| primeiraBolinha.includes('rejeitada'))
			&& formaPagamento !== "CAIXA ECONOMICA FEDERAL" /*nao pode caixa federal*/
		){									
			//procura datas
			var matches = [...obs.matchAll("[0-9]+[/][0-9]+")];
			
			var addOnList = false;
			
			//se tiver alguma data
			if(matches.length > 0){
				var data = matches[matches.length-1][0];
				var dataSplit =  data.split("/");
				var mes = parseInt(dataSplit[1]);

				if(mes !== mesAtual && mes !== (mesAtual -1)){
					addOnList = true;
				}				
			}else{
				addOnList = true;
			}
			
			if(addOnList){
				var nome = $("#ContentPlaceHolder1_txbNomeFiliado").val();
				var numero = $("#ContentPlaceHolder1_txbTelFiliado").val();
				
				//Adiciona na lista
				cobranca.lista.push("RS" + cobranca.atual + " - " + nome + " - " + numero);
				//DEfine observação como da Bruna
				//definirObservacao();
				
				//Espera 1s para grvavar
				setTimeout(function(){},1000);
			}
		}
		
		//Vai pro proximo
		Model.irParaProximo();		
	},
	definirObservacao: function(){
		var cssObservacao = "textarea#ContentPlaceHolder1_txbObservacao";
		var cssGravar = "#ContentPlaceHolder1_btnSalvar";
		var obs = $(cssObservacao).html();
		
		$(cssObservacao).val(obs + "\n" + diaAtual  +"/" + mesAtual + "/" + anoAtual + " contato Bruna");
		
		$(cssObservacao).click();		
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
			iniciarEm = (JSON.parse(localStorage.getItem('cobranca'))).maximo;
		}
	
		/*inicia variavel*/
		cobranca = {
			atual:  iniciarEm,
			maximo: iniciarEm + qtdLista,
			lista: []
		}
	}
}
