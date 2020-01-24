var Pages = {
    route: function () {
        var url = document.URL.toLowerCase();

        if (url.search("/candidate") != -1 & url.search("/match") == -1) {
            localStorage.setItem("executando", "1");
            localStorage.setItem('pageNumber', "0");

            //Vai para página de procura
            //window.location.href = Links.empregosAdmCidades;
            window.open(Links.empregosAdmCidades);
            //window.location.href = "http://google.com/";
        } else if (url.search("/vagas-de-emprego") != -1) {
            //Define a página atual
            this.setPageNumber();

            if (this.pageNumber > parseInt("0")) {
                //Pega elementos
                var vagasPagina = document.querySelectorAll(".element-vaga");

                //Chama função que irá percorrer
                VagasDeEmprego.abrirPaginasVagas(vagasPagina);
                this.pageNumber++;
                VagasDeEmprego.proximaPagina(this.pageNumber);
            }else{
                this.fecharPagina();
            }
        } else if(url.search("/candidate") != -1 & url.search("/match") != -1){
            PageVaga_Model.terminarCandidatura();
        }else {
            Log.set('');
            if(PageVaga_Model.validarVaga()){
                PageVaga_Model.candidatarParaVaga();
            }
        }
    },
    setPageNumber: function () {
        var pageNumberGet = parseInt($_GET['Page']);

        var pageNroStorage = localStorage.getItem('pageNumber');
        pageNroStorage = pageNroStorage != undefined?parseInt(pageNroStorage):parseInt("0");

        if(pageNumberGet>pageNroStorage){
            this.pageNumber = pageNumberGet;
            localStorage.setItem('pageNumber', this.pageNumber);
        }else{
            this.pageNumber = parseInt("0");
        }
    },
    fecharPagina: function () {
        //Log.append("Vai fechar aba");
        //window.location.href="https://google.com";
        window.close();
    },
    pageNumber: parseInt("0")
};