$(document).ready(function(){

    var topics = ["Dogs", "Cats", "Elephants", "Shark", "Zebra", "Tiger", "Lion"];

// create the buttons for my current array of topics
    function renderButtons(){
        $("#buttons-view").empty();

        for(var i = 0; i< topics.length; i++){

            var makeButton = $("<button>");
            makeButton.addClass("gif-btn");
            makeButton.attr("data-name", topics[i]);
            makeButton.text(topics[i]);

            $("#buttons-view").append(makeButton);
        }
    }
        renderButtons();


    $(document).on("click", ".gif-btn", function(){

        var search = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=&api_key=o5CR6bm4PyTJlKIcmP1CeazPeo3DWzZd&q=" + search + "&limit=10&offset=0&lang=en";
        // console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET" 
    }).then(function(response){

        var result = response.data;
        console.log(result);
        for (var i= 0; i < result.length; i++){

        var gifDiv = $("<div class='gif'>");
        
        var images = $("<img>");

        images.attr("src", result[i].images.original_still.url);
        images.attr("data-animate", result[i].images.original.url);
        images.attr("data-still", result[i].images.original_still.url);
        images.addClass("gifs");

        var ratings = result[i].rating;
        // console.log(ratings);

        var r = $("<p>").text("Rating: " + ratings);
       

        gifDiv.append(images);
        gifDiv.append(r);


        $("#gif-areaView").prepend(gifDiv);

        }
        });
    });

    $(document).on("click", ".gifs", function(){
        var state = $(this).attr("data-state");

            if (state === "still"){
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still")
            }
    
    });

  $("#add-gif").on("click", function(event){
        event.preventDefault();

        var search = $("#gif-input").val().trim();
        topics.push(search);

        renderButtons();
    });

});