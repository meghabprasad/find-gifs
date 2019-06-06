// initial array of emotions
var emotions = ["happy", "sad", "angry"];

// create div to dump all the gifs
$("#buttonsDiv").append('<div class="json"></div>');

function displayGifs(){
    $(".json").empty();
    
}
function renderButton(){
    $("#buttons-view").empty();//clear all the buttons
    //loop through array and dynamically add button for each
    for (var i=0;i<emotions.length;i++){
        var newButton = $("<button>"); //create button
        newButton.addClass("emotion"); //add class 
        newButton.attr("data-name", emotions[i]); //add data value
        newButton.text(emotions[i]); //name the button
        $("#buttons-view").append(newButton);
    }
}
//get userInput and push that to the emotions array 
$("#add-movie").on("click", function(event) {
    event.preventDefault();
    var emotion = $("#add-emotion").val().trim();//get value
    emotions.push(emotion);
    //call function that rendersButton to the dom
    renderButton(); 
});

