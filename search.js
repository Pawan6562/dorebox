// ============================================================
// DOREBOX ADVANCED SEARCH ENGINE v2.0
// Features: Fuzzy Search, Dual Title Search, Filters,
//           Voice Search, Trending, Recent Searches
// ============================================================

// === COMPLETE CONTENT DATABASE (Both English & Indian Titles) ===
const allContent = [
    // MOVIES
    { title: "Doraemon: Nobita's Earth Symphony", indianTitle: "Doraemon: Nobita Aur Prithvi Ka Sangeet", poster: "https://iili.io/f94Nezg.jpg", type: "movies", year: 2024, genre: "Adventure, Musical" },
    { title: "Doraemon: Nobita's New World", indianTitle: "Doraemon The Movie Nobita Ki Nayi Duniya", poster: "https://iili.io/qJkX3MB.webp", type: "movies", year: 2024, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita's Mermaid Legend", indianTitle: "Doraemon: Nobita Aur Jalpari Ki Duniya", poster: "https://iili.io/BsgrngS.jpg", type: "movies", year: 2010, genre: "Adventure, Fantasy"},
    { title: "Doraemon: Nobita's New Dinosaur", indianTitle: "Doraemon: Nobita Ka Naya Dinosaur", poster: "https://www.tokyoweekender.com/wp-content/uploads/2020/08/Doraemon-Nobitas-new-dinosaur-Tokyo-Weekender-1024x709.jpg", type: "movies", year: 2020, genre: "Adventure, Family" },
    { title: "Doraemon: Nobita and the Spiral City", indianTitle: "Doraemon: Nobita Aur Spiral City", poster: "https://iili.io/KTEEtjI.jpg", type: "movies", year: 2023, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita's Little Star Wars 2021", indianTitle: "Doraemon The Movie Nobita In Jannat No 1", poster: "https://iili.io/KzKuPMQ.jpg", type: "movies", year: 2021, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita's Magic Wonders", indianTitle: "Doraemon Jadoo Mantar Aur Jhanoom", poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg", type: "movies", year: 2023, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita's Dinosaur Warriors", indianTitle: "Dinosaur Yodha", poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg", type: "movies", year: 2014, genre: "Adventure, Action" },
    { title: "Doraemon: Nobita and the Underwater Adventure", indianTitle: "Doraemon: Nobita Aur Paani Ke Andar Ki Duniya", poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg", type: "movies", year: 2010, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Ichi Mera Dost", indianTitle: "ICHI MERA DOST", poster: "https://i.postimg.cc/xjpCppDL/Doraemon-The-Movie-Nobita-in-Ichi-Mera-Dost-Hindi.png", type: "movies", year: 2015, genre: "Adventure, Family" },
    { title: "Doraemon: Nobita's Dorabian Nights", indianTitle: "Doraemon: Nobita Ki Dorabian Nights", poster: "https://iili.io/KqRfWdv.png", type: "movies", year: 1991, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita's Chronicle of the Moon Exploration", indianTitle: "Doraemon: Nobita Aur Chand Ka Rahasya", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", type: "movies", year: 2019, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita's Sky Utopia", indianTitle: "Doraemon: Nobita Ka Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", type: "movies", year: 2022, genre: "Adventure, Mystery" },
    { title: "Doraemon: Nobita's Antarctic Adventure", indianTitle: "Doraemon: Nobita Ka Antarktik Rahasya", poster: "https://iili.io/Kx9Qifn.jpg", type: "movies", year: 1983, genre: "Adventure, Classic" },
    { title: "Doraemon: Nobita's Little Star Wars", indianTitle: "Doraemon: Nobita Ki Chhoti Antariksh Yudh", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png", type: "movies", year: 1985, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita's Secret Gadget Museum", indianTitle: "Doraemon: Gadget Museum Ka Rahasya", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg", type: "movies", year: 2013, genre: "Adventure, Mystery" },
    { title: "Doraemon: Nobita and the Space Raiders", indianTitle: "Doraemon: Space Hero - Nobita Aur Antariksh Daku", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg", type: "movies", year: 2015, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita and the New Steel Troops", indianTitle: "Doraemon: Steel Troops – Nobita Aur Robot Sainik", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg", type: "movies", year: 2011, genre: "Adventure, Action" },
    { title: "Doraemon: Nobita's Three Visionary Swordsmen", indianTitle: "Doraemon: Teen Jadooi Talwarbaaz", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png", type: "movies", year: 1994, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita's Little Star Wars 2021 - Sky Kingdom", indianTitle: "Nobita In Hara Hara Planet", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg", type: "movies", year: 2021, genre: "Adventure, Family" },
    { title: "Doraemon: Nobita's Adventure in Koya Koya Planet", indianTitle: "Doraemon: Koya Koya Planet Ki Sair", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png", type: "movies", year: 2009, genre: "Adventure, Family" },
    { title: "Doraemon: Nobita and the Birth of Japan", indianTitle: "Doraemon: Nobita Aur Japan Ka Janm", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg", type: "movies", year: 1989, genre: "Adventure, Historical" },
    { title: "Doraemon: Nobita's Dinosaur", indianTitle: "Doraemon: Nobita Ka Dinosaur", poster: "https://iili.io/KiQ8eOQ.jpg", type: "movies", year: 2006, genre: "Adventure, Family" },
    { title: "Doraemon: Nobita's Parallel Journey to the West", indianTitle: "Doraemon: Nobita Ki Parallel Visit Paschim Ko", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg", type: "movies", year: 2007, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita and the Legend of the Sun King", indianTitle: "Doraemon: Nobita Aur Suraj Ka Raja", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg", type: "movies", year: 2000, genre: "Adventure, Historical" },
    { title: "Stand by Me Doraemon", indianTitle: "Stand by Me Doraemon – Part 1", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png", type: "movies", year: 2014, genre: "Drama, Adventure" },
    { title: "Stand by Me Doraemon 2", indianTitle: "Stand by Me Doraemon – Part 2", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png", type: "movies", year: 2020, genre: "Drama, Adventure" },
    { title: "Doraemon: Nobita's Great Adventure in the South Seas", indianTitle: "Doraemon: Nobita Ki Dakshin Sagar Mein Mahaan Sair", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg", type: "movies", year: 1998, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita in Toy Kingdom", indianTitle: "Doraemon: Khilone Ki Bhul Bhulaiya", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg", type: "movies", year: 2004, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita and the Birdopia's Sultan", indianTitle: "Doraemon: Birdopia Ka Sultan", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg", type: "movies", year: 2019, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita's Treasure Island", indianTitle: "Doraemon: Nobita Ka Khajana Dwip", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg", type: "movies", year: 2018, genre: "Adventure, Action" },
    { title: "Doraemon: Nobita – The Explorer Bow! Bow!", indianTitle: "Doraemon: Nobita Explorer Bow Bow", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png", type: "movies", year: 2012, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita and the Windmasters", indianTitle: "Doraemon: Nobita Aur Toofani Adventure", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg", type: "movies", year: 2003, genre: "Adventure, Fantasy" },
    { title: "Doraemon: Nobita and the Island of Miracles", indianTitle: "Doraemon: Nobita Aur Jadooi Tapu", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg", type: "movies", year: 2012, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita and the Galaxy Super-Express", indianTitle: "Doraemon: Galaxy Super Express Hindi", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png", type: "movies", year: 1996, genre: "Adventure, Sci-Fi" },
    { title: "Doraemon: Nobita and the Kingdom of Robots", indianTitle: "Doraemon: Nobita Aur Robot Singham", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg", type: "movies", year: 2011, genre: "Adventure, Sci-Fi" },
    // EPISODES
    { title: "Doraemon Season 1", indianTitle: "Doraemon Season 1 Hindi", poster: "https://iili.io/KDQrkLN.png", type: "episodes", year: 2014, genre: "Comedy, Family" },
    { title: "Doraemon Season 2", indianTitle: "Doraemon Season 2 Hindi", poster: "https://iili.io/KDZEJEB.png", type: "episodes", year: 2015, genre: "Comedy, Family" },
    { title: "Doraemon Season 3", indianTitle: "Doraemon Season 3 Hindi", poster: "https://iili.io/KbuSDW7.png", type: "episodes", year: 2016, genre: "Comedy, Family" },
    { title: "Doraemon Season 4", indianTitle: "Doraemon Season 4 Hindi", poster: "https://iili.io/KbA34Hb.png", type: "episodes", year: 2017, genre: "Comedy, Family" },
    { title: "Doraemon Season 5", indianTitle: "Doraemon Season 5 Hindi", poster: "https://iili.io/KbMduTB.png", type: "episodes", year: 2018, genre: "Comedy, Family" },
];

// Trending/Popular searches shown on load
const trendingSearches = [
    "Earth Symphony", "Stand by Me", "Treasure Island", "Steel Troops",
    "New Dinosaur", "Sky Utopia", "Dorabian Nights", "Season 1"
];

// ==================================================
// FUZZY SEARCH ENGINE
// Levenshtein Distance — tolerates typos & misspellings
// ==================================================
function levenshteinDistance(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i-1] === b[j-1]
                ? dp[i-1][j-1]
                : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
    }
    return dp[m][n];
}

function fuzzyScore(query, text) {
    query = query.toLowerCase().trim();
    text = text.toLowerCase().trim();
    if (!query) return 0;

    // Exact match = highest score
    if (text === query) return 100;
    // Contains = high score
    if (text.includes(query)) return 85;
    // Word-level contains
    const words = text.split(/\s+/);
    for (const word of words) {
        if (word.startsWith(query)) return 75;
        if (word.includes(query)) return 65;
    }
    // Query words present in text
    const qWords = query.split(/\s+/);
    const matchedWords = qWords.filter(qw => text.includes(qw));
    if (matchedWords.length === qWords.length) return 60;
    if (matchedWords.length > 0) return 40 + (matchedWords.length / qWords.length) * 20;

    // Fuzzy distance on individual words
    let bestDist = Infinity;
    for (const word of words) {
        const dist = levenshteinDistance(query, word);
        if (dist < bestDist) bestDist = dist;
    }
    // Allow 1 typo per 4 chars
    const threshold = Math.floor(query.length / 4) + 1;
    if (bestDist <= threshold) return Math.max(10, 35 - bestDist * 8);

    return 0;
}

function searchContent(query, filterType) {
    if (!query.trim()) return [];

    const scored = allContent
        .filter(item => !filterType || filterType === 'all' || item.type === filterType)
        .map(item => {
            const scores = [
                fuzzyScore(query, item.title) * 1.0,
                fuzzyScore(query, item.indianTitle || '') * 0.95,
                fuzzyScore(query, item.genre || '') * 0.5,
                fuzzyScore(query, String(item.year || '')) * 0.4,
            ];
            return { item, score: Math.max(...scores) };
        })
        .filter(x => x.score > 8)
        .sort((a, b) => b.score - a.score);

    return scored.map(x => x.item);
}

// ==================================================
// UI LOGIC
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('main-search-input');
    const clearBtn = document.getElementById('clear-search');
    const historySection = document.getElementById('search-history-section');
    const resultsSection = document.getElementById('search-results-section');
    const historyList = document.getElementById('history-list');
    const resultsGrid = document.getElementById('results-grid');
    const noResultsMsg = document.getElementById('no-results-msg');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const resultsCountEl = document.getElementById('results-count-heading');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const trendingContainer = document.getElementById('trending-searches');
    const voiceBtn = document.getElementById('voice-search-btn');

    let activeFilter = 'all';
    let searchHistory = JSON.parse(localStorage.getItem('dorebox_search_history')) || [];
    let searchTimeout = null;

    // ---- TRENDING ----
    if (trendingContainer) {
        trendingContainer.innerHTML = trendingSearches.map(t =>
            `<button class="trending-chip" onclick="setSearch('${t}')">#${t}</button>`
        ).join('');
    }

    // ---- FILTER BUTTONS ----
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            if (searchInput.value.trim()) performSearch(searchInput.value.trim());
        });
    });

    // ---- HISTORY ----
    function saveHistory(term) {
        if (!term || searchHistory.includes(term)) return;
        searchHistory.unshift(term);
        if (searchHistory.length > 10) searchHistory.pop();
        localStorage.setItem('dorebox_search_history', JSON.stringify(searchHistory));
        renderHistory();
    }

    function renderHistory() {
        historyList.innerHTML = '';
        if (searchHistory.length === 0) {
            historyList.innerHTML = '<p class="empty-history">No recent searches yet.</p>';
            return;
        }
        searchHistory.forEach((term, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-text" onclick="setSearch('${term.replace(/'/g, "\\'")}')">
                    <i class="fas fa-history history-icon"></i> ${term}
                </div>
                <button class="delete-history-item" onclick="deleteHistory(${index})" aria-label="Remove">
                    <i class="fas fa-times"></i>
                </button>`;
            historyList.appendChild(item);
        });
    }

    // ---- SEARCH ----
    function performSearch(query) {
        if (!query.trim()) {
            historySection.classList.remove('hidden');
            resultsSection.classList.add('hidden');
            clearBtn.classList.add('hidden');
            return;
        }

        historySection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        clearBtn.classList.remove('hidden');

        const results = searchContent(query, activeFilter);

        resultsGrid.innerHTML = '';

        if (results.length > 0) {
            noResultsMsg.classList.add('hidden');
            if (resultsCountEl) {
                resultsCountEl.innerHTML = `<span class="results-count-num">${results.length}</span> result${results.length !== 1 ? 's' : ''} for <span class="results-query">"${query}"</span>`;
            }
            results.forEach(item => {
                const card = document.createElement('div');
                card.className = 'movie-card search-result-card';
                const indianBadge = item.indianTitle && item.indianTitle !== item.title
                    ? `<span class="card-indian-title">${item.indianTitle}</span>` : '';
                const typeBadge = item.type === 'episodes' ? '<span class="card-type-badge episode-badge">TV Series</span>' : '<span class="card-type-badge">Movie</span>';
                card.innerHTML = `
                    <a href="watch.html?title=${encodeURIComponent(item.title)}&type=${item.type}">
                        <div class="poster-container">
                            <img src="${item.poster}" alt="${item.title} Hindi Download" loading="lazy">
                            <div class="play-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"></path></svg>
                            </div>
                            ${typeBadge}
                        </div>
                        <h3>${item.title}</h3>
                        ${indianBadge}
                    </a>`;
                resultsGrid.appendChild(card);
            });
        } else {
            noResultsMsg.classList.remove('hidden');
            if (resultsCountEl) {
                resultsCountEl.innerHTML = `No results for <span class="results-query">"${query}"</span>`;
            }
            // Suggest closest matches
            const suggestions = searchContent(query.substring(0, Math.max(2, query.length - 1)), activeFilter).slice(0, 3);
            if (suggestions.length > 0) {
                const suggestEl = document.getElementById('search-suggestions');
                if (suggestEl) {
                    suggestEl.innerHTML = `<p class="suggestion-label">Did you mean:</p>` +
                        suggestions.map(s => `<button class="suggestion-chip" onclick="setSearch('${s.title.replace(/'/g, "\\'")}')">${s.title}</button>`).join('');
                    suggestEl.classList.remove('hidden');
                }
            }
        }
    }

    // ---- DEBOUNCED INPUT ----
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        clearTimeout(searchTimeout);
        if (val.trim().length > 0) {
            clearBtn.classList.remove('hidden');
            searchTimeout = setTimeout(() => performSearch(val), 200);
        } else {
            clearBtn.classList.add('hidden');
            performSearch('');
        }
    });

    // Save to history on Enter or blur
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = searchInput.value.trim();
            if (val) { saveHistory(val); performSearch(val); }
        }
    });
    searchInput.addEventListener('blur', () => {
        const val = searchInput.value.trim();
        if (val && resultsSection && !resultsSection.classList.contains('hidden')) saveHistory(val);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch('');
        clearBtn.classList.add('hidden');
        searchInput.focus();
    });

    clearHistoryBtn.addEventListener('click', () => {
        searchHistory = [];
        localStorage.removeItem('dorebox_search_history');
        renderHistory();
    });

    // ---- VOICE SEARCH ----
    if (voiceBtn) {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            voiceBtn.style.display = 'flex';
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SR();
            recognition.lang = 'hi-IN';
            recognition.interimResults = false;
            recognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript;
                searchInput.value = transcript;
                voiceBtn.classList.remove('listening');
                voiceBtn.title = 'Voice Search';
                performSearch(transcript);
                saveHistory(transcript);
            };
            recognition.onerror = () => { voiceBtn.classList.remove('listening'); };
            recognition.onend = () => { voiceBtn.classList.remove('listening'); };
            voiceBtn.addEventListener('click', () => {
                voiceBtn.classList.add('listening');
                voiceBtn.title = 'Listening...';
                recognition.start();
            });
        } else {
            voiceBtn.style.display = 'none';
        }
    }

    // ---- URL PARAM SEARCH ----
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q');
    if (urlQuery) {
        searchInput.value = urlQuery;
        performSearch(urlQuery);
    }

    // Global functions
    window.setSearch = (term) => {
        searchInput.value = term;
        clearBtn.classList.remove('hidden');
        performSearch(term);
        searchInput.focus();
    };
    window.deleteHistory = (index) => {
        searchHistory.splice(index, 1);
        localStorage.setItem('dorebox_search_history', JSON.stringify(searchHistory));
        renderHistory();
    };

    renderHistory();
});
