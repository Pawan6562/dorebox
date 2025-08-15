document.addEventListener("DOMContentLoaded", () => {
    
    // Your movie database (ALL 28 MOVIES PRESERVED)
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
      { title: "Adventure of Koya Koya", url: "https://t.me/doremonallmoviesepisodes/2061", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png" },
      { title: "Doraemon nobita and the Birthday of japan", url: "https://t.me/doremonallmoviesepisodes/2063", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg" },
      { title: "Nobita's Dinosaur", url: "https://t.me/doremonallmoviesepisodes/2065", poster: "https://i.postimg.cc/5NKgqnn1/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg" },
      { title: "Parallel Visit to West", url: "https://t.me/doremonallmoviesepisodes/2067", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg" },
      { title: "Legend of Sun King", url: "https://t.me/doremonallmoviesepisodes/2070", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg" },
      { title: "Stand by Me – Part 1", url: "https://t.me/doremonallmoviesepisodes/2071", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png" },
      { title: "Stand by Me – Part 2", url: "https://t.me/doremonallmoviesepisodes/2072", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png" },
      { title: "Doraemon Nobita's Great Adventure in the South Seas", url: "https://t.me/doremonallmoviesepisodes/2152", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg" },
      { title: "Khilone Ki Bhul Bhulaiya", url: "https://t.me/doremonallmoviesepisodes/2095", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg" },
      { title: "Doraemon The Movie – Nobita and the Underwater Adventure", url: "https://t.me/doremonallmoviesepisodes/2120", poster: "https://i.postimg.cc/VLgfVvrj/Doraemon-The-Movie-Nobita-and-the-Underwater-Adventure.jpg" },
      { title: "Birdopia Ka Sultan", url: "https://t.me/doremonallmoviesepisodes/2129", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg" },
      { title: "Doraemon Nobita's Treasure Island", url: "https://t.me/doremonallmoviesepisodes/2138", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg" },
      { title: "Doraemon The Movie Nobita The Explorer Bow Bow", url: "https://t.me/doremonallmoviesepisodes/2150", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png" },
      { title: "Doraemon Nobita and the Windmasters", url: "https://t.me/doremonallmoviesepisodes/2154", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg" },
      { title: "Doraemon Nobita and the Island of Miracle", url: "https://t.me/doremonallmoviesepisodes/2158", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg" },
      { title: "Doraemon Galaxy Super Express Hindi", url: "https://t.me/doremonallmoviesepisodes/2165", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png" }, 
      { title: "Doraemon Nobita And The Kingdom Of Robot Singham", url: "https://t.me/doremonallmoviesepisodes/2174", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg" }
    ];

    const movieGrid = document.getElementById("movie-grid");
    const searchBar = document.getElementById("search-bar");
    const noResults = document.getElementById("no-results");

    // Function to display movies (without in-grid ads)
    function displayMovies(movieArray) {
        movieGrid.innerHTML = "";
        if (movieArray.length === 0) {
            noResults.classList.remove("hidden");
        } else {
            noResults.classList.add("hidden");
        }
        
        movieArray.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            
            movieCard.innerHTML = `
                <a href="${movie.url}" target="_blank">
                    <div class="poster-container">
                        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                        <div class="play-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"></path></svg>
                        </div>
                    </div>
                    <h3>${movie.title}</h3>
                </a>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    // Search functionality
    searchBar.addEventListener("keyup", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMovies = movies.filter(movie => {
            return movie.title.toLowerCase().includes(searchTerm);
        });
        displayMovies(filteredMovies);
    });

    // Initial display of all movies
    displayMovies(movies);

    // ===== Telega.io AD DISPLAY CODE =====
    // We will try to show the ad after a small delay (e.g., 2 seconds)
    // to make sure everything is loaded and the user has seen the page.
    setTimeout(() => {
        try {
            // Check if the 'ads' object from telega.io is available
            if (window.ads && typeof window.ads.ad_show === 'function') {
                ads.ad_show({
                  adBlockUuid: "85aa0576-18a5-4d08-ae3d-742ad7ecb144"
                });
            } else {
                console.error("Telega.io 'ads' object not found.");
            }
        } catch (error) {
            console.error("Telega.io ad could not be shown:", error);
        }
    }, 2000); // 2000 milliseconds = 2 seconds delay

});
