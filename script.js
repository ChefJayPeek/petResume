//making the URL
var queryURL = "https://api.thedogapi.com/v1/breeds?api_key=6eb49e4c-fb5a-4a63-84f3-04f3d2b8bf46"


//calling the first api that searches for breed info
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){

    console.log(response)

    for(let i=0;i<response.length;i++){

        //replace Affenpinscher with a variable that contains the dog breed searched
        if(response[i].name==`Affenpinscher`){

            //collecting information related to the dog that was searched. We're using imperial units
            var bredFor = response[i].bred_for
            var breedGroup = response[i].breed_group
            var height = response[i].height.imperial
            var lifeSpan = response[i].life_span
            var name = response[i].name.toLowerCase()
            var origin = response[i].origin
            var temperament = response[i].temperament
            var weight = response[i].weight.imperial

            console.log(bredFor)
            console.log(breedGroup)
            console.log(height)
            console.log(lifeSpan)
            console.log(name)
            console.log(origin)
            console.log(temperament)
            console.log(weight)


            //Using a second api to look for images of the dog
            //query param names cant be capitalized -> Beagle should be beagle
            var queryURL2 = `https://dog.ceo/api/breed/${name}/images/random`

            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function(response2){
                console.log(response2)

                var image = response2.message
                console.log(image)
            })

        }


    }



})

