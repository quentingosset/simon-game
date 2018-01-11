const BLUE = $('.button-blue');    
const YELLOW = $('.button-yellow');    
const RED = $('.button-red');    
const GREEN = $('.button-green'); 
const SOUNDBLUE = $('#sound0');
const SOUNDYELLOW = $('#sound1');
const SOUNDRED = $('#sound2');
const SOUNDGREEN = $('#sound3');
const SOUNDERROR = $('#sound4');
let level = 0;
let color = 1; 

$('.start').click(function(){
   // blink(BLUE,500);
    let suiteSimons = [];
    let suiteUsers = [];
    let i = 0;
    // simon play and make a suite for the user
    //simonPlay(level,color,suiteSimons);
    // user need find this serie, if find the good serie, add level and +1 in color, if lose , restart.
    //userPlay(suiteSimons);
    initGame(level,color,suiteSimons);
});
function check(suiteSimons,suiteUsers){
    console.log("SUITEUSER : "+suiteUsers + " |  SUITESIMON " +(suiteSimons))
    if(suiteUsers[suiteUsers.length-1] === suiteSimons[suiteUsers.length-1]){
       addLog("GOOD COLOR");
        if(suiteUsers.length === suiteSimons.length){
            clearLog();
            $("#game_information").text("NEXT LEVEL | PRESS START")
            level += 1;
            color += 1;
            $('.color').off('click');
        }
        //si j'ai tout correct je relaance initalize
    }else{
        //je doit quitter 
        clearLog();
        SOUNDERROR.get(0).play();
        $("#game_information").text("LOSER | LEVEL "+level+" | COLOR "+color);
        level = 0;
        color = 1;
         $('.color').off('click');
    }
}
function initGame(level,color){
    let suiteSimons = [];
    let suiteUsers = [];
    simonPlay(level,color,suiteSimons);
    //console.log(test());
    //checkcolor(console.log(data));
    //console.log(checkcolor(function(callback){return callback;}));
    setTimeout(function(){ userPlay(suiteUsers,suiteSimons); },1000*suiteSimons.length);
}
function simonPlay(level,color,suiteSimons){
    $("#game_information").text("#### LEVEL : "+level+" | COLOR : "+color+" ########");
    for (let i=0;i<color;i++) {
        suiteSimons[i] = Math.floor(Math.random() * (3 - 0 + 0)) + 0;
        (function(i){
            setTimeout(function(){
            switch(suiteSimons[i]){
            case 0:
                blink(BLUE,500);
                SOUNDBLUE.get(0).play();
                break;
            case 1:
                blink(YELLOW,500);
                SOUNDYELLOW.get(0).play();
                break;
            case 2:
                blink(RED,500);
                SOUNDRED.get(0).play();
                break;
            case 3:
                blink(GREEN,500);
                SOUNDGREEN.get(0).play();
                break;
            }
            }, 1000*i);
         })(i);
    }
}
function userPlay(suiteUsers,suiteSimons){ 
    $( ".color" ).click(function() {
        var color = $(this).parent().data("color");
        suiteUsers.push(color);
        $('#sound'+color).get(0).play();
        check(suiteSimons,suiteUsers);
     });  
}
function clearLog(){
    $('textarea').val('');
} 
function blink(element,timing){
        $(element).fadeOut(timing),
        $(element).fadeIn(timing);
        //addLog(element.data("color"));
} 
function addLog(text){
    if($('textarea').val().length <= 0 ){
        $('textarea').val(text);
    }else{
        $('textarea').val( $('textarea').val() +'\n'+ text);   
    }
}

function debug(){
    console.log($('#button_debug').data('value'));
    if($('#button_debug').data('value') === 0){
        $('#button_debug').attr("data-value","1");
        $('textarea').show();
        $('#button_debug').text("HIDE DEBUG");
    }
    if($('#button_debug').data('value') === 1){
        $('#button_debug').attr("data-value","0");
        $('textarea').hide();
        $('#button_debug').text("SHOW DEBUG");
    }
}