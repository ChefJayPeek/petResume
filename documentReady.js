// Get the breed to search for from the html
$(document).ready(function(){
    let $searchForm = $('#searchForm');

    //event listener that takes the value submitted by the form and passes it as an argument to the handleSearch function
    $searchForm.submit(function(event){
        event.preventDefault();
        let searchBreed = $('.autocomplete').val();
       
        handleSearch(searchBreed);
    });

    //event listener that allows us to select a value to submit 
    $searchForm.on('click', '.autocomplete-content', function () {
        let searchBreed = $('.autocomplete').val();
        handleSearch(searchBreed);
    });

    handleSearch("Pug");
    handleGallery();
});