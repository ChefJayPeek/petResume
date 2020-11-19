$(() => {
    //only works in chrome?
    let searchParams = new URLSearchParams(window.location.search);
    let searchTerm = searchParams.get('searchTerm');

    setTimeout(()=> {
        $('#autocomplete-input').val(searchTerm);
        handleSearch(searchTerm);
    }, 100)
});