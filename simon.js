


var buttonColors = ["green","red","yellow","blue"];

var gameSequence = [];
var userSequence =[];

var level = 0;
var started = false;

//Start Game
$(document).on("keypress",()=>{
    if (!started){
        userSequence=[];
        
        nextSequence();
        started = true;
    };
});


//capture the button user clicked and store

    $(".btn").on("click",function(event){
        if(started){

            var userChosenColour = (event.currentTarget.id);
            playButtonSound(userChosenColour);
            animatePress(userChosenColour);
            userSequence.push(userChosenColour);

            CompareColors(userSequence.length - 1);
        }  
    });    


function CompareColors(position){
    if(gameSequence[position]===userSequence[position]){
        if(userSequence.length === gameSequence.length){
            level ++;
            setTimeout(()=>{nextSequence()},1000);   
        }   
    }
    else{
        gameOver();
    }
    
    
    
}




function gameOver(){
    playButtonSound("wrong");
    $("h1").text("Game Over, Press any key to Restart");

    $("body").addClass("game-over");
    setTimeout( ()=> {
        $("body").removeClass("game-over");
    }, 200);
    started = false;
    level = 0;
    gameSequence=[];
}


//Generate a Random Color and store
function nextSequence(){
    userSequence = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor( Math.random() * 4) ;
    var randomChosenColor = buttonColors[randomNumber];
    
    playButtonSound(randomChosenColor);
    $("."+randomChosenColor).fadeOut(100).fadeIn(100);  //fade animation
    
    gameSequence.push(randomChosenColor); //store the random Sequence
}

//play sound
function playButtonSound(soundName){
buttonSound = new Audio("./"+soundName + ".mp3");
buttonSound.play();
}

//Press animation
function animatePress(clickedColor){
    $("." + clickedColor).addClass("pressed");
    setTimeout( ()=> {
        $("." + clickedColor).removeClass("pressed");
    }, 100);
}