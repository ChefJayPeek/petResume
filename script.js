//making the URL
//var queryURL = `https://api.thedogapi.com/v1/breeds/search?api_key=6eb49e4c-fb5a-4a63-84f3-04f3d2b8bf46&q=${searchTerm}`

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

                console.log(response)
                console.log(response[100].name)
                console.log(response.length)

            
                        //collecting information related to the dog that was searched. We're using imperial units
                        var bredFor = response[i].bred_for

                        //handling an undefined bredFor variable
                        if (bredFor === undefined) {
                            bredFor = "an unknown purpose"
                        }


                        var breedGroup = response[i].breed_group
                        var height = response[i].height.imperial
                        var lifeSpan = response[i].life_span
                        var name = response[i].name
                        var origin = response[i].origin
                        var originArray = []
                        console.log(origin)


                        //handling an undefined origin
                        if (origin === undefined) {
                            originArray.push("unkown")

                        } else {

                            originArray = origin.split(",")

                        }

                        var temperament = response[i].temperament
                        var weight = response[i].weight.imperial


                        //creating a function that I can call at any time to render html on the search page
                        function renderHtml(arg1, arg2, arg3, arg4) {

                            //adding dynamic html that holds the pet info data from our query
                            var searchPageHtml = `
                                
                                
                                    <!--what line 40 was before ->  <h4 class = "breedName">Breed Name</h2> -->
                                    <h2 class = "breedName">${name.toUpperCase()}</h2>



                                    <div class="carousel carousel-slider center">

                                        

                                            <div class="carousel-item  white-text" href="#one!">
                                                <a ><img class="responsive-img" src=${arg1}></a>
                                            </div>

                                            <div class="carousel-item  white-text" href="#two!">
                                                <a><img class="responsive-img" src=${arg2}></a>
                                            </div>

                                            <div class="carousel-item  white-text" href="#three!">
                                                <a ><img class="responsive-img" src=${arg3}></a>
                                            </div>

                                            <div class="carousel-item  white-text" href="#four!">
                                                <a ><img class="responsive-img" src=${arg4}></a>
                                            </div>
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

                            console.log(response2)

                            var imageArray = []

                            //looping through the response array to grab 5 images
                            for (let j = 0; j < 5; j++) {

                                imageArray.push(response2.message[j])


                            }

                            renderHtml(imageArray[0], imageArray[1], imageArray[2], imageArray[3])


                        })

                    


                


            })



}


/////
/////
/////



//////
///////
///////
//////



function handleGallery(){

            //code to render the gallery on the homepage

            var queryURL3 = "https://dog.ceo/api/breeds/image/random/5"


            //querying random images from the dogceo api then rendering them on the browser
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response3) {


                console.log(response3.message[0])

                //adding dynamic html that holds the pet info data from our query
                //next step would be to fix image sizes so that they fit the container
                var galleryHtml = `
                    
                    
                        <div class="carousel carousel-slider center">

                            

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


                        `


                $("#gallery").html(galleryHtml)

                //I need to make seperate javascript files that run depending on which page we're on.
                //this code changes the carousel image every 2 seconds

                $('.carousel.carousel-slider#gallery').carousel({
                    fullWidth: true,
                    indicators: true,
                    dist: 0,
                    duration: 200
                });

                setInterval(function () {
                    $('.carousel#gallery').carousel('next');
                }, 2000); // every 2 seconds


            })


        }




