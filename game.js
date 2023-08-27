var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
    }
});
$(".btn").click(function(event) {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
}); 

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()  {
                nextSequence();
            }, 1000);
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();     
    }
    
}


function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut("fast").fadeIn("fast");

    playSound(randomChosenColour);  
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");

    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

