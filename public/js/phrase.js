$("#btn-phrase").click(randomPhrase);
$("#btn-phrase-select").click(phraseSearch);



//faz a requisição de uma frase aleatória junto ao servidor através do endereço http
function randomPhrase() {

    $("#preloader").fadeIn(100).show();
    restartGame();
    slowScroll($(".title"));
    $.get("http://localhost:3000/frases",changeRandomPhrase)
    .fail(function(){
        error($("#error"))
    })
    .always(function(){
        $("#preloader").hide();
    });
}


//retorna uma frase aleatória e atualiza na tela os campos palavra e tempo.
function changeRandomPhrase(data){
    
    var phrase = $(".phrase");
    var randomNumber = Math.floor(Math.random()*data.length);
    phrase.text(data[randomNumber].texto);
    updateSentenceLength();
    updateInitialTime(data[randomNumber].tempo);
    
}


//faz a requisição de uma frase com id específico enviado como parâmetro
function phraseSearch(){

    $("#preloader").fadeIn(100).show();
    restartGame();
    slowScroll($(".title"));
    var phraseId = $("#phrase-select-id").val();
    console.log(phraseId)
    var data = {id: phraseId};
    $.get("http://localhost:3000/frases",data, changePhrase)
    .fail(function(){
        error($("#error"))
    })
    .always(function(){
        $("#preloader").hide();
    });
    
}


//retorna a frase correspondente ao id enviado na requisição e atualiza na tela os campos palavra e tempo.
function changePhrase(data){

    var phrase = $(".phrase");
    phrase.text(data.texto);
    updateSentenceLength();
    updateInitialTime(data.tempo);
    console.log(data)
}




