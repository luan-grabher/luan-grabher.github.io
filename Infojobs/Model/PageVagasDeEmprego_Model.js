var VagasDeEmprego = {
    abrirPaginasVagas: function (elements) {
        Log.set("");
        //Percorre todos elementos
        elements.forEach(element => {
            try {
                //Se não tiver o icone de PCD
                if($(element).find(this.elementos.pcd).length == 0){
                    var hrefVaga = $(element).find(this.elementos.link).first().attr("href");
                    window.open(hrefVaga);
                }
            } catch (error) {
                Log.append("Error:" + error);
            }
        });
    },
    proximaPagina: function(pageNumber){    
        if($(this.elementos.botaoProximaPagina).length > 0){
            //window.location.href = Links.empregosAdmCidades.replace("Page=1","Page=" + this.pageNumber);
            document.querySelector(this.elementos.botaoProximaPagina).click();
        }else{
            document.title = "Parabains, terminou heheh";
            Pages.fecharPagina();
        }
    },
    elementos:{
        horaPub: "span.data",
        propaganda: ".sponsor-text",
        pcd: "span.PCD > span",
        link: ".vaga > a",
        botaoProximaPagina: "a#ctl00_phMasterPage_cGrid_Paginator1_lnkNext"
    }
};