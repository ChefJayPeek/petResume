const apiKey = "66fa386b-c33c-4825-8091-57c9a02e9aa8";

let $gallery = $('#gallery');
let $progress = $('#progress');
let $progressContainer = $('.progress');
$progressContainer.hide();

/*
    Template for each card:

<div class="card">
    <div class="card-image wave-effect waves-block wave-light">
        <img src="https://cdn2.thedogapi.com/images/r1ifZl5E7_390x256.jpg" alt="placeholder" class="responsive-img activator">
        <span class="card-title">American Bully</span>
    </div>
    <div class="card-reveal white lighten-1">
        <span class="card-title grey-text text-darken-4">American Bully<i class="material-icons right">close</i></span>
        <p>
            <span class="grey-text">Farm dog, Cattle herding</span><br>
            Height: 17 - 20 in <br>
            Weight: 31 - 46 lbs <br>
            Life span: 10 - 13 years <br>
            Temperament: Friendly, Energetic, Alert, Loyal, Intelligent, Eager <br>
        </p>
    </div>
</div>

 */


/**
 * calls the dog API and requests a bunch of random breeds with pictures.
 */
function requestRandomDogBreeds(pictureSize = "small", limit = 20) {
    $.ajax({
        url: `https://api.thedogapi.com/v1/images/search? x-api-key=${apiKey}&size=${pictureSize}&order=random&limit=${limit}&format=json`,
        method: "GET"
    }).done((response) => {
        //empty gallery
        $gallery.empty();

        $gallery.hide();
        $progressContainer.show();

        let totalPicCount = 0.0;
        let loadedPicCount = 0.0;

        for(let data of response) {
            let url = data.url;
            // noinspection JSUnresolvedVariable
            if(data.breeds.length) {
                let $card = createDogCard(url, data.breeds[0]);
                $gallery.append($card);
                totalPicCount++;
                $('img', $card).on('load', function () {
                    loadedPicCount++;
                    console.log(loadedPicCount/totalPicCount);
                    $progress.css('width', loadedPicCount/totalPicCount*100 + '%');

                    if(loadedPicCount >= totalPicCount) {
                        $gallery.show();
                        $progressContainer.hide();
                    }
                })
            }
        }

    });
}

function createDogCard(url, breedData) {
    return $(`
    <div class="card">
        <div class="card-image wave-effect waves-block wave-light">
            <img src="${url}" alt="${breedData.name}" class="responsive-img activator">
            <span class="card-title activator">${breedData.name}</span>
        </div>
        <div class="card-reveal white lighten-1">
            <span class="card-title grey-text text-darken-4">${breedData.name}<i class="material-icons right">close</i></span>
            <p>
                <span class="grey-text">${breedData.bred_for}</span><br>
                Height: ${breedData.height.imperial} in <br>
                Weight: ${breedData.weight.imperial} lbs <br>
                Life span: ${breedData.life_span} <br>
                Temperament: ${breedData.temperament} <br>
            </p>
        </div>
    </div>
    `);
}

$('#randomBtn').click(() => {
    requestRandomDogBreeds();
});

requestRandomDogBreeds();