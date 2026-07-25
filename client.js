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

const BASE_URL = "https://vasilekm-uscities-microservices-g5agatf7azf6a4a7.eastus-01.azurewebsites.net/";

async function search() {
    const query = searchInput.value.trim();
    if (!query || query.length === 0) return; // AC9: empty queries never reach fetch() method
    console.log(`Debug>query: ${query}`);
    try {
        const response = await fetch(`${BASE_URL}/uscities-search/${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Unexpected status ${response.status}'); // AC4/AC11: fail safely
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Unexpected response format') // AC10: validate response shape before displayinh
        }
        displaySearch(data);
    } catch (error) {
        console.log(`Debug>search error: ${error.message}`);
        responses.textContent = 'Error: could not load results'; // AC$/AC11
    }
}

var responsesElm = document.getElementById('responses');

function displaySearch(data) {
    if(!responsesElm) {
        console.log("Error in getting 'responses' field");
        return;
    }
    // AC1/AC2: matches found: show raw JSON text
    // AC3: no matches - explicit message instead of empty display
    responsesElm.textContent = data.length === 0 ? 'No cities found' : JSON.stringify(data, null, 2);
}