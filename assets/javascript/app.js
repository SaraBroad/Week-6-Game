
var cities = ["Philadelphia", "New York", "Denver", "London", "Tokyo", "Florence", "Rome", "Berlin", "Paris", "Madrid", "Tel Aviv", "Los Angeles", "Beijing", "Bangkok", "Istanbul", "Hong Kong", "Amsterdam", "Sydney", "Shanghai", "Barcelona"];


$(document).on("click", ".city-buttons", function(){

   var cityDiv = $(this).attr("city-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=0OSjad12uAkQ62BWC5aLeJcBZp4GHXKn&q=" +
        cityDiv + "&limit=10&offset=0&rating=PG-13&lang=en";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
var results = response.data;
console.log(results);
for (var i=0; i<results.length; i++) {
    var buttonDiv = $("<div>");
    var rating = response.data[i].rating;
    var ratingDiv = $("<p>").text("Rated " + rating);
    buttonDiv.append(ratingDiv);
    var img = $("<img>");
    // img.addClass("infoButton");
    img.addClass("giphys")
    img.attr('src', results[i].images.fixed_height_still.url);
    img.attr('data-still', results[i].images.fixed_height_still.url);
    img.attr('data-animate', results[i].images.fixed_height.url);
    img.attr('data-state', 'still');
    buttonDiv.append(img);
    $("#gif-box").prepend(buttonDiv);

    }
});
});


$("#gif-box").on("click", ".giphys", function (){
var state = $(this).attr('data-state');
if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
} else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }

}) 



function renderButtons() {
$("#cities-buttons").empty();
for (var i=0; i<cities.length;i++){
    var buttons = $("<button>");
    buttons.addClass("city-buttons");
    buttons.attr("city-name", cities[i]);
    buttons.html(cities[i]);
    $("#cities-buttons").append(buttons);
}
}

renderButtons();

$("#add-cities").on("click", function(){
    event.preventDefault();
    var newCity = $("#cities-input").val().trim();
    cities.push(newCity);
renderButtons();
})


