// search.js

// === DATA SOURCE (Copied from main script for speed) ===
const movies = [
    { title: "Doraemon: Nobita's Earth Symphony", poster: "https://iili.io/f94Nezg.jpg", type: "movies" },
    { title: "Doraemon Nobita and the Spiral City", poster: "https://iili.io/KTEEtjI.jpg", type: "movies" },
    { title: "Doraemon The Movie Nobita In Jannat No 1", poster: "https://iili.io/KzKuPMQ.jpg", type: "movies" },
    { title: "Doraemon jadoo Mantar aur jhanoom", poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg", type: "movies" },
    { title: "Dinosaur Yodha", poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg", type: "movies" },
    { title: "Doraemon The Movie Nobita and the Underwater Adventure", poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg", type: "movies" },
    { title: "ICHI MERA DOST", poster: "https://i.postimg.cc/xjpCppDL/Doraemon-The-Movie-Nobita-in-Ichi-Mera-Dost-Hindi.png", type: "movies" },
    { title: "Doraemon Nobita's Dorabian Nights", poster: "https://iili.io/KqRfWdv.png", type: "movies" },
    { title: "Chronicle of the Moon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", type: "movies" },
    { title: "Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", type: "movies" },
    { title: "Antarctic Adventure", poster: "https://iili.io/Kx9Qifn.jpg", type: "movies" },
    { title: "Little Space War", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png", type: "movies" },
    { title: "Gadget Museum Ka Rahasya", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg", type: "movies" },
    { title: "Doraemon: Nobita's New Dinosaur (fan Dubbed)", poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", type: "movies" },
    { title: "Space Hero", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg", type: "movies" },
    { title: "Steel Troops – New Age", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg", type: "movies" },
    { title: "Three Visionary Swordsmen", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png", type: "movies" },
    { title: "Nobita In Hara Hara Planet", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg", type: "movies" },
    { title: "Adventure of Koya Koya", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png", type: "movies" },
    { title: "Doraemon nobita and the Birthday of japan", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg", type: "movies" },
    { title: "Nobita's Dinosaur", poster: "https://iili.io/KiQ8eOQ.jpg", type: "movies" },
    { title: "Parallel Visit to West", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg", type: "movies" },
    { title: "Legend of Sun King", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg", type: "movies" },
    { title: "Stand by Me – Part 1", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png", type: "movies" },
    { title: "Stand by Me – Part 2", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png", type: "movies" },
    { title: "Doraemon Nobita's Great Adventure in the South Seas", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg", type: "movies" },
    { title: "Khilone Ki Bhul Bhulaiya", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg", type: "movies" },
    { title: "Birdopia Ka Sultan", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg", type: "movies" },
    { title: "Doraemon Nobita's Treasure Island", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg", type: "movies" },
    { title: "Doraemon The Movie Nobita The Explorer Bow Bow", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png", type: "movies" },
    { title: "Doraemon Nobita and the Windmasters", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg", type: "movies" },
    { title: "Doraemon Nobita and the Island of Miracle", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg", type: "movies" },
    { title: "Doraemon Galaxy Super Express Hindi", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png", type: "movies" },
    { title: "Doraemon Nobita And The Kingdom Of Robot Singham", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg", type: "movies" },
    { title: "Doraemon Season 1", poster: "https://iili.io/KDQrkLN.png", type: "episodes" },
    { title: "Doraemon Season 2", poster: "https://iili.io/KDZEJEB.png", type: "episodes" },
    { title: "Doraemon Season 3", poster: "https://iili.io/KbuSDW7.png", type: "episodes" },
    { title: "Doraemon Season 4", poster: "https://iili.io/KbA34Hb.png", type: "episodes" },
    { title: "Doraemon Season 5", poster: "https://iili.io/KbMduTB.png", type: "episodes" },
];

// === LOGIC START ===
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('main-search-input');
    const clearBtn = document.getElementById('clear-search');
    const historySection = document.getElementById('search-history-section');
    const resultsSection = document.getElementById('search-results-section');
    const historyList = document.getElementById('history-list');
    const resultsGrid = document.getElementById('results-grid');
    const noResultsMsg = document.getElementById('no-results-msg');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // 1. Load History
    let searchHistory = JSON.parse(localStorage.getItem('dorebox_search_history')) || [];

    function renderHistory() {
        historyList.innerHTML = '';
        if (searchHistory.length === 0) {
            historyList.innerHTML = '<p style="color:#666; text-align:center;">No recent searches</p>';
            return;
        }
        searchHistory.forEach((term, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-text" onclick="setSearch('${term}')">
                    <span class="history-icon">🕒</span> ${term}
                </div>
                <div class="delete-history-item" onclick="deleteHistory(${index})">&times;</div>
            `;
            historyList.appendChild(item);
        });
    }

    // 2. Search Functionality
    function performSearch(query) {
        if (!query) {
            historySection.classList.remove('hidden');
            resultsSection.classList.add('hidden');
            clearBtn.classList.add('hidden');
            return;
        }

        historySection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        clearBtn.classList.remove('hidden');

        const lowerQuery = query.toLowerCase();
        const filtered = movies.filter(m => m.title.toLowerCase().includes(lowerQuery));

        resultsGrid.innerHTML = '';
        if (filtered.length > 0) {
            noResultsMsg.classList.add('hidden');
            filtered.forEach(item => {
                const card = document.createElement('div');
                card.className = 'movie-card'; // Reusing style.css class
                // Fix: Ensure the link goes to watch.html correctly
                card.innerHTML = `
                    <a href="watch.html?title=${encodeURIComponent(item.title)}&type=${item.type}">
                        <div class="poster-container">
                            <img src="${item.poster}" alt="${item.title}" loading="lazy">
                        </div>
                        <h3>${item.title}</h3>
                    </a>
                `;
                resultsGrid.appendChild(card);
            });
        } else {
            noResultsMsg.classList.remove('hidden');
        }
    }

    // 3. Event Listeners
    searchInput.addEventListener('input', (e) => performSearch(e.target.value));

    searchInput.addEventListener('change', (e) => {
        const val = e.target.value.trim();
        if (val && !searchHistory.includes(val)) {
            searchHistory.unshift(val);
            if (searchHistory.length > 10) searchHistory.pop();
            localStorage.setItem('dorebox_search_history', JSON.stringify(searchHistory));
            renderHistory();
        }
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch('');
        searchInput.focus();
    });

    clearHistoryBtn.addEventListener('click', () => {
        searchHistory = [];
        localStorage.removeItem('dorebox_search_history');
        renderHistory();
    });

    // Expose functions to global scope for HTML onclick
    window.setSearch = (term) => {
        searchInput.value = term;
        performSearch(term);
    };

    window.deleteHistory = (index) => {
        searchHistory.splice(index, 1);
        localStorage.setItem('dorebox_search_history', JSON.stringify(searchHistory));
        renderHistory();
    };

    // Initial Render
    renderHistory();
});
