//making the URL
//var queryURL = `https://api.thedogapi.com/v1/breeds/search?api_key=6eb49e4c-fb5a-4a63-84f3-04f3d2b8bf46&q=${searchTerm}`
const apiKey = "66fa386b-c33c-4825-8091-57c9a02e9aa8";

/**
 * query the search term and display results onto the page
 * @param searchTerm
 */
function handleSearch(searchTerm) {
    //making the URL
    var queryURL = `https://api.thedogapi.com/v1/breeds/search?api_key=6eb49e4c-fb5a-4a63-84f3-04f3d2b8bf46&q=${searchTerm}`


    //calling the first api that searches for breed info
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let breedId = 0;

        for (let petInfo of response) {
            if (petInfo.name.toLowerCase() === searchTerm.toLowerCase()) {
                //collecting information related to the dog that was searched. We're using imperial units
                var bredFor = petInfo.bred_for;

                //handling an undefined bredFor variable
                if (bredFor === undefined) {
                    bredFor = "an unknown purpose";
                }

                var breedGroup = petInfo.breed_group;
                var height = petInfo.height.imperial;
                var lifeSpan = petInfo.life_span;
                var name = petInfo.name;
                breedId = petInfo.id;

                var origin = petInfo.origin;
                var originArray = [];


                //handling an undefined origin
                if (origin === undefined) {
                    originArray.push("unkown")

                } else {

                    originArray = origin.split(",")

                }

                var temperament = petInfo.temperament
                var weight = petInfo.weight.imperial


                //creating a function that I can call at any time to render html on the search page
                function renderHtml(...args) {

                    //adding dynamic html that holds the pet info data from our query
                    var searchPageHtml = `
                                
                                
                                    <!--what line 40 was before ->  <h4 class = "breedName">Breed Name</h2> -->
                                    <h2 class = "breedName">${name.toUpperCase()}</h2>



                                    <div id="carousel" class="carousel carousel-slider center">`;


                    for (let url of args) {
                        searchPageHtml += `
                                    <div class="carousel-item  white-text" href="#one!">
                                        <a><img class="responsive-img" src=${url}></a>
                                    </div>
                                            `;
                    }

                    searchPageHtml += `
                                    </div>

                                    

                                    <p class = "weight left-align">Weight: ${weight} lbs</p>
                                    <p class = "height left-align">Height: ${height} inches</p>
                                    <p class = "desc left-align">${name}'s are categorized as a ${breedGroup.toLowerCase()} breed. Their origins are ${originArray[0]} and they have been primarily bred as dogs that are good for ${bredFor}. ${name}'s are a good match for those looking for dogs that are ${temperament}.</p>
                                
                                `

                    //setting the description and data for the dog
                    $("#petInfo").html(searchPageHtml)

                    //Adding the javascript for the carousel slider

                    $('.carousel.carousel-slider').carousel({
                        fullWidth: true,
                        indicators: true,
                        dist: 0,
                        duration: 200
                    });


                    //setting the dog name heading
                    $(".breedName").text(name)

                }


                //this line marks the end of the function

                //Using a second api to look for images of the dog
                //query param names cant be capitalized -> Beagle should be beagle
                var queryURL2 = `https://dog.ceo/api/breed/${name.toLowerCase()}/images`

                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function (response2) {

                    //console.log(response2);
                    var imageArray = [];

                    //looping through the response array to grab 5 images
                    for (let j = 0; j < 5; j++) {
                        imageArray.push(response2.message[j])
                    }
                    renderHtml(imageArray[0], imageArray[1], imageArray[2], imageArray[3])
                }).catch(function (error) {
                    //fallback to theDogAPI
                    if (error.status === 404) {
                        let pictureSize = "small";
                        let limit = 5;
                        $.ajax({
                            url: `https://api.thedogapi.com/v1/images/search?x-api-key=${apiKey}&size=${pictureSize}&order=random&limit=${limit}&format=json&breed_id=${breedId}`,
                            method: "GET"
                        }).done((response) => {
                            let urls = [];
                            for (let data of response) {
                                let url = data.url;
                                urls.push(url);
                            }
                            renderHtml(urls)
                        });
                    }
                })
                break;
            }
        }
    })


}


function handleGallery() {

    //code to render the gallery on the homepage

    var queryURL3 = "https://dog.ceo/api/breeds/image/random/5"


    //querying random images from the dogceo api then rendering them on the browser
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function (response3) {

        //adding dynamic html that holds the pet info data from our query
        //next step would be to fix image sizes so that they fit the container
        var galleryHtml = `
                    
                    
                        <div id="galleryC" class="carousel carousel-slider center">

                            

                                <div class="carousel-item  white-text" href="#one!">
                                    <a ><img class="responsive-img" src=${response3.message[1]}></a>
                                </div>

                                <div class="carousel-item  white-text" href="#two!">
                                    <a><img class="responsive-img" src=${response3.message[2]}></a>
                                </div>

                                <div class="carousel-item  white-text" href="#three!">
                                    <a ><img class="responsive-img" src=${response3.message[3]}></a>
                                </div>

                                <div class="carousel-item  white-text" href="#four!">
                                    <a ><img class="responsive-img" src=${response3.message[4]}></a>
                                </div>

                                <div class="carousel-item  white-text" href="#four!">
                                    <a ><img class="responsive-img" src=${response3.message[0]}></a>
                                </div>


                        </div>


                        `;


        $("#gallery").html(galleryHtml)

        //I need to make seperate javascript files that run depending on which page we're on.
        //this code changes the carousel image every 2 seconds

        $('.carousel.carousel-slider#galleryC').carousel({
            fullWidth: true,
            indicators: true,
            
        });

        setInterval(function () {
            $('.carousel#galleryC').carousel('next');
        }, 2000); // every 2 seconds


    })


}

/**
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    // Loop through a collection of all HTML elements: 
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      // search for elements with a certain atrribute:
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        // Make an HTTP request using the attribute value as the file name: 
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            / Remove the attribute, and call this function once more: 
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        // Exit the function: 
        return;
      }
    }
  }


  includeHTML()
  */



