var initialTime = $("#typing-time").text();
var field = $(".typing-field");

//chama todas as funções ao carregar a página
$(function(){
    
    updateSentenceLength();
    actionsInputField();
    initializeBookmarks();
    startTimer();
    
    $("#btn-reload").click(restartGame);
    scoreUpdate();

    $("#users").selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster({
        trigger:'custom'
    });
});


//atualiza os indicadores de número de palavras na frase escolhida eliminando os espaços e exibe o tempo definido do cronômetro
function updateSentenceLength(){
    var phrase = $(".phrase").text();
    var numberOfWords = phrase.split(/\S+/).length-1; 

    $("#sentence-length").text(numberOfWords);   

    $("#word-text").text(
         singularAndPlural(
             " palavra",
             " palavras",
             $("#sentence-length").text()
        )
    );
}


/*escuta as interações no campo de input, identifica o número de palavras digitadas em tempo real,
e executa as funções necessárias*/
function actionsInputField(){

    field.on("input", function(){

        editTextField(
            $("#word-counter"),
            $("#character-counter")
        );

        $("#text-Characters").text(
            singularAndPlural(
                " caracter",
                " caracteres",
                $("#character-counter").text()
            )
        );

        $("#typed-words").text(
            singularAndPlural(
                " palavra",
                " palavras",
                $("#word-counter").text()
            )
        );
    });
}


//inicia a contagem regressiva do cronômetro quando identifica o evento focus no campo input
function startTimer() {
    
    field.one("focus", function(){
        var timeLeft =$("#typing-time").text();
        
        var cronometroID = setInterval(function(){
            timeLeft--;
            $("#typing-time").text(timeLeft);

            $("#btn-phrase").attr(
                "disabled",
                true);

                $("#btn-phrase-select").attr(
                    "disabled",
                    true);
            
                if(timeLeft < 1){

                    clearInterval(cronometroID);
                    endGame();
                }else{
                
                $("#seconds-text").text(
                    singularAndPlural(
                        " segundo",
                        " segundos",
                        $("#typing-time").text()
                    )
                );      
            }
            
        },1000);
    });
};
 

function updateInitialTime(time){
    initialTime = time;
    $("#typing-time").text(time);
}


//finaliza o jogo, grava o resultado e reinicia a tela
function endGame() {

    $("#seconds-text").text(
        singularAndPlural(
            " segundo",
            " segundos",
            $("#typing-time").text()));

    field.attr(
        "disabled",
         true);    

    field.addClass("field-disabled"); // pode ser usado o toglleClass para substituir o addClass/removeClass

    $("#btn-phrase").attr(
        "disabled",
        false);

        $("#btn-phrase-select").attr(
            "disabled",
            false);

    insertScore();
}


/*responsável pela mudança de cor da borda do campo input de acordo com o resultado da comparação
 em tempo real entre as palavras digitadas e a frase de referencia.*/
function initializeBookmarks(){

    field.on('input', function(){

        var phrase = $(".phrase").text();
        var typed = field.val();
        var comparable = phrase.substr(0,typed.length);

        if(typed == comparable){

            field.addClass("border-green");
            field.removeClass("border-red");
        }else{

            field.addClass("border-red");
            field.removeClass("border-green");
        }
    });
}


//responsável pelas ações do evento click do btn-reload
function restartGame(){ 

    if($("#typing-time").text() < 1) {

        field.attr("disabled", false);
        field.val("");
        $("#word-counter").text("0");
        $("#character-counter").text("0");
        $("#typing-time").text(initialTime);
        startTimer();
        field.removeClass("field-disabled");
        field.removeClass("border-green");
        field.removeClass("border-red");

        slowScroll($(".phrase"));
    }
}



         


  


