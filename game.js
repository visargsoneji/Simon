let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(".start-btn").on("click", function() {
    if(gameStarted === false) {
        level = 0;
        gameStarted = true;
        $(".start-btn").slideUp(100);
        $(".to-play").slideUp(100);
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
});

$(".btn").on("click", function(event) {
    if(gameStarted) {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        //console.log("User Pattern: "+userClickedPattern)  
        playSound(userChosenColor);
        animatePress(userChosenColor);
        
        if(!checkAnswer(userClickedPattern.length-1)) {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            },500);
            gameStarted = false;
            gamePattern = [];
            $("#level-title").text("Game Over | Score " + (level));
            $(".start-btn").text("Restart");
            $(".start-btn").slideDown(100);
            $(".to-play").slideDown(100);
        }
    }  
});

function nextSequence () {
    $("#level-title").text("Level " + (++level));
    userClickedPattern = [];

    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log("Game Pattern: "+gamePattern);

    $("#"+randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
        return true;
    }
    else {
        console.log("Failure");
        return false;
    }       
}

function playSound (soundName) {
    let audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function animatePress (currentColor) {
    $("#"+currentColor).fadeOut(50).fadeIn(50);
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}
