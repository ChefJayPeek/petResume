// Get the breed to search for from the html
$(document).ready(function(){
    let $searchForm = $('#searchForm');

    $searchForm.submit(function(event){
        event.preventDefault();
        let searchBreed = $('.autocomplete').val();
        //console.log(searchBreed);
        handleSearch(searchBreed);
    });

    $searchForm.click('.autocomplete-content', function () {
        let searchBreed = $('.autocomplete').val();
        handleSearch(searchBreed);
    });

    handleSearch("Pug");
    handleGallery();
});