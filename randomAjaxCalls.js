const apiKey = "66fa386b-c33c-4825-8091-57c9a02e9aa8";

let $gallery = $('#gallery');

/*
    Template for each card:

    <div class="col s12 m6 xl4 p-3">
            <div class="card">
                <div class="card-image wave-effect waves-block wave-light">
                    <img src="http://placehold.it/700x600" alt="placeholder" class="responsive-img activator">
                    <span class="card-title">Title</span>
                </div>
                <div class="card-reveal white lighten-1">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id ipsam magni maiores non odio perspiciatis quaerat quia quo rerum ullam!
                </div>
            </div>
        </div>
 */


/**
 * calls the dog API and requests a bunch of random breeds with pictures.
 */
function requestRandomDogBreeds(pictureSize = "med", limit = 20) {
    $.ajax({
        url: `https://api.thedogapi.com/v1/images/search? x-api-key=${apiKey}&size=${pictureSize}&order=random&limit=${limit}&format=json`,
        method: "GET"
    }).done((response) => {
        console.log(response);
        let imageUrl = response.url;

        // noinspection JSUnresolvedVariable
        if(response.breeds.length) {

        }
    });
}

requestRandomDogBreeds();