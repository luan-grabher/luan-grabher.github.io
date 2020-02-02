var $_GET=[];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});

var Links = {
    empregosAdm : "https://www.infojobs.com.br/empregos.aspx?Palabra=auxiliar%20administrativo"
    ,empregosAdmRS: "https://www.infojobs.com.br/vagas-de-emprego-auxiliar+administrativo+recepcionista-em-rio-grande-do-sul.aspx?Categoria=51&TipoContrato=2&Page=1"
    ,empregosAdmCidades: "https://www.infojobs.com.br/vagas-de-emprego-auxiliar+administrativo+recepcionista-em-porto-alegre,-rs.aspx?Categoria=51&Poblacion=5209591,5209085,5208982,5209127,5209343&TipoContrato=2&Page=1"
}

var Log = {
    selector: "body#ctl00_Body > div",
    set: function(message){
        $(this.selector).html(message);
    },
    get: function(){
        return $(this.message).text();
    },
    append: function(message){
        var before = $(this.selector).html();

        this.set(before + "<br>" +  message);
    },
    prepend: function(message){
        var before = $(this.selector).html();

        this.set(message + "<br>" + before);
    }
};

var Elementos = {
    hasAttr: function(jqueryElement,nameAttr){
        var attr = jqueryElement.attr(nameAttr);
        return typeof attr !== typeof undefined && attr !== false;
    }
};

var AppControl = {
    main: function () {
        var executarRobo = localStorage.getItem('executando');
        if(executarRobo != 1){
            executarRobo = confirm("O robô está pronto para ser executado, deseja iniciar?");
        }

        if (executarRobo){
            Pages.route();
        }else{
            alert('Tudo bem então. Caso mude de ideia, basta recarregar a página e escolher a opção sim.');
        }
    }
};


AppControl.main();
