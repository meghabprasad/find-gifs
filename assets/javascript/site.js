// initial array of emotions
var emotions = ["happy", "sad", "angry"];
console.log(emotions);

// create div to dump all the gifs
// $("#buttons-view").append('<div class="json"></div>');
var gifsContainer = $('<div>');
function displayGifs(){
    //api call
    $(gifsContainer).empty();
    var emotion = $(this).attr("data-name"); //get the emotion from the data-name attribute of the button that was just clicked
    console.log(emotion);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=KrzIQGM9q0c0GScWZUHi8nzmRpzeINeQ"; // api queryURL
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results = response.data; //this is an array
        for (var i=0; i<10; i++){
            var gifsDiv = $('<div class="card" style="width: 205px; height: 200px">');
            var imgTag = $('<img class="card-img-top" id="'+i+'" alt="gif">');
            var cardBodyTag = $('<div class="card-body">');
            var ratingTag = $('<p class="card-text">');
            ratingTag.text("Rating: "+results[i].rating);
            stillGifUrl = results[i].images.fixed_height_still.url;
            animatedGifUrl = results[i].images.fixed_height.url;
            imgTag.attr("src", stillGifUrl);
            imgTag.attr("data-still", stillGifUrl);
            imgTag.attr("data-animate", animatedGifUrl);
            imgTag.attr("data-state", "still");
            imgTag.addClass("gif");
            imgTag.attr("style", "width: 200px; height: 300px");
            $(cardBodyTag).append(ratingTag);
            $(gifsDiv).append(cardBodyTag);
            $(gifsDiv).append(imgTag);
            $(gifsContainer).append(gifsDiv);


            $("#buttons-view").after(gifsContainer);
        }
    })
}
function renderButton(){
    $("#buttons-view").empty();//clear all the buttons
    //loop through array and dynamically add button for each
    for (var i=0;i<emotions.length;i++){
        var newButton = $('<button type="button" class="btn btn-primary" id = "emotion-text">'); //create button
        newButton.addClass("emotion"); //add class 
        newButton.attr("data-name", emotions[i]); //add data value
        newButton.text(emotions[i]); //name the button
        $("#buttons-view").append(newButton);
    }
}
//get userInput and push that to the emotions array 

$("#emotion-input").on("keypress", function(event){
    if (event.keyCode === 13){
        event.preventDefault();
        $("#add-emotion").click();
    }
})
$("#add-emotion").on("click", function(event) {
    event.preventDefault();
    var emotion = $("#emotion-input").val().trim();//get value
    emotions.push(emotion);
    $("#emotion-input").val("");
    //call function that rendersButton to the dom
    renderButton(); 
});
//when one of the buttons are clicked, execute displayGifs function
$(document).on("click", ".emotion", displayGifs);
renderButton();

$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    if (state === "still"){
      var dataAnimate = $(this).attr("data-animate");
      $(this).attr("src", dataAnimate);
      $(this).attr("data-state", "animate");  
    }
    else if(state === "animate"){
        var dataStill = $(this).attr("data-still");
        $(this).attr("src", dataStill);
        $(this).attr("data-state", "still");
    }
})