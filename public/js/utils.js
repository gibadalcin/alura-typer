
//função de rolagem lenta
function slowScroll(element){
    var scorePosition = element.offset().top;
    
    $("html,body").animate ({
        scrollTop: scorePosition + "px"
    },1500);
}


// edita o texto de dois campos input simultâneamente retirando os espaços em branco imprimindo numeros de caracteres e palavras
function editTextField(counterOne, counterTwo){
    var content = field.val();  
    
        var amountWords = content.split(/\S+/).length-1;
        counterOne.text(amountWords);
    
        content = content.replace(/ /g,'');
        var amountCharacters = content.length;
        counterTwo.text(amountCharacters);
}


//imprime a chamada dos caracteres no plural ou singular de acordo com o número informado no campo usado como parâmetro
function singularAndPlural(singularReference, pluralReference, area){
    
    var singularText = singularReference;
    var pluralText = pluralReference;
    var applicationArea = area;

    if(applicationArea > 1 || applicationArea == 0 ){
            return pluralText;
    }else{
            return singularText;
    }
}


//exibe uma mensagem de erro em caso de falha de conexão
function error (err){
                
    $(err).fadeIn(1200).show().fadeOut(2800);
            setTimeout(function() {
        $(err).hide();
    },3500);
}


