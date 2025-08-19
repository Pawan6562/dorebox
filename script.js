document.addEventListener("DOMContentLoaded", () => {
    // Yahan hum apni saari movies ki list banayenge
    const movies = [
        // Tumhari nayi movie, sabse upar!
        { 
            title: "Doraemon The Movie Nobita and the Underwater Adventure", 
            poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg",
            description: "Join Nobita and his friends on a thrilling journey deep beneath the waves to an ancient, mysterious kingdom. A story of courage, friendship, and underwater wonders awaits!",
            embed: `<IFRAME SRC="https://mivalyo.com/embed/2jjv05e2r19g" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>`,
            download: `https://gplinks.co/Underworldadventurebycjh` 
        },
        // Baaki movies ke liye bhi aise hi entry karni hai
        { title: "Chronicle of the Moon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Antarctic Adventure", poster: "https://i.postimg.cc/9f4SpVHL/Doraemon-Nobita-Chal-Pada-Antarctica-Hindi-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon jadoo Mantar aur jhanoom", poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Little Space War", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Gadget Museum Ka Rahasya", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon: Nobita's New Dinosaur (fan Dubbed)", poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Space Hero", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Steel Troops – New Age", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Three Visionary Swordsmen", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Nobita In Hara Hara Planet", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Adventure of Koya Koya", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon nobita and the Birthday of japan", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Nobita's Dinosaur", poster: "https://i.postimg.cc/5NKgqnn1/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Parallel Visit to West", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Legend of Sun King", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Stand by Me – Part 1", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Stand by Me – Part 2", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon Nobita's Great Adventure in the South Seas", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Khilone Ki Bhul Bhulaiya", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Birdopia Ka Sultan", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon Nobita's Treasure Island", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon The Movie Nobita The Explorer Bow Bow", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon Nobita and the Windmasters", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon Nobita and the Island of Miracle", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` },
        { title: "Doraemon Galaxy Super Express Hindi", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png", description: "Coming Soon...", embed: ``, download: `` }, 
        { title: "Doraemon Nobita And The Kingdom Of Robot Singham", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: `` }
    ];

    const movieGrid = document.getElementById("movie-grid");
    const searchBar = document.getElementById("search-bar");
    const noResults = document.getElementById("no-results");

    // Tumhara A-Ads ka Banner Code
    const adCode = `
        <div style="width: 300px; margin: auto;">
            <iframe data-aa='2407034' src='//ad.a-ads.com/2407034/?size=300x250'
                    style='border:0; padding:0; width:300px; height:250px; overflow:hidden; display: block; margin: auto'></iframe>
        </div>
    `;

    function displayMovies(movieArray) {
        if (!movieGrid) return;
        movieGrid.innerHTML = "";
        noResults.classList.toggle("hidden", movieArray.length === 0);

        movieArray.forEach((movie, index) => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            
            const isAvailable = movie.embed && movie.download;
            const watchPageUrl = isAvailable ? `watch.html?title=${encodeURIComponent(movie.title)}` : '#';
            
            movieCard.innerHTML = `
                <a href="${watchPageUrl}" class="${!isAvailable ? 'coming-soon' : ''}">
                    <div class="poster-container">
                        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                        <div class="play-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"></path></svg>
                        </div>
                        ${!isAvailable ? '<div class="coming-soon-badge">Coming Soon</div>' : ''}
                    </div>
                    <h3>${movie.title}</h3>
                </a>
            `;
            movieGrid.appendChild(movieCard);

            // Har 4 movie ke baad ek ad daalo
            if ((index + 1) % 4 === 0) {
                const adCard = document.createElement("div");
                adCard.className = "ad-card"; // Ye class style.css me honi chahiye
                adCard.innerHTML = adCode;
                movieGrid.appendChild(adCard);
            }
        });
    }

    if (searchBar) {
        searchBar.addEventListener("keyup", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredMovies = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm)
            );
            // Search me ads nahi dikhayenge, taaki layout na bigde
            displayMovies(filteredMovies);
        });
    }

    window.dorebox_movies = movies;
    
    // Sirf index.html par hi movies display karo
    if (document.getElementById('movie-grid')) {
        displayMovies(movies);
    }
});

