// array to hold the colors and an array to hold usrselected colors
var colorsArray = ['green', 'red', 'yellow', 'blue'];
var usrselectedArray = [];
// time delay for alternation
var currentStatus = false;
var timeDelay = 500;
// create an empty array to hold the pattern of the colors for game
var lvl = 0;
var gamePattern = [];
usrPattern();
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
function usrPattern() {
  // use colors array to add click events to buttons
  colorsArray.forEach( function (element){
    $("#"+ element).click( function (){
      // after button click add the pressed class then remove
      var usrPressed = $(this).addClass("pressed");
      soundGenerate(element);
      usrselectedArray.push(usrPressed.attr("id"));
      comparePress(lvl);
      setTimeout( function () {
        usrPressed.removeClass("pressed");
      }, timeDelay);
    });
  });
}
// create sound after each click
function soundGenerate(element){
  // fetch the correct mp3 based on color button
  var mAudio = new Audio("sounds/"+ element + ".mp3");
  mAudio.play();
}
function comparePress (index){
  // iterate and compare each element
      if(gamePattern[index] == usrselectedArray[index]){
        console.log("A match");
        setTimeout(nextSequence, 1000);
      }else{
        console.log("not a match");
      }
};
function nextSequence(){
  // increase lvl and animate the colors to be pressed
  gamePattern.push(colorsArray[ranNumber()]);
  colorPattern(lvl);
  lvl++;
  $("h1").text("Level "+ lvl);
}
