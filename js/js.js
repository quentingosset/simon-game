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
    let suiteSimons = [];
    let suiteUsers = [];
    let i = 0;
    initGame(level,color,suiteSimons);
});
function check(suiteSimons,suiteUsers){
    addLog("SUITEUSER : "+suiteUsers + " |  SUITESIMON " +(suiteSimons))
    if(suiteUsers[suiteUsers.length-1] === suiteSimons[suiteUsers.length-1]){
       addLog("GOOD COLOR");
        if(suiteUsers.length === suiteSimons.length){
            addLog("NEXT LEVEL | PRESS START");
            $("#game_information").text("NEXT LEVEL | PRESS START")
            level += 1;
            color += 1;
            $('.color').off('click');
        }
    }else{
        SOUNDERROR.get(0).play();
        $("#game_information").text("LOSER | LEVEL "+level+" | COLOR "+color);
        addLog("LOSER | LEVEL "+level+" | COLOR "+color);
        level = 0;
        color = 1;
         $('.color').off('click');
    }
}
function initGame(level,color){
    let suiteSimons = [];
    let suiteUsers = [];
    simonPlay(level,color,suiteSimons);
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
    addLog("SUITESIMON : "+suiteSimons);
}
function userPlay(suiteUsers,suiteSimons){ 
    $( ".color" ).click(function() {
        var color = $(this).parent().data("color");
        suiteUsers.push(color);
        switch(color){
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
        check(suiteSimons,suiteUsers);
     });  
}
function clearLog(){
    $('textarea').val('');
} 
function blink(element,timing){
        $(element).fadeOut(timing),
        $(element).fadeIn(timing);
} 
function addLog(text){
    if($('textarea').val().length <= 0 ){
        $('textarea').val(text);
    }else{
        $('textarea').val( $('textarea').val() +'\n'+ text);   
    }
}

function debug_show(){
    $('#button_debug').attr("onclick","debug_hide()");
    $('textarea').show();
    $('#button_debug').text("HIDE DEBUG");
}

function debug_hide(){
    $('#button_debug').attr("onclick","debug_show()");
    $('textarea').hide();
    $('#button_debug').text("SHOW DEBUG");
}

