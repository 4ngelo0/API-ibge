$(document).ready(function () {


    // AJAX DOS ESTADOS
    $.ajax({
        type: "get",
        datatype: "json",
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
        data: { orderBy: "nome" }, //ordernar em forma alfabética de acordo com a documentação da api
        success: function (value) {
            $.each(value, function (indexInArray, valueOfElement) {
                //$.each é criado um laço de repetição
                var option = "<option>" + valueOfElement.sigla + "</option>"; //criar a variavél com as opções do select
                $("#uf").append(option); //mostra a opção que foi criado na linha acima
            });
        },
    });

$('#cidade').hide();
$('#label-cidade').hide();

    $("#uf").change(function(e){
        e.preventDefault();
        $("#cidade").empty();
        $('#cidade').show();
        $('#label-cidade').show();
        let uf = $("#uf").val();


        if (uf == "Estados") {
            var option = "<option>Cidades</option>";
            $("#cidade").append(option);
            return;
        }


        // AJAX DAS CIDADES
        $.ajax({
            type: "get",
            datatype: "json",
            url:"https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+uf+"/municipios",
            data: { orderBy: "nome" }, //ordernar em forma alfabética de acordo com a documentação da api
            success: function (value) {
                $.each(value, function (indexInArray, valueOfElement) {
                    //$.each é criado um laço de repetição
                    var option = "<option>" + valueOfElement.nome + "</option>"; //criar a variavél com as opções do select
                    $("#cidade").append(option); //mostra a opção que foi criado na linha acima
                });
            }
        });
    });

    //n apagar
});
