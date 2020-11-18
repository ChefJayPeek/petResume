//code to render the gallery on the homepage
var queryURL3 = "https://dog.ceo/api/breeds/image/random/1"

console.log("script2 is connected")


//creating function that returns a random image 1 time.
function randomImgURL(){

                $.ajax({
                    url: queryURL3,
                    method: "GET"
                }).then(function(response3){

                        console.log(response3)
                        //var index = Math.floor(Math.random()*172)

                        //adding dynamic html that holds the pet info data from our query
                        //next step would be to fix image sizes so that they fit the container
                        return response3.message

                })

            }


console.log(randomImgURL())

/*

var completeGallery = ``

        for(let i=0;i<4;i++){

                var randomIndex = Math.floor(Math.random()*172)

                var galleryHtml = `
                
                            <div class="carousel-item  white-text" href="#one!">
                                <a ><img class="responsive-img" src=${randomImgURL()}></a>
                            </div>

                            `

                completeGallery = completeGallery+" "+galleryHtml
         }

         $("#gallery").html(completeGallery)

         
                      //Adding the javascript for the carousel slider
                    $('.carousel.carousel-slider').carousel({
                        fullWidth: true,
                        indicators: true,
                        dist: 0,
                        duration: 200
                    });

                    */