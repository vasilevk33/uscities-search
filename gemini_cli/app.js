const API_BASE_URL = 'https://vasilekm-uscities-microservices-g5agatf7azf6a4a7.eastus-01.azurewebsites.net/uscities-search';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('results');
const statusMessage = document.getElementById('statusMessage');

let debounceTimer;
let currentAbortController = null;

const init = () => {
    searchInput.addEventListener('input', handleInput);
    searchButton.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
};

const handleInput = () => {
    const query = searchInput.value.trim();
    
    clearTimeout(debounceTimer);
    
    if (query.length < 2) {
        clearResults();
        return;
    }

    debounceTimer = setTimeout(() => {
        performSearch(query);
    }, 300);
};

const performSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        clearResults();
        return;
    }

    // AC-01.6: Cancel previous in-flight request
    if (currentAbortController) {
        currentAbortController.abort();
    }
    currentAbortController = new AbortController();

    showStatus('Searching...');
    clearResults();

    const isZip = /^\d+$/.test(trimmedQuery);
    const url = `${API_BASE_URL}/${encodeURIComponent(trimmedQuery)}`;

    try {
        const response = await fetch(url, { signal: currentAbortController.signal });
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        renderResults(data);
    } catch (error) {
        if (error.name === 'AbortError') return;
        
        console.error('Search error:', error);
        showStatus('An error occurred while searching. Please try again.', 'error');
    } finally {
        currentAbortController = null;
    }
};

const renderResults = (data) => {
    clearResults();
    
    if (!Array.isArray(data) || data.length === 0) {
        showStatus('No cities found', 'no-results');
        return;
    }

    showStatus(''); // Clear status

    const fragment = document.createDocumentFragment();
    data.forEach(city => {
        const card = document.createElement('div');
        card.className = 'city-card';
        
        // AC-01.10: Output sanitization (using textContent)
        const title = document.createElement('h3');
        title.textContent = `${city.city}, ${city.state_id}`;
        
        const stateName = document.createElement('p');
        stateName.textContent = `State: ${city.state_name}`;
        
        const county = document.createElement('p');
        county.textContent = `County: ${city.county_name}`;
        
        const timezone = document.createElement('p');
        timezone.textContent = `Timezone: ${city.timezone}`;

        const zips = document.createElement('p');
        zips.textContent = `ZIPs: ${city.zips}`;

        card.appendChild(title);
        card.appendChild(stateName);
        card.appendChild(county);
        card.appendChild(timezone);
        card.appendChild(zips);
        
        fragment.appendChild(card);
    });

    resultsContainer.appendChild(fragment);
};

const clearResults = () => {
    resultsContainer.innerHTML = '';
};

const showStatus = (message, type = '') => {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
};

init();
