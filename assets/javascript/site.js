// initial array of emotions
var emotions = ["happy", "sad", "angry"];

// create div to dump all the gifs
$("#buttonsDiv").append('<div class="json"></div>');

//get userInput and push that to the emotions array 
$("#add-movie").on("click", function(event) {
    event.preventDefault();
    var emotion = $("#add-emotion").val().trim();//get value
    emotions.push(emotion);
// function that displays gif
});
