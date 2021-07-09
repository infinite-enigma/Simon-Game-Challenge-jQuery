// Four string value array for four colors
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; // Empty Array to save game inputs
var userClickedPattern = []; // Empty Array to save user inputs

var started = false; // To check/keep track of game state. Toggle state
var level = 0;

// Detect keyboard key press to start game
$(document).keypress(function () {

    // if (started === false) {
    if (!started) { // Ingone keypress if game is running/started
        $("#level-title").html("level " + level); // Optional
        nextSequence();
        started = true;
    }

});

// Detect click events to button with class btn
$(".btn").click(function () {

    var userChosenColor = $(this).attr("id"); // id name attibute, "color", that is clicked
    // console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log("User:" + userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1); // last index of user sequence/last key pressed

});

// Match game inputs with user inputs
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // Matching current index value
        console.log("Success");

        // Last input correct then
        if (userClickedPattern.length === gamePattern.length) {// Checking wether user sequence input finished per turn/level
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        playSound("wrong"); // Warning Sound

        $("body").addClass("game-over"); // Red Screen/Game over
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver(); // Load restart
    }

}

// Game Restart
function startOver() {

    //Resetting needed values
    level = 0;
    gamePattern = [];
    started = false;

}

// Generate the sequence to follow
function nextSequence() {

    userClickedPattern = []; // Clear input for next level
    level++; // Update level count for next turn/ next nextSequence function call
    $("#level-title").html("level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // 0-3 randomnumber
    var randomChosenColor = buttonColors[randomNumber]; // Access array index 0-3

    console.log(randomNumber);
    console.log(randomChosenColor);

    gamePattern.push(randomChosenColor);
    console.log("Game:" + gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // Animate flash effect to button
    playSound(randomChosenColor);

}


// Create string play sound from the source 'sound' folder 
function playSound(name) {

    // js new sound variable 'audio' to play sound from source using play method from Audio Object
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();

}

// Adding & removing button pressed effect by css class add &remove
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


