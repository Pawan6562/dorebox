document.addEventListener("DOMContentLoaded", () => {
    // ==================================================
    // MASTER MOVIE DATABASE (POORI LIST KE SAATH)
    // ==================================================
    const movies = [
        // "COMING SOON" WALI MOVIES (AB POORI LIST HAI)
        { title: "Chronicle of the Moon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2018` },
        { title: "Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2019` },
        { title: "Antarctic Adventure", poster: "https://i.postimg.cc/9f4SpVHL/Doraemon-Nobita-Chal-Pada-Antarctica-Hindi-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2024` },
        { title: "Little Space War", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2038` },
        { title: "Gadget Museum Ka Rahasya", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2041` },
        { title: "Doraemon: Nobita's New Dinosaur (fan Dubbed)", poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2043` },
        { title: "Space Hero", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2045` },
        { title: "Steel Troops – New Age", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2048` },
        { title: "Three Visionary Swordsmen", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2051` },
        { title: "Nobita In Hara Hara Planet", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2055` },
        { title: "Adventure of Koya Koya", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2061` },
        { title: "Doraemon nobita and the Birthday of japan", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2063` },
        { title: "Nobita's Dinosaur", poster: "https://i.postimg.cc/5NKgqnn1/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2065` },
        { title: "Parallel Visit to West", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2067` },
        { title: "Legend of Sun King", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2070` },
        { title: "Stand by Me – Part 1", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2071` },
        { title: "Stand by Me – Part 2", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2072` },
        { title: "Doraemon Nobita's Great Adventure in the South Seas", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2152` },
        { title: "Khilone Ki Bhul Bhulaiya", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2095` },
        { title: "Birdopia Ka Sultan", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2129` },
        { title: "Doraemon Nobita's Treasure Island", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2138` },
        { title: "Doraemon The Movie Nobita The Explorer Bow Bow", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2150` },
        { title: "Doraemon Nobita and the Windmasters", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2154` },
        { title: "Doraemon Nobita and the Island of Miracle", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2158` },
        { title: "Doraemon Galaxy Super Express Hindi", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2165` }, 
        { title: "Doraemon Nobita And The Kingdom Of Robot Singham", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2174` },

        // ==================================================
        // AVAILABLE MOVIES NEECHE HAIN
        // ==================================================
        { 
            title: "Dinosaur Yodha", 
            poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg", 
            description: "Nobita and his friends travel back in time to the age of dinosaurs and must protect them from futuristic hunters.",
            embed: `<iframe src="https://voe.sx/e/q4snkojimceg" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>`, 
            download: `https://cdn-yrhohklc10mfxrgy.orbitcache.com/engine/download/01/15189/q4snkojimceg_n.mp4?t=od_BjHI3Y24E_Bnj6gpZHlvtXt6Ze-dyFzH4RfonZ48&s=1755696522&e=14400&f=75946881&node=9/YfUrcSSltRxRudPemYIkc9gzkqTBAOOy6oaT96arE=&i=0.1&sp=380&asn=55836&n=Doraemon-Nobita-and-the-Knights-on-Dinosaurs.mp4&d=1`,
            tgLink: `https://t.me/doremonallmoviesepisodes/2066`
        }, 
        { 
            title: "Doraemon jadoo Mantar aur jhanoom",    poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg",
             description: "", embed: `<iframe src="https://voe.sx/e/jb8n6abxke5j" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>
`, 
             download: `https://gplinks.co/jadu_mantaraur_jhanoom`, 
             tgLink: `https://t.me/doraemonall_episode/17` },
        { 
            title: "Doraemon The Movie Nobita and the Underwater Adventure", 
            poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg",
            description: "Join Nobita and his friends on a thrilling journey deep beneath the waves to an ancient, mysterious kingdom. A story of courage, friendship, and underwater wonders awaits!",
            embed: `<IFRAME SRC="https://mivalyo.com/embed/2jjv05e2r19g" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>`,
            download: `https://gplinks.co/Underworldadventurebycjh`,
            tgLink: `https://t.me/doremonallmoviesepisodes/2120`
        },
        { 
            title: "ICHI MERA DOST", 
            poster: "https://i.postimg.cc/xjpCppDL/Doraemon-The-Movie-Nobita-in-Ichi-Mera-Dost-Hindi.png",
            description: "Nobita finds a mysterious seed which grows into a sapling. This sapling can move and think, and soon becomes Nobita's best friend, Ichi. A heartwarming tale of an unusual friendship.",
            embed: `<iframe src="https://voe.sx/e/tpmrkohlmfdz" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>`,
            download: `https://gplinks.co/Ichimeradost`,
            tgLink: `https://t.me/doremonallmoviesepisodes/2055`
        }
    ];

    // Isko global bana do taaki watch.html isko use kar sake
    window.dorebox_movies = movies;

    // ==================================================
    // PAGE DETECTOR: Ye pata lagayega ki hum konse page par hain
    // ==================================================
    const isIndexPage = document.getElementById('movie-grid');
    const isWatchPage = document.querySelector('.watch-container');

    // ==================================================
    // AGAR HUM INDEX PAGE PAR HAIN TO YE CODE CHALEGA
    // ==================================================
    if (isIndexPage) {
        const movieGrid = document.getElementById("movie-grid");
        const searchBar = document.getElementById("search-bar");
        const noResults = document.getElementById("no-results");
        const adCode = `<div style="width: 300px; margin: auto;"><iframe data-aa='2407034' src='//ad.a-ads.com/2407034/?size=300x250' style='border:0; padding:0; width:300px; height:250px; overflow:hidden; display: block; margin: auto'></iframe></div>`;

        function displayMovies(movieArray) {
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
                            <div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"></path></svg></div>
                            ${!isAvailable ? '<div class="coming-soon-badge">Coming Soon</div>' : ''}
                        </div>
                        <h3>${movie.title}</h3>
                    </a>
                `;
                movieGrid.appendChild(movieCard);

                if ((index + 1) % 4 === 0) {
                    const adCard = document.createElement("div");
                    adCard.className = "ad-card";
                    adCard.innerHTML = adCode;
                    movieGrid.appendChild(adCard);
                }
            });
        }

        if (searchBar) {
            searchBar.addEventListener("keyup", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
                displayMovies(filteredMovies);
            });
        }
        
        displayMovies(movies);
    }

    // ==================================================
    // AGAR HUM WATCH PAGE PAR HAIN TO YE CODE CHALEGA
    // ==================================================
    if (isWatchPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentTitle = decodeURIComponent(urlParams.get('title'));
        const currentMovie = movies.find(m => m.title === currentTitle);

        if (currentMovie) {
            document.title = `Watch ${currentMovie.title} - DoreBox`;
            document.getElementById('video-player-container').innerHTML = currentMovie.embed;
            document.getElementById('movie-poster').src = currentMovie.poster;
            document.getElementById('movie-title').textContent = currentMovie.title;
            document.getElementById('movie-description').textContent = currentMovie.description;
            document.getElementById('download-link').href = currentMovie.download;

            const tgButton = document.getElementById('tg-link');
            if (currentMovie.tgLink) {
                tgButton.href = currentMovie.tgLink;
                tgButton.style.display = 'inline-flex';
            } else {
                tgButton.style.display = 'none';
            }

            const related = movies.filter(m => m.title !== currentTitle && m.embed);
            const relatedGrid = document.getElementById("related-movie-grid");
            
            if(relatedGrid) {
                relatedGrid.innerHTML = '';
                for(let i = 0; i < Math.min(4, related.length); i++) {
                    const movie = related[i];
                    const movieCard = document.createElement("div");
                    movieCard.className = "movie-card";
                    const watchPageUrl = `watch.html?title=${encodeURIComponent(movie.title)}`;
                    movieCard.innerHTML = `
                        <a href="${watchPageUrl}">
                            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                            <h3>${movie.title}</h3>
                        </a>
                    `;
                    relatedGrid.appendChild(movieCard);
                }
            }
        } else {
            document.querySelector('.watch-container').innerHTML = "<h1>Error: Movie details not found.</h1>";
        }
    }
});
