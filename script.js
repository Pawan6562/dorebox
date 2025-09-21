document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // SPLASH SCREEN LOGIC
    // ==================================================
    const splashScreen = document.getElementById('festival-splash');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, 4000);
    }

    // ==================================================
    // COUNTDOWN TIMER LOGIC
    // ==================================================
    function startCountdown() {
        const countdownBanner = document.getElementById("countdown-banner");
        if (!countdownBanner) return;

        const countdownDate = new Date("October 28, 2025 17:30:00").getTime();
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                countdownBanner.innerHTML = "<div class='banner-content' style='justify-content: center;'>छठ पूजा की हार्दिक शुभकामनाएं!</div>";
                return;
            }

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
            
            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;
        }, 1000);
    }
    startCountdown();

    // ==================================================
    // MUSIC TOGGLE LOGIC
    // ==================================================
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const iconPlay = document.querySelector('.icon-play');
    const iconMute = document.querySelector('.icon-mute');
    
    if (musicToggle && bgMusic && iconPlay && iconMute) {
        // Initial state: Music paused, show play icon
        iconPlay.style.display = 'inline';
        iconMute.style.display = 'none';
        musicToggle.title = "Play Music";

        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.log("Music play failed:", e));
                iconPlay.style.display = 'none';
                iconMute.style.display = 'inline';
                musicToggle.title = "Pause Music";
            } else {
                bgMusic.pause();
                iconPlay.style.display = 'inline';
                iconMute.style.display = 'none';
                musicToggle.title = "Play Music";
            }
        });
    }

    // ==================================================
    // CHHATH PUJA THEME: FLOATING DIYAS
    // ==================================================
    function createDiyas() {
        const body = document.body;
        if (!body) return;
        const diyaCount = 15;
        const baseAnimationDuration = 20;
        const zoneWidth = 100 / diyaCount;
        for (let i = 0; i < diyaCount; i++) {
            const diya = document.createElement('div');
            diya.classList.add('diya');
            const zoneStart = zoneWidth * i;
            diya.style.left = (zoneStart + Math.random() * zoneWidth) + 'vw';
            const animationDelay = (baseAnimationDuration / diyaCount) * i;
            const animationDuration = baseAnimationDuration + (Math.random() * 10 - 5);
            diya.style.animation = `float-up ${animationDuration}s linear ${animationDelay}s infinite`;
            diya.style.transform = `scale(${Math.random() * 0.4 + 0.6})`;
            body.appendChild(diya);
        }
    }
    createDiyas();

    // ==================================================
    // MASTER MOVIE DATABASE
    // ==================================================
    const movies = [
        { title: "Doraemon Nobita and the Spiral City", poster: "https://iili.io/KTEEtjI.jpg", description: "Using a gadget, Doraemon and Nobita create a new city in a different dimension. But when criminals from their world find a way in, they must protect their new home.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Spiralcityonbotat1080p', '720p': 'https://gplinks.co/thespiralcityin720pbycjh', '360p': 'https://gplinks.co/thespiralcityin360pbycjh' } },
        { title: "Doraemon The Movie Nobita In Jannat No 1", poster: "https://iili.io/KzKuPMQ.jpg", description: "Join Nobita and his friends on an exciting adventure to a magical kingdom in the clouds. A paradise awaits, but is everything as perfect as it seems?", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/kingdomofcloudin1080pbycjh', '720p': 'https://gplinks.co/kingdomofcloudin720pbycjh', '360p': 'https://gplinks.co/kingdomofcloudin360pbycjh' } },
        { title: "Doraemon jadoo Mantar aur jhanoom", poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg", description: "🎬 𝗗𝗼𝗿𝗮𝗲𝗺𝗼𝗻 𝗧𝗵𝗲 𝗠𝗼𝘃𝗶𝗲: 𝗝𝗮𝗱𝗼𝗼 𝗠𝗮𝗻𝘁𝗮𝗿 𝗔𝘂𝗿 𝗝𝗵𝗮𝗻𝗼𝗼𝗺\n[ 𝟮𝟬𝟮𝟯 • 𝟭𝗵 𝟱𝟮𝗺 • 𝗔𝗱𝘃𝗲𝗻𝘁𝘂𝗿𝗲 • 𝗛𝗗 ]", embed: '', downloadLinks: { '1080p':'https://gplinks.co/jadu_mantaraur_jhanoom', '720p': 'https://gplinks.co/Jadumantaraurjhanoom720pbycjh', '360p': 'https://gplinks.co/Jadumantaraurjhanoom360pbycjh' } },
        { title: "Dinosaur Yodha", poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg", description: "Nobita and his friends travel back in time to the age of dinosaurs and must protect them from futuristic hunters.", embed: '<iframe src="https://voe.sx/e/q4snkojimceg" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>', downloadLinks: { '1080p': 'https://gplinks.co/Dinasoryodha', '720p': 'https://gplinks.co/Dinasoryodhain720pbycjh', '360p': 'https://gplinks.co/Dinasoryodhain360pbycjh' } },
        { title: "Doraemon The Movie Nobita and the Underwater Adventure", poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg", description: "Join Nobita and his friends on a thrilling journey deep beneath the waves to an ancient, mysterious kingdom.", embed: '', downloadLinks: { '1080p': 'https://gplinks.co/UnderwaterAdventurebycjh', '720p': 'https://gplinks.co/Underworldadventurebycjh', '360p': 'https://gplinks.co/Underworldadventurebycjh' } },
        { title: "ICHI MERA DOST", poster: "https://i.postimg.cc/xjpCppDL/Doraemon-The-Movie-Nobita-in-Ichi-Mera-Dost-Hindi.png", description: "Nobita finds a mysterious seed which grows into a sapling. This sapling can move and think, and soon becomes Nobita's best friend, Ichi.", embed: '', downloadLinks: { '1080p': 'https://gplinks.co/Ichimeradostin1080pbycjh', '720p': 'https://gplinks.co/Ichimeradostin720pbycjh', '360p': 'https://gplinks.co/Ichimeradostin360pbycjh' } },
        { title: "Doraemon Nobita's Dorabian Nights", poster: "https://iili.io/KqRfWdv.png", description: "Join Doraemon and friends on a magical adventure into the world of the Arabian Nights!", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/dorabiannightbycjhin1080p', '720p': '#', '360p': '#' } },
        { title: "Chronicle of the Moon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/ChronicleoftheMoonin1080pbycjh', '720p': 'https://gplinks.co/ChronicleoftheMoonin720pbycjh', '360p': 'https://gplinks.co/ChronicleoftheMoonin360pbycjh' } },
        { title: "Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/NobitaSkyutopiain1080pbycjh', '720p': 'https://gplinks.co/NobitaSkyutopiain7200pbycjh', '360p': 'https://gplinks.co/NobitaSkyutopiain360pbycjh' } },
        { title: "Antarctic Adventure", poster: "https://iili.io/Kx9Qifn.jpg", description: "Doraemon and friends travel to Antarctica and discover a huge pyramid.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/antarcticadventurein1080pbycjh', '720p': 'https://gplinks.co/antarcticadventurein720pbycjh', '360p': 'https://gplinks.co/antarcticadventurein360pbycjh' } },
        { title: "Little Space War", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Gadget Museum Ka Rahasya", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Gadetmuseuminbotat1080p', '720p': 'https://gplinks.co/Nobitagadgetin720pbycjh', '360p': 'https://gplinks.co/Nobitagadgetin360pbycjh' } },
        { title: "Doraemon: Nobita's New Dinosaur (fan Dubbed)", poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Space Hero", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Steel Troops – New Age", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/nobitasteelstroopsin1080pbycjh', '720p': 'https://gplinks.co/nobitasteelstroopsin720pbycjh', '360p': 'https://gplinks.co/nobitasteelstroopsin360pbycjh' } },
        { title: "Three Visionary Swordsmen", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Nobitathreesordmenin1080pbycjh', '720p': 'https://gplinks.co/Nobitathreesordmenin720pbycjh', '360p': 'https://gplinks.co/Nobitathreesordmenin360pbycjh' } },
        { title: "Nobita In Hara Hara Planet", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Adventure of Koya Koya", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Koyakoyaonbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Doraemon nobita and the Birthday of japan", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Birthdayjapanonbotat1080pbycjh', '720p': '#', '360p': '#' } },
        { title: "Nobita's Dinosaur", poster: "https://i.postimg.cc/5NKgqnn1/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
        { title: "Parallel Visit to West", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Paralleltowestonbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Legend of Sun King", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Legendsunatboton1080p', '720p': '#', '360p': '#' } },
        { title: "Stand by Me – Part 1", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Standmeatboton1080p', '720p': '#', '360p': '#' } },
        { title: "Stand by Me – Part 2", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Standme2atboton1080p', '720p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin720p', '360p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin360p' } },
        { title: "Doraemon Nobita's Great Adventure in the South Seas", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Southseaonbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Khilone Ki Bhul Bhulaiya", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Bhulbhulaiyaonbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Birdopia Ka Sultan", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Birdopiasultanonbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Doraemon Nobita's Treasure Island", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/treasureislandbycjhin1080p', '720p': 'https://gplinks.co/treasureislandbycjhin720p', '360p': 'https://gplinks.co/treasureislandbycjhin360p' } },
        { title: "Doraemon The Movie Nobita The Explorer Bow Bow", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Bowbowonbotat1080p', '720p': 'https://gplinks.co/Nobitabowbowin720pbycjh', '360p': 'https://gplinks.co/Nobitabowbowin360pbycjh' } },
        { title: "Doraemon Nobita and the Windmasters", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Windmasteronbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Doraemon Nobita and the Island of Miracle", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Islandmiracleonbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Doraemon Galaxy Super Express Hindi", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/galaxyexpressonbotat1080p', '720p': '#', '360p': '#' } },
        { title: "Doraemon Nobita And The Kingdom Of Robot Singham", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Robotsinghamonbotat1080p', '720p': '#', '360p': '#' } },
    ];
    window.dorebox_movies = movies;

    // ==================================================
    // WEBSITE FUNCTIONALITY (INDEX, WATCH, DOWNLOAD PAGES)
    // ==================================================
    const isIndexPage = document.getElementById('movie-grid');
    const isWatchPage = document.querySelector('.watch-container');
    const isDownloadPage = document.querySelector('.download-page-container');

    // --- INDEX PAGE LOGIC ---
    if (isIndexPage) {
        const movieGrid = document.getElementById("movie-grid");
        const searchBar = document.getElementById("search-bar");
        const noResults = document.getElementById("no-results");

        function displayMovies(movieArray) {
            movieGrid.innerHTML = "";
            noResults.classList.toggle("hidden", movieArray.length === 0);
            movieArray.forEach((movie) => {
                const movieCard = document.createElement("div");
                movieCard.className = "movie-card";
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

    // --- WATCH PAGE LOGIC ---
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
                if(playerMessage) playerMessage.style.display = 'none';
            } else {
                playerContainer.style.display = 'none';
                if(playerMessage) playerMessage.style.display = 'block';
            }

            const downloadButton = document.getElementById('download-link');
            if (currentMovie.downloadLinks) {
                downloadButton.href = `download.html?title=${encodeURIComponent(currentMovie.title)}`;
                downloadButton.style.display = 'inline-flex';
            } else {
                downloadButton.style.display = 'none';
            }

            const shareButton = document.getElementById('share-button');
            if (shareButton) {
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
            }

            const related = movies.filter(m => m.title !== currentTitle);
            const relatedGrid = document.getElementById("related-movie-grid");
            if (relatedGrid) {
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

    // --- DOWNLOAD PAGE LOGIC ---
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

            if (currentMovie.downloadLinks && Object.keys(currentMovie.downloadLinks).length > 0) {
                for (const quality in currentMovie.downloadLinks) {
                    const link = currentMovie.downloadLinks[quality];
                    if (link && link !== '#') {
                        const qualityBtn = document.createElement('a');
                        qualityBtn.href = link;
                        qualityBtn.className = 'quality-btn';
                        qualityBtn.textContent = `Download (${quality})`;
                        qualityBtn.target = '_blank';
                        qualityOptionsContainer.appendChild(qualityBtn);
                    }
                }
            } else {
                qualityOptionsContainer.innerHTML = '<p>Sorry, download links are not available for this movie.</p>';
            }

            const backButton = document.getElementById('back-to-watch');
            if (backButton) {
                backButton.href = `watch.html?title=${encodeURIComponent(currentMovie.title)}`;
            }
        } else {
            document.querySelector('.download-page-container').innerHTML = "<h1>Error: Movie details not found.</h1>";
        }
    }

});
