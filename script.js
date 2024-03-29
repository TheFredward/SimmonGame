// array to hold the colors and an array to hold usrselected colors
var colorsArray = ['green', 'red', 'yellow', 'blue'];
var usrselectedArray = [];
// time delay for alternation
var currentStatus = false;
var timeDelay = 500;
// create an empty array to hold the pattern of the colors for game
var lvl = 0;
var gamePattern = [];

// event listener to start the function and update h1
$(document).keypress( function (){
  if(!currentStatus){
    $("#level-title").text("Level " + lvl);
    nextSequence();
    currentStatus = true;
  }
});

// ******** Related function declerations ******** //
// function that will randomly generate a num to asso. colorsArray
function ranNumber(){
  var numGenerated = Math.floor((Math.random() * 4) );
  return numGenerated;
}
// create a way to show the color pattern that is being created
function colorPattern(index) {
  // display the last added color in the gamepattern
  var currentcolor = $("#" + gamePattern[index]).addClass("pressed");
  soundGenerate(gamePattern[index]);
  // after a set time out remove class
  setTimeout( function () {
    currentcolor.removeClass("pressed");
  }, timeDelay);
}
// TODO: Now listen for click events and determine if the user followed the correct pattern, start with single patterns then check if they are correct
// use colors array to add click events to buttons
colorsArray.forEach( function (element){
  $("#"+ element).click( function (){
    // after button click add the pressed class then remove
    var usrPressed = $(this).addClass("pressed");
    soundGenerate(element);
    usrselectedArray.push(usrPressed.attr("id"));
    setTimeout( function () {
      usrPressed.removeClass("pressed");
    }, timeDelay);
    comparePress(lvl);
  });
});
// create sound after each click
function soundGenerate(element){
  // fetch the correct mp3 based on color button
  var mAudio = new Audio("sounds/"+ element + ".mp3");
  mAudio.play();
}
function comparePress (index){
  // check if the last value on each array matched
  if(gamePattern[index] === usrselectedArray[index]){
    // check if the length also matches if not compare the last index and the length if it fails game over
    if(usrselectedArray.length === gamePattern.length){
      console.log("A match");
      lvl++;
      setTimeout(nextSequence, 1000);
    }
  } else if (usrselectedArray.length >= gamePattern.length && gamePattern[index] != usrselectedArray[index]) {
    // change the title and show the change in body for game over
    $("#level-title").text("Game Over, press any key to restart");
    currentStatus = false;
    lvl = 0;
    $("body").addClass(".game-over");
    setTimeout(function (){
      $("body").removeClass(".game-over");
    }, 200);
  }
};
function nextSequence(){
  // increase lvl and animate the colors to be pressed
  // clear usr input array
  usrselectedArray.length = 0;
  gamePattern.push(colorsArray[ranNumber()]);
  colorPattern(lvl);
  $("h1").text("Level "+ lvl);
}
