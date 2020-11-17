let allDogBreeds = [];
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
            allDogBreeds.push(breed.name.toLowerCase());
        }
    });
}

/**
 * search for auto-complete suggestions from all possible dog breeds
 * @param input the current user input
 * @param {number} suggestionLimit - Optional, limit how many suggestions to return
 * @returns {string[]} List of suggestions or an empty list
 */
function getAutoComplete(input, suggestionLimit=5) {
    //return early if no input
    if(!input) {
        return [];
    }

    let suggestionsFound = 0;
    let suggestions = [];
    for(let breed of allDogBreeds) {
        if(suggestionsFound >= suggestionLimit) {
            //stop searches if found enough results
            break;
        }

        let cleanUserInput = input.toLowerCase();

        if(breed.includes(cleanUserInput)) {
            suggestions.push(breed);
            suggestionsFound++;
        }
    }

    return suggestions;
}


//request all breed names.
requestBreedList();