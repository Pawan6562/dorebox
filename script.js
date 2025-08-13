document.addEventListener('DOMContentLoaded', () => {
    
    // Your movie database
    const movies = [
      { title: "Chronicle of the Moon", url: "https://smallshorts.com/NobitaChronicleoftheMoon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg" },
      { title: "Sky Utopia", url: "https://t.me/doremonallmoviesepisodes/2019", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg" },
      { title: "Antarctic Adventure", url: "https://t.me/doremonallmoviesepisodes/2024", poster: "https://i.postimg.cc/9f4SpVHL/Doraemon-Nobita-Chal-Pada-Antarctica-Hindi-by-cjh.jpg" },
      { title: "Doraemon jadoo Mantar aur jhanoom", url: "https://t.me/doremonallmoviesepisodes/2037", poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg" },
      { title: "Little Space War", url: "https://t.me/doremonallmoviesepisodes/2038", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png" },
      { title: "Gadget Museum Ka Rahasya", url: "https://t.me/doremonallmoviesepisodes/2041", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg" },
      { title: "Doraemon: Nobita's New Dinosaur (fan Dubbed)", url: "https://t.me/doremonallmoviesepisodes/2043", poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg" },
      { title: "Space Hero", url: "https://t.me/doremonallmoviesepisodes/2045", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg" },
      { title: "Steel Troops – New Age", url: "https://t.me/doremonallmoviesepisodes/2048", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg" },
      { title: "Three Visionary Swordsmen", url: "https://t.me/doremonallmoviesepisodes/2051", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png" },
      { title: "Nobita In Hara Hara Planet", url: "https://t.me/doremonallmoviesepisodes/2055", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg" },
      { title: "Adventure of Koya Koya", url: "https://t.me/doremonallmoviesepisodes/2061", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png" }
      // ... baaki movies yahan add karein
    ];

    // --- AAPKA AD CODE YAHAN HAI ---
    const adCode = `
        <div id="frame" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
          <iframe data-aa='2406568' src='//ad.a-ads.com/2406568/?size=300x250'
                            style='border:0; padding:0; width:300px; height:250px; overflow:hidden;'></iframe>
        </div>
    `;

    const movieGrid = document.getElementById('movie-grid');
    const searchBar = document.getElementById('search-bar');
    const noResults = document.getElementById('no-results');

    function displayContent(movieArray) {
        movieGrid.innerHTML = '';
        if (movieArray.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        
        let contentCounter = 0;
        movieArray.forEach(movie => {
            // Create and append the movie card
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <a href="${movie.url}" target="_blank">
                    <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                    <h3>${movie.title}</h3>
                </a>
            `;
            movieGrid.appendChild(movieCard);
            contentCounter++;

            // Har 5 content ke baad, ek ad card daalo
            if (contentCounter % 5 === 0) {
                const adCard = document.createElement('div');
                adCard.className = 'ad-movie-card';
                // Naya HTML structure (Title neeche)
                adCard.innerHTML = `
                    <div class="ad-banner-area">${adCode}</div>
                    <h3>Advertisement</h3>
                `;
                movieGrid.appendChild(adCard);
                contentCounter++;
            }
        });
    }

    // Search functionality
    searchBar.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        displayMoviesOnly(filteredMovies); 
    });

    function displayMoviesOnly(movieArray) {
        movieGrid.innerHTML = '';
        if (movieArray.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
        movieArray.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <a href="${movie.url}" target="_blank">
                    <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                    <h3>${movie.title}</h3>
                </a>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    // Initial display of all content
    displayContent(movies);
});
