
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false; 

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    randomIndex = Math.floor(Math.random()*4);
    randomColor = buttonColors[randomIndex];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("level "+level);
    playSound(randomColor);
    
}


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        //console.log(gamePattern);
        started = true;
    }
        
});
    
   


$(".btn").on("click",function (event) {
    var btnId = $(this).attr("id");;
    userClickedPattern.push(btnId);
    //console.log(btnId);
    playSound(btnId);
    animatePress(btnId);
    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
});

function playSound(btn){
    var audio = new Audio("/sounds/"+btn+".mp3");
    audio.play();
}

function animatePress(btnColor){
    $("#"+btnColor).addClass("pressed");
    setTimeout(function(){
        $("#"+btnColor).removeClass("pressed");  
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence;
            },1000);
        }else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");

            setTimeout(function () {
                $("body").addClass("game-over");
            },200);

            startOver();
        }
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}