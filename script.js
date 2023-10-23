var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level=0;
var started=false;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextPattern();
        started = true;
    }
}
);

$(".btn").click(function () {
    var presentBtn = $(this).attr("id");
    userClickedPattern.push(presentBtn);
    playSound(presentBtn);
    animatePress(presentBtn);
    checkAnswer(userClickedPattern.length-1);
});

function nextPattern() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var n = Math.floor(4 * Math.random());
   var randomChosenColour = buttonColours[n];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextPattern();
          }, 1000);
        }
      }
       else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("GAME OVER, START AGAIN!! ,PRESS A/a");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};