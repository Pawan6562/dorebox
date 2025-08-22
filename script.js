document.addEventListener("DOMContentLoaded", () => {
    // ==================================================
    // MASTER MOVIE DATABASE
    // ==================================================
    const movies = [
        // "COMING SOON" WALI MOVIES
        { title: "Chronicle of the Moon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2018` }, // Example Link
        { title: "Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", description: "Coming Soon...", embed: ``, download: ``, tgLink: `https://t.me/doremonallmoviesepisodes/2019` },
        // ... (baaki sab coming soon movies)
        
        // ==================================================
        // AVAILABLE MOVIES NEECHE HAIN
        // ==================================================
        { 
            title: "Dinosaur Yodha", 
            poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg", 
            description: "Nobita and his friends travel back in time to the age of dinosaurs and must protect them from futuristic hunters.",
            embed: `<iframe src="https://voe.sx/e/q4snkojimceg" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>`, 
            download: `https://cdn-yrhohklc10mfxrgy.orbitcache.com/engine/download/01/15189/q4snkojimceg_n.mp4?t=od_BjHI3Y24E_Bnj6gpZHlvtXt6Ze-dyFzH4RfonZ48&s=1755696522&e=14400&f=75946881&node=9/YfUrcSSltRxRudPemYIkc9gzkqTBAOOy6oaT96arE=&i=0.1&sp=380&asn=55836&n=Doraemon-Nobita-and-the-Knights-on-Dinosaurs.mp4&d=1`,
            tgLink: `https://t.me/doremonallmoviesepisodes/2066` // Iska TG link add kar diya
        }, 
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
            tgLink: `https://t.me/doremonallmoviesepisodes/2055` // Iska TG link add kar diya
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
