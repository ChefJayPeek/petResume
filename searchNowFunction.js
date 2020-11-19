$(document).ready(function(){
    let $searchForm = $('#searchForm');

    $searchForm.submit(function(event){
        event.preventDefault();
        let searchBreed = $('.autocomplete').val();
        //console.log(searchBreed);
        goToSearch(searchBreed);
    });

    $searchForm.on('click', '.autocomplete-content', function () {
        let searchBreed = $('.autocomplete').val();
        goToSearch(searchBreed);
    });

});

function goToSearch(searchTerm) {
    window.location.href = './search.html?searchTerm=' + searchTerm;
}