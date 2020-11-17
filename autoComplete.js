let allDogBreeds = {};
const theDogAPIKey = '66fa386b-c33c-4825-8091-57c9a02e9aa8';

/**
 * make a request to The Dog API, and get all the breed names.
 */
function requestBreedList() {
    allDogBreeds = [];
    $.ajax({
        url: `https://api.thedogapi.com/v1/breeds? x-api-key=${theDogAPIKey}`,
        method: 'GET'
    }).done((response) => {
        for(let breed of response) {
            allDogBreeds[breed.name] = null;
        }
    });
}

$(document).ready(function(){
    //request all breed names.
    requestBreedList();

    //allow auto-complete
    $('input.autocomplete').autocomplete({
        data: allDogBreeds
    });
});


