// Get the breed to search for from the html
$(document).ready(function(){
    $('#autocomplete-input').change(function(){
        let searchBreed = $('.autocomplete').val();
        //console.log(searchBreed);

        // Populate the breed name onto the search page
        $(".breedName").text(searchBreed);

        //making the breed info URL
        let apiKey = "6eb49e4c-fb5a-4a63-84f3-04f3d2b8bf46";
        //TODO: does this work without api key?
        let queryURL = "https://api.thedogapi.com/v1/breeds/search?q=" + searchBreed; //api_key=" + apiKey + "q" + searchBreed + "";
        console.log(queryURL);
        //calling the first api that searches for breed info
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            //console.log(response);
            //console.log(response[100].name)
            //console.log(response.length)

            // Populate breen weight and height onto the search page
            $(".weight").text("Weight: " + response[0].weight.imperial + " lbs.");
            $(".height").text("Height: " + response[0].height.imperial + " inches");
        });
    });
});

