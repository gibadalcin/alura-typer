$("#btn-score").click(showScore);
$("#btn-sync").click(synchronizeScore);


function insertScore() {
    var dataTable = $(".score").find("tbody");
    var user = "Milk Raio";
    var numberWords = $("#word-counter").text();
    var numberCharacters = $("#character-counter").text(); 

    var row = newRow(user,numberCharacters,numberWords);

    row.find(".btn-remove").click(removeLine);
             
    /*prepend insere a linha antes do conteúdo existente na tabela
    o append insere a linha depois do conteúdo existente*/
    dataTable.append(row);
    
    $(".score").slideDown(1500);
    slowScroll($(".score"));
}


/*cria um objeto em memória com os valores informados por parâmetro para inserir na tabela uma nova linha
possibilitando atrelar a um item desse objeto um evento click*/
function newRow(user,numberCharacters,numberWords){
    var row = $("<tr>");

    var userColumn =$("<td>").text(user);
    var charactersColumn =$("<td>").text(numberCharacters);
    var wordsColumn =$("<td>").text(numberWords);
    var iconRemoveColumn =$("<td>");

    var link = $("<a>").addClass("btn-remove").attr("href","#line-one");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone);
    iconRemoveColumn.append(link);
    row.append(userColumn,charactersColumn, wordsColumn, iconRemoveColumn);

    return row;
}


//função que remove a linha selecionada
function removeLine(){

    var line = $(this).parent().parent()

    line.fadeOut(600);

    setTimeout(function(){
        line.remove();
    },800); 
}


//exibe/oculta o placar
function showScore(){
    $(".score").stop().slideToggle(600);
}

function synchronizeScore(){
    var score = [];
    var lines = $("tbody tr");
    lines.each(function(){
        var user = $(this).find("td:nth-child(1)").text();
        var numberCharacters = $(this).find("td:nth-child(2)").text();
        var numberWords = $(this).find("td:nth-child(3)").text();
        
        var userScore = {
            user: user,
            characterPoints: numberCharacters,
            wordsPoints: numberWords
        }
        score.push(userScore);      
    });  

    var data = {
        placar: score
    };

    $.post("http://localhost:3000/placar",data, function(){

        console.log("salvou os dados no servidor");
    })

}

function scoreUpdate(){

    $.get("http://localhost:3000/placar", function(data){

        $(data).each(function(){

            var line = newRow(
                this.user,
                this.characterPoints,
                this.charactersColumn
            );
            line.find(".btn-remove").click(removeLine);
            $("tbody").append(line);
        })
    });
}
