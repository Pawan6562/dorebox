document.addEventListener("DOMContentLoaded", () => {
    // ==================================================
    // MASTER MOVIE DATABASE
    // ==================================================
    const movies = [
        // --- WATCH & DOWNLOAD MOVIES ---
        { 
            title: "Doraemon jadoo Mantar aur jhanoom", 
            poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg", 
            description: `🎬 𝗗𝗼𝗿𝗮𝗲𝗺𝗼𝗻 𝗧𝗵𝗲 𝗠𝗼𝘃𝗶𝗲: 𝗝𝗮𝗱𝗼𝗼 𝗠𝗮𝗻𝘁𝗮𝗿 𝗔𝘂𝗿 𝗝𝗵𝗮𝗻𝗼𝗼𝗺\n[ 𝟮𝟬𝟮𝟯 • 𝟭𝗵 𝟱𝟮𝗺 • 𝗔𝗱𝘃𝗲𝗻𝘁𝘂𝗿𝗲 • 𝗛𝗗 ]`, 
            embed: `<iframe src="https://voe.sx/e/jb8n6abxke5j" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>`,
            downloadLinks: { '1080p':'https://gplinks.co/jadu_mantaraur_jhanoom', '720p': 'https://gplinks.co/Jadumantaraurjhanoom720pbycjh', '360p': 'https://gplinks.co/Jadumantaraurjhanoom360pbycjh' }
        },
        { 
            title: "Dinosaur Yodha", 
            poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg", 
            description: "Nobita and his friends travel back in time to the age of dinosaurs and must protect them from futuristic hunters.",
            embed: `<iframe src="https://voe.sx/e/q4snkojimceg" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>`, 
            downloadLinks: { '1080p': 'https://gplinks.co/Dinasoryodha', '720p': 'https://gplinks.co/Dinasoryodhain720pbycjh', '360p': 'https://gplinks.co/Dinasoryodhain360pbycjh' }
        }, 
        { 
            title: "Doraemon The Movie Nobita and the Underwater Adventure", 
            poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg",
            description: "Join Nobita and his friends on a thrilling journey deep beneath the waves to an ancient, mysterious kingdom.",
            embed: `<IFRAME SRC="https://mivalyo.com/embed/2jjv05e2r19g" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>`,
            downloadLinks: { '1080p': 'https://gplinks.co/UnderwaterAdventurebycjh', '720p': 'https://gplinks.co/Underworldadventurebycjh', '360p': 'https://gplinks.co/Underworldadventurebycjh' }
        },
        { 
            title: "ICHI MERA DOST", 
            poster: "https://i.postimg.cc/xjpCppDL/Doraemon-The-Movie-Nobita-in-Ichi-Mera-Dost-Hindi.png",
            description: "Nobita finds a mysterious seed which grows into a sapling. This sapling can move and think, and soon becomes Nobita's best friend, Ichi.",
            embed: `<iframe src="https://voe.sx/e/tpmrkohlmfdz" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>`,
            downloadLinks: { '1080p': 'https://gplinks.co/Ichimeradostin1080pbycjh', '720p': 'https://gplinks.co/Ichimeradostin720pbycjh', '360p': 'https://gplinks.co/Ichimeradostin360pbycjh' }
        },

        // --- DOWNLOAD ONLY MOVIES ---
        { 
            title: "Doraemon Nobita's Dorabian Nights", 
            poster: "https://iili.io/KqRfWdv.png", 
            description: "Join Doraemon and friends on a magical adventure into the world of the Arabian Nights!", 
            embed: "", 
            downloadLinks: { 
                '1080p': 'https://gplinks.co/dorabiannightbycjhin1080p',
                '720p': '#', // Placeholder link
                '360p': '#'  // Placeholder link
            } 
        },
        { title: "Chronicle of the Moon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/ChronicleoftheMoonin1080pbycjh', '720p': 'https://gplinks.co/ChronicleoftheMoonin720pbycjh', '360p': 'https://gplinks.co/ChronicleoftheMoonin360pbycjh' } },
        { title: "Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/NobitaSkyutopiain1080pbycjh', '720p': 'https://gplinks.co/NobitaSkyutopiain7200pbycjh', '360p': 'https://gplinks.co/NobitaSkyutopiain360pbycjh' } },
        { title: "Antarctic Adventure", poster: "https://i.postimg.cc/9f4SpVHL/Doraemon-Nobita-Chal-Pada-Antarctica-Hindi-by-cjh.jpg", description: "Doraemon and friends travel to Antarctica and discover a huge pyramid.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/antarcticadventurein1080pbycjh', '720p': 'https://gplinks.co/antarcticadventurein720pbycjh', '360p': 'https://gplinks.co/antarcticadventurein360pbycjh' } },
        { title: "Little Space War", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Gadget Museum Ka Rahasya", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Doraemon: Nobita's New Dinosaur (fan Dubbed)", poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Space Hero", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Steel Troops – New Age", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/nobitasteelstroopsin1080pbycjh', '720p': 'https://gplinks.co/nobitasteelstroopsin720pbycjh', '360p': 'https://gplinks.co/nobitasteelstroopsin360pbycjh' } },
        { title: "Three Visionary Swordsmen", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Nobita In Hara Hara Planet", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Adventure of Koya Koya", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Doraemon nobita and the Birthday of japan", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Nobita's Dinosaur", poster: "https://i.postimg.cc/5NKgqnn1/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Parallel Visit to West", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Legend of Sun King", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Stand by Me – Part 1", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Stand by Me – Part 2", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin1080p', '720p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin720p', '360p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin360p' } },
        { title: "Doraemon Nobita's Great Adventure in the South Seas", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Khilone Ki Bhul Bhulaiya", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Birdopia Ka Sultan", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Doraemon Nobita's Treasure Island", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/treasureislandbycjhin1080p', '720p': 'https://gplinks.co/treasureislandbycjhin720p', '360p': 'https://gplinks.co/treasureislandbycjhin360p' } },
        { title: "Doraemon The Movie Nobita The Explorer Bow Bow", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Nobitabowbowin1080pbycjh', '720p': 'https://gplinks.co/Nobitabowbowin720pbycjh', '360p': 'https://gplinks.co/Nobitabowbowin360pbycjh' } },
        { title: "Doraemon Nobita and the Windmasters", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Doraemon Nobita and the Island of Miracle", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Nobitabowbowin1080pbycjh', '720p': 'https://gplinks.co/Nobitabowbowin720pbycjh', '360p': 'https://gplinks.co/Nobitabowbowin360pbycjh' } },
        { title: "Doraemon Galaxy Super Express Hindi", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } }, 
        { title: "Doraemon Nobita And The Kingdom Of Robot Singham", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
    ];

    window.dorebox_movies = movies;

    const isIndexPage = document.getElementById('movie-grid');
    const isWatchPage = document.querySelector('.watch-container');
    const isDownloadPage = document.querySelector('.download-page-container');

    if (isIndexPage) {
        const movieGrid = document.getElementById("movie-grid");
        const searchBar = document.getElementById("search-bar");
        const noResults = document.getElementById("no-results");
        const adCode = `<div class="ad-card"><iframe data-aa='2407034' src='//ad.a-ads.com/2407034/?size=300x250' style='border:0; padding:0; width:300px; height:250px; overflow:hidden; display: block; margin: auto'></iframe></div>`;

        function displayMovies(movieArray) {
            movieGrid.innerHTML = "";
            noResults.classList.toggle("hidden", movieArray.length === 0);
            let movieCounter = 0;
            movieArray.forEach((movie) => {
                const movieCard = document.createElement("div");
                movieCard.className = "movie-card";
                const isAvailable = movie.embed || movie.downloadLinks;
                let pageUrl = `watch.html?title=${encodeURIComponent(movie.title)}`;
                
                movieCard.innerHTML = `
                    <a href="${pageUrl}">
                        <div class="poster-container">
                            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                            <div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"></path></svg></div>
                        </div>
                        <h3>${movie.title}</h3>
                    </a>
                `;
                movieGrid.appendChild(movieCard);
                movieCounter++;
                if (movieCounter % 4 === 0) {
                    const adElement = document.createElement('div');
                    adElement.className = 'ad-card';
                    adElement.innerHTML = adCode;
                    movieGrid.appendChild(adElement);
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

    if (isWatchPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentTitle = decodeURIComponent(urlParams.get('title'));
        const currentMovie = movies.find(m => m.title === currentTitle);

        if (currentMovie) {
            document.title = `Watch ${currentMovie.title} - DoreBox`;
            document.getElementById('movie-poster').src = currentMovie.poster;
            document.getElementById('movie-title').textContent = currentMovie.title;
            document.getElementById('movie-description').textContent = currentMovie.description;
            
            const playerContainer = document.getElementById('video-player-container');
            const playerMessage = document.getElementById('player-message');

            if (currentMovie.embed) {
                playerContainer.innerHTML = currentMovie.embed;
                playerContainer.style.display = 'block';
                playerMessage.style.display = 'none';
            } else {
                playerContainer.style.display = 'none';
                playerMessage.style.display = 'block';
            }

            const downloadButton = document.getElementById('download-link');
            if (currentMovie.downloadLinks) {
                downloadButton.href = `download.html?title=${encodeURIComponent(currentMovie.title)}`;
                downloadButton.style.display = 'inline-flex';
            } else {
                downloadButton.style.display = 'none';
            }
            
            const shareButton = document.getElementById('share-button');
            shareButton.addEventListener('click', () => {
                const shareData = {
                    title: `Watch ${currentMovie.title} on DoreBox`,
                    text: `I'm watching ${currentMovie.title} on DoreBox. You can watch or download it from here:`,
                    url: window.location.href
                };
                if (navigator.share) {
                    navigator.share(shareData).catch(console.error);
                } else {
                    alert("Sharing is not supported on this browser. Please copy the link manually.");
                }
            });

            const related = movies.filter(m => m.title !== currentTitle);
            const relatedGrid = document.getElementById("related-movie-grid");
            if(relatedGrid) {
                relatedGrid.innerHTML = '';
                related.slice(0, 4).forEach(movie => {
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
                });
            }
        } else {
            document.querySelector('.watch-container').innerHTML = "<h1>Error: Movie details not found.</h1>";
        }
    }

    if (isDownloadPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentTitle = decodeURIComponent(urlParams.get('title'));
        const currentMovie = movies.find(m => m.title === currentTitle);

        if (currentMovie) {
            document.title = `Download ${currentMovie.title} - DoreBox`;
            document.getElementById('movie-poster').src = currentMovie.poster;
            document.getElementById('movie-title').textContent = currentMovie.title;

            const qualityOptionsContainer = document.getElementById('quality-options');
            qualityOptionsContainer.innerHTML = '';

            if (currentMovie.downloadLinks) {
                for (const quality in currentMovie.downloadLinks) {
                    const link = currentMovie.downloadLinks[quality];
                    const qualityBtn = document.createElement('a');
                    qualityBtn.href = link;
                    qualityBtn.className = 'quality-btn';
                    qualityBtn.textContent = `Download (${quality})`;
                    qualityBtn.target = '_blank';
                    qualityOptionsContainer.appendChild(qualityBtn);
                }
            } else {
                qualityOptionsContainer.innerHTML = '<p>Sorry, download links are not available for this movie.</p>';
            }

            document.getElementById('back-to-watch').href = `watch.html?title=${encodeURIComponent(currentMovie.title)}`;
        } else {
            document.querySelector('.download-page-container').innerHTML = "<h1>Error: Movie details not found.</h1>";
        }
    }
});
