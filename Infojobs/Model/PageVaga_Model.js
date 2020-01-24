var PageVaga_Model = {
    filtros: {
        salarioMinimo: parseFloat("1300"),
        horarioMaximo: parseFloat("19"),
        exigencias: [/*"superior", "tecnico", */"vendas", "cnh", "habilita", "firework", "macromedia", "photoshop"]
    },
    elementos: {
        tituloVaga: "span#ctl00_phMasterPage_cVacancySummary_litVacancyTitle",
        salarioVaga: "span#ctl00_phMasterPage_cVacancySummary_litSalary",
        horarioVaga: "div#ctl00_phMasterPage_divVacancy li:contains('Horário')",
        todoTexto: "#ctl00_phMasterPage_divVacancy > div.advisor-vacancy-content",
        botaoCandidatar: "a#ctl00_phMasterPage_cHeader_lnkCandidatar",
        formularioCandidatura: "div#divKiller > ul"
    },
    validarVaga: function () {
        //Se tiver titulo de vaga
        if ($(this.elementos.tituloVaga).length > 0) {
            if (this.salarioValido()) {
                if (this.horarioValido()) {
                    //Validar exigencias --> remover superior e tecnico
                    //Validar descricao / exigencias --> remover vendas, cnh ou habilitação
                    if (this.exigenciasValidas()) {
                        //Log.set("Esta aba ficará ativa");
                        return true;
                    }
                }
            }
        }

        Pages.fecharPagina();
        return false;
    },
    candidatarParaVaga: function () {
        try {

            //candidatar para vaga clicando no bagulho
            //cuidado que abre outra pagina de vagas, tem que fechar
            document.querySelector(this.elementos.botaoCandidatar).click();
        } catch (error) {
        }
    },
    terminarCandidatura: function () {
        if ($(this.elementos.formularioCandidatura).length > 0) {
            //Muda titulo paag indicar
            document.title = "TERMINAR FORMULÁRIO";
        }else{
            Pages.fecharPagina();
        }

    },
    salarioValido: function () {
        try {
            var elemento = $(this.elementos.salarioVaga);
            if (elemento.length > 0) {
                var salarioStr = elemento.text();
                var salarioSplit = salarioStr.split(" a ");
                var ultimoNumeroSalarioStr = salarioSplit[salarioSplit.length - 1];
                var salarioStrNumber = ultimoNumeroSalarioStr.replace(/[^0-9,]+/g, ""); /*Remove diferente de numeros e virgula*/
                var salarioFloat = parseFloat(salarioStrNumber);
                /*Diferente de Nan, ou seja, é um numero*/
                if (!isNaN(salarioFloat)) {
                    if (salarioFloat >= this.filtros.salarioMinimo) {
                        return true;
                    }
                }
            }
        } catch (error) {
        }
        return false;
    },
    horarioValido: function () {
        try {
            var elemento = $(this.elementos.horarioVaga);
            if (elemento.length > 0) {
                try {
                    var horarioStr = elemento.text();
                    var horariosRegex = horarioStr.match(/[0-9]+/g);
                    var ultimoHorarioStr = horariosRegex[horariosRegex.length - 1];
                    var horarioFloat = parseFloat(ultimoHorarioStr);


                    if (horarioFloat > this.filtros.horarioMaximo) {
                        return false;
                    }
                } catch (error) {
                    return false;
                }
            }
        } catch (error) {
        }
        return true;
    },
    exigenciasValidas: function () {
        try {
            var elemento = $(this.elementos.todoTexto);
            if (elemento.length > 0) {
                var descricaoVaga = elemento.text().toLowerCase() + $(this.elementos.tituloVaga).text().toLowerCase();
                //Procura todos
                for (let index = 0; index < this.filtros.exigencias.length; index++) {
                    var exigencia = this.filtros.exigencias[index];
                    if (descricaoVaga.search(exigencia) != -1) {
                        return false;
                    }
                }
            }
        } catch (error) {
        }
        return true;
    }

};