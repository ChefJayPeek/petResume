//making the URL
var queryURL = "https://api.thedogapi.com/v1/breeds?api_key=6eb49e4c-fb5a-4a63-84f3-04f3d2b8bf46"


//calling the first api that searches for breed info
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

    console.log(response)
    console.log(response[100].name)
    console.log(response.length)

    for(let i=0;i<response.length;i++){


        //replace Affenpinscher with a variable that contains the dog breed searched
        if(response[i].name=="Greyhound"){

            //collecting information related to the dog that was searched. We're using imperial units
            var bredFor = response[i].bred_for

            //handling an undefined bredFor variable
            if(bredFor===undefined){
                bredFor ="an unknown purpose"
            }


            

            var breedGroup = response[i].breed_group
            var height = response[i].height.imperial
            var lifeSpan = response[i].life_span
            var name = response[i].name
            var origin = response[i].origin
            var originArray = []
            console.log(origin)
            

            //handling an undefined origin
            if(origin===undefined){
                originArray.push("unkown")
                
            }else{

                originArray = origin.split(",")

            }

            var temperament = response[i].temperament
            var weight = response[i].weight.imperial


            //creating a function that I can call at any time to render html on the search page
            function renderHtml(arg1,arg2,arg3,arg4){

                    //adding dynamic html that holds the pet info data from our query
                    //next step would be to fix image sizes so that they fit the container
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
            }).then(function(response2){

                console.log(response2)

                var imageArray =[]

                //looping through the response array to grab 5 images
                for(let j=0;j<5;j++){

                        imageArray.push(response2.message[j])
                
                        

                }

                renderHtml(imageArray[0],imageArray[1],imageArray[2],imageArray[3])
                
                
                
            })

        }


    }




})




/*
$('.carousel.carousel-slider').carousel({
    fullWidth: true
});
*/

/*
$('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
      
*/

