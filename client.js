/* =============================================================================
 * EECE/CS 3093C Software Engineering — Lab 4
 * client.js — code skeleton provided by Dr. Phu Phung
 * Code complete implementation by Kiki Vasilev
 * ===============================================================================
 */

// UI DOM references
var searchBtnElm = document.getElementById('search-button');
if(!searchBtnElm) {
    console.log("Error in getting 'search-button' button");
}
searchBtnElm.addEventListener('click', ()=> {
    search();
    searchInput.value = ''; // clear the field after an explicit search
});

var searchInput = document.getElementById('search-input');
if(!searchInput) {
    console.log("Error in getting 'search-input' field");
}

searchInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        search();
        searchInput.value = ''; // clear the field after an explicit search
    }
});

function search() {
    var query = searchInput.value.trim();
    if (!query || query.length === 0) return;
    console.log(`Debug>query: ${query}`);
}

function displaySearch(date) {

}