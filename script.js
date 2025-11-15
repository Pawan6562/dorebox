// ==================================================
// SHARED FUNCTIONS & CONFIG
// ==================================================
function updateSEO(movieTitle, movieDescription, pageType) {
    const titleElement = document.querySelector('title');
    let descriptionElement = document.querySelector('meta[name="description"]');
    const canonicalElement = document.querySelector('link[rel="canonical"]');
    const currentUrl = window.location.href.split('?')[0];

    if (!canonicalElement) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', currentUrl);
        document.head.appendChild(link);
    } else {
        canonicalElement.setAttribute('href', currentUrl);
    }

    let newTitle = '';
    let newDescription = '';

    if (pageType === 'watch') {
        newTitle = `Watch ${movieTitle} Online in Hindi - DoreBox`;
        newDescription = `Watch the full movie ${movieTitle} in Hindi for free on DoreBox. High-quality streaming available. Click here to start watching!`;
    } else if (pageType === 'download') {
        newTitle = `Download ${movieTitle} Full Movie in Hindi Free - DoreBox`;
        newDescription = `Download the full movie ${movieTitle} in Hindi for free from DoreBox. Get direct links for 1080p, 720p, and 360p quality.`;
    }

    if (titleElement) {
        titleElement.textContent = newTitle;
    }
    if (!descriptionElement) {
        descriptionElement = document.createElement('meta');
        descriptionElement.setAttribute('name', 'description');
        document.head.appendChild(descriptionElement);
    }
    descriptionElement.setAttribute('content', newDescription);
}
// ==================================================
// ==================================================
const REWARD_AMOUNT = 0.0030;
const MIN_WITHDRAWAL = 1.00;

function getOrCreateUserID() {
    let userID = localStorage.getItem('dorebox_user_id');
    if (!userID) {
        userID = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('dorebox_user_id', userID);
    }
    return userID;
}

function getUserData() {
    const defaultData = { balance: 0.0000 };
    try {
        const data = JSON.parse(localStorage.getItem('dorebox_user_data'));
        return data || defaultData;
    } catch (error) {
        return defaultData;
    }
}

function saveUserData(data) {
    localStorage.setItem('dorebox_user_data', JSON.stringify(data));
}

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const currentUserID = getOrCreateUserID();
console.log("DoreBox User ID:", currentUserID);

// ==================================================
// MASTER DATABASES
// ==================================================
    const movies = [

     {
        title: "Doraemon: Nobita's Earth Symphony",
        poster: "https://iili.io/f94Nezg.jpg",
        description: `Title: Doraemon: Nobita’s Earth Symphony
Release Date: March 1, 2024
Duration: 115 minutes
Genre: Adventure • Fantasy • Musical • Sci-Fi
Director: Kazuaki Imai
Studio: Shin-Ei Animation

Description:
Nobita, tired of struggling in his music class, gets pulled into a mysterious world where music is the source of life. A dark force called Noise begins destroying all sound, putting both Earth and the music planet Farre in danger. Nobita, Doraemon, and their friends must perform a powerful musical piece to restore harmony and save both worlds. The film celebrates the idea that music connects every living being.`,
        embed: "",
        downloadLinks: {
            '1080p': 'https://temp-link.com/1080p', // Temporary link
            '720p': '#',
            '360p': '#'
        }
    },

    { title: "Doraemon Nobita and the Spiral City", poster: "https://iili.io/KTEEtjI.jpg", description: "Using a gadget, Doraemon and Nobita create a new city in a different dimension. But when criminals from their world find a way in, they must protect their new home.", embed: "" , downloadLinks: { '1080p': 'https://gplinks.co/Spiralcityonbotat1080p', '720p': 'https://gplinks.co/thespiralcityin720pbycjh', '360p': 'https://gplinks.co/thespiralcityin360pbycjh' } },
    { title: "Doraemon The Movie Nobita In Jannat No 1", poster: "https://iili.io/KzKuPMQ.jpg", description: "Join Nobita and his friends on an exciting adventure to a magical kingdom in the clouds. A paradise awaits, but is everything as perfect as it seems?", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/kingdomofcloudin1080pbycjh', '720p': 'https://gplinks.co/kingdomofcloudin720pbycjh', '360p': 'https://gplinks.co/kingdomofcloudin360pbycjh' } },
    { title: "Doraemon jadoo Mantar aur jhanoom", poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg", description: "🎬 𝗗𝗼𝗿𝗮𝗲𝗺𝗼𝗻 𝗧𝗵𝗲 𝗠𝗼𝘃𝗶𝗲: 𝗝𝗮𝗱𝗼𝗼 𝗠𝗮𝗻𝘁𝗮𝗿 𝗔𝘂𝗿 𝗝𝗵𝗮𝗻𝗼𝗼𝗺\n[ 𝟮𝟬𝟮𝟯 • 𝟭𝗵 𝟱𝟮𝗺 • 𝗔𝗱𝘃𝗲𝗻𝘁𝘂𝗿𝗲 • 𝗛𝗗 ]", embed: '', downloadLinks: { '1080p':'https://gplinks.co/Jadumantaronbotat1080pbyajh', '720p': 'https://gplinks.co/Jadumantaraurjhanoom720pbycjh', '360p': 'https://gplinks.co/Jadumantaraurjhanoom360pbycjh' } },
    { title: "Dinosaur Yodha", poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg", description: "Nobita and his friends travel back in time to the age of dinosaurs and must protect them from futuristic hunters.", embed: '', downloadLinks: { '1080p': 'https://gplinks.co/Dinasoryodha', '720p': 'https://gplinks.co/Dinasoryodhain720pbycjh', '360p': 'https://gplinks.co/Dinasoryodhain360pbycjh' } },
    { title: "Doraemon The Movie Nobita and the Underwater Adventure", poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg", description: "Join Nobita and his friends on a thrilling journey deep beneath the waves to an ancient, mysterious kingdom.", embed: '', downloadLinks: { '1080p': 'https://gplinks.co/UnderwaterAdventurebycjh', '720p': 'https://gplinks.co/Underworldadventurebycjh', '360p': 'https://gplinks.co/Underworldadventurebycjh' } },
    { title: "ICHI MERA DOST", poster: "https://i.postimg.cc/xjpCppDL/Doraemon-The-Movie-Nobita-in-Ichi-Mera-Dost-Hindi.png", description: "Nobita finds a mysterious seed which grows into a sapling. This sapling can move and think, and soon becomes Nobita's best friend, Ichi.", embed: '', downloadLinks: { '1080p': 'https://gplinks.co/Ichimeradostin1080pbycjh', '720p': 'https://gplinks.co/Ichimeradostin720pbycjh', '360p': 'https://gplinks.co/Ichimeradostin360pbycjh' } },
    { title: "Doraemon Nobita's Dorabian Nights",
    poster: "https://iili.io/KqRfWdv.png",
    description: "Join Doraemon and friends on a magical adventure into the world of the Arabian Nights!",
    embed: `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://geo.dailymotion.com/player.html?video=x9t2pss" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>
`,
    // m3u8 waali line hata di hai
    downloadLinks: {
        '1080p': 'https://gplinks.co/dorabiannightonbotat1080pbyahj',
        '720p': '#',
        '360p': '#'
    }
},

    { title: "Chronicle of the Moon", poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg", description: "This movie is available for download.", embed: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
    <iframe 
        src="https://geo.dailymotion.com/player.html?video=x9qpb4s&autoplay=0"
        style="width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden; border:none;"
        allow="fullscreen; web-share" 
        allowfullscreen
        title="Dailymotion Video Player">
    </iframe>
</div>`, downloadLinks: { '1080p': 'https://gplinks.co/ChronicleoftheMoonin1080pbycjh', '720p': 'https://gplinks.co/ChronicleoftheMoonin720pbycjh', '360p': 'https://gplinks.co/ChronicleoftheMoonin360pbycjh' } },
    { title: "Sky Utopia", poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg", description: "This movie is available for download.", embed: ``, downloadLinks: { '1080p': 'https://gplinks.co/NobitaSkyutopiain1080pbycjh', '720p': 'https://gplinks.co/NobitaSkyutopiain7200pbycjh', '360p': 'https://gplinks.co/NobitaSkyutopiain360pbycjh' } },
    { title: "Antarctic Adventure", poster: "https://iili.io/Kx9Qifn.jpg", description: "Doraemon and friends travel to Antarctica and discover a huge pyramid.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/antarcticadventurein1080pbycjh', '720p': 'https://gplinks.co/antarcticadventurein720pbycjh', '360p': 'https://gplinks.co/antarcticadventurein360pbycjh' } },
    { title: "Little Space War", poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/littlespacewaronbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Gadget Museum Ka Rahasya", poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg", description: "This movie is available for download.", embed: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/3x0hp0jjn5.js" async type="module"></script><style>wistia-player[media-id='3x0hp0jjn5']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/3x0hp0jjn5/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style> <wistia-player media-id="3x0hp0jjn5" aspect="1.7777777777777777"></wistia-player>`, downloadLinks: { '1080p': 'https://gplinks.co/Gadetmuseuminbotat1080p', '720p': 'https://gplinks.co/Nobitagadgetin720pbycjh', '360p': 'https://gplinks.co/Nobitagadgetin360pbycjh' } },
    { title: "Doraemon: Nobita's New Dinosaur (fan Dubbed)", poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
    { title: "Space Hero", poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
    { title: "Steel Troops – New Age", poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Steeltroponbotat1080pbyajh', '720p': 'https://gplinks.co/nobitasteelstroopsin720pbycjh', '360p': 'https://gplinks.co/nobitasteelstroopsin360pbycjh' } },
    { title: "Three Visionary Swordsmen", poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png", description: "This movie is available for download.", embed: `<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="doraemon_all_movies_byajh/2443" data-width="100%"></script>`, downloadLinks: { '1080p': 'https://gplinks.co/Nobitathreesordmenin1080pbycjh', '720p': 'https://gplinks.co/Nobitathreesordmenin720pbycjh', '360p': 'https://gplinks.co/Nobitathreesordmenin360pbycjh' } },
    { title: "Nobita In Hara Hara Planet", poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' } },
    { title: "Adventure of Koya Koya", poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Koyakoyaonbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Doraemon nobita and the Birthday of japan", poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Birthdayjapanonbotat1080pbycjh', '720p': '#', '360p': '#' } },
    { title: "Nobita's Dinosaur", poster: "https://iili.io/KiQ8eOQ.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/dinasouronbotat1080pbyajh', '720p': '#', '360p': '#' } },
    { title: "Parallel Visit to West", poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Paralleltowestonbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Legend of Sun King", poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Legendsunatboton1080p', '720p': '#', '360p': '#' } },
    { title: "Stand by Me – Part 1", poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Standmeatboton1080p', '720p': '#', '360p': '#' } },
    { title: "Stand by Me – Part 2", poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Standme2atboton1080p', '720p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin720p', '360p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin360p' } },
    { title: "Doraemon Nobita's Great Adventure in the South Seas", poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Southseaonbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Khilone Ki Bhul Bhulaiya", poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Bhulbhulaiyaonbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Birdopia Ka Sultan", poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Birdopiasultanonbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Doraemon Nobita's Treasure Island", poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg", description: "This movie is available for download.", embed: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
    <iframe 
        src="https://geo.dailymotion.com/player.html?video=x9szpd2&autoplay=0"
        style="width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden; border:none;"
        allow="fullscreen; web-share" 
        allowfullscreen
        title="Dailymotion Video Player">
    </iframe>
</div>`, downloadLinks: { '1080p': 'https://gplinks.co/treasureislandonbotat1080p', '720p': 'https://gplinks.co/treasureislandbycjhin720p', '360p': 'https://gplinks.co/treasureislandbycjhin360p' } },
    { title: "Doraemon The Movie Nobita The Explorer Bow Bow", poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Bowbowonbotat1080p', '720p': 'https://gplinks.co/Nobitabowbowin720pbycjh', '360p': 'https://gplinks.co/Nobitabowbowin360pbycjh' } },
    { title: "Doraemon Nobita and the Windmasters", poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Windmasteronbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Doraemon Nobita and the Island of Miracle", poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Islandmiracleonbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Doraemon Galaxy Super Express Hindi", poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/galaxyexpressonbotat1080p', '720p': '#', '360p': '#' } },
    { title: "Doraemon Nobita And The Kingdom Of Robot Singham", poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg", description: "This movie is available for download.", embed: "", downloadLinks: { '1080p': 'https://gplinks.co/Robotsinghamonbotat1080p', '720p': '#', '360p': '#' } },
];

const episodes = [
    {
        title: "Doraemon Season 1",
        poster: "https://iili.io/KDQrkLN.png",
        description: "Doraemon ka pehla season! Nobita aur Doraemon ke classic adventures ki shuruaat. Dekhein pehle 52 episodes.",
        embed: "", 
        downloadLinks: {
            "Episodes 01-10": "https://gplinks.co/Doraemons1e1-10byajh",
            "Episodes 11-20": "https://gplinks.co/Doraemons1e10-20byajh",
            "Episodes 21-30": "https://gplinks.co/Doraemons1e20-30byajh",
            "Episodes 31-40": "https://gplinks.co/Doraemons1e30-40byajh",
            "Episodes 41-52": "https://gplinks.co/Doraemons1e40-52byajh"
        }
    },
    {
        title: "Doraemon Season 2",
        poster: "https://iili.io/KDZEJEB.png",
        description: "Adventure jaari hai! Doraemon ke Season 2 mein dekhein Nobita ki nayi shararatein aur Doraemon ke naye, kamaal ke gadgets.",
        embed: "", 
        downloadLinks: {
            "Episodes 01-10": "https://gplinks.co/Doraemons2e1-10byajh",
            "Episodes 11-20": "https://gplinks.co/Doraemons2e10-20byajh",
            "Episodes 21-30": "https://gplinks.co/Doraemons2e20-30byajh",
            "Episodes 31-40": "https://gplinks.co/Doraemons2e30-40byajh",
            "Episodes 41-51": "https://gplinks.co/Doraemons2e40-51byajh"
        }
    },
    {
        title: "Doraemon Season 3",
        poster: "https://iili.io/KbuSDW7.png",
        description: "Masti aur hungama ka teesra dose! Season 3 mein dekhein aur bhi mazedaar kahaniyan aur gadgets jo aapko hasa-hasa kar pagal kar denge.",
        embed: "", 
        downloadLinks: {
            "Episodes 01-20": "https://gplinks.co/Doraemons3e1-20byajh",
            "Episodes 21-40": "https://gplinks.co/Doraemons3e21-40byajh",
            "Episodes 41-52": "https://gplinks.co/Doraemons3e41-52byajh"
        }
    },
    {
        title: "Doraemon Season 4",
        poster: "https://iili.io/KbA34Hb.png",
        description: "Chaos aur comedy ka chautha chapter! Season 4 mein Nobita ki nayi-nayi problems aur Doraemon ke aur bhi creative solutions dekhein.",
        embed: "", 
        downloadLinks: {
            "Episodes 01-20": "https://gplinks.co/doraemons4e1-20byajh",
            "Episodes 21-40": "https://gplinks.co/doraemons4e21-40byajh",
            "Episodes 41-52": "https://gplinks.co/doraemons4e41-52byajh"
        }
    },
    // ✅ NAYA SEASON 5 ADD HO GAYA HAI
    {
        title: "Doraemon Season 5",
        poster: "https://iili.io/KbMduTB.png",
        description: "Paanchwa season, paanch guna maza! Doraemon aur Nobita ki dosti aur bhi gehri hoti hai is naye season mein. Naye adventures ke liye taiyaar ho jao!",
        embed: "", 
        downloadLinks: {
            "Episodes 01-20": "https://gplinks.co/doraemons5e1-20byajh",
            "Episodes 21-40": "https://gplinks.co/doraemons5e21-40byajh",
            "Episodes 41-52": "https://gplinks.co/doraemons5e41-52byajh"
        }
    }
    
];

const shortMovies = [];

window.dorebox_content = { movies, episodes, shortMovies };

// ==================================================
// MAIN WEBSITE LOGIC
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // ==================================================
    // PAGE: INDEX.HTML
    // ==================================================
    if (document.getElementById('hero')) { // Check if it's the homepage
        const splashScreen = document.getElementById('festival-splash');
        if (splashScreen) { setTimeout(() => { splashScreen.classList.add('hidden'); }, 4000); }

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
                document.getElementById("days").innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
                document.getElementById("hours").innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                document.getElementById("minutes").innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                document.getElementById("seconds").innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
            }, 1000);
        }
        startCountdown();

        const searchBar = document.getElementById("search-bar");
        const tabLinks = document.querySelectorAll(".tab-link");
        const tabContents = document.querySelectorAll(".tab-content");
        const grids = { movies: document.getElementById("movie-grid"), episodes: document.getElementById("episode-grid"), shorts: document.getElementById("short-movie-grid") };
        const noResults = { movies: document.getElementById("no-results-movies"), episodes: document.getElementById("no-results-episodes"), shorts: document.getElementById("no-results-shorts") };

        function displayContent(type, contentArray) {
            const grid = grids[type];
            const noResultEl = noResults[type];
            if (!grid || !noResultEl) return;
            grid.innerHTML = "";
            noResultEl.classList.toggle("hidden", contentArray.length > 0);
            contentArray.forEach((item) => {
                const card = document.createElement("div");
                card.className = "movie-card";
                card.innerHTML = `<a href="watch.html?title=${encodeURIComponent(item.title)}&type=${type}"><div class="poster-container"><img src="${item.poster}" alt="${item.title}" loading="lazy"><div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"></path></svg></div></div><h3>${item.title}</h3></a>`;
                grid.appendChild(card);
            });
        }

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const tab = link.getAttribute('data-tab');
                let newPlaceholder = (tab === 'movies') ? 'Search All Movies...' : (tab === 'episodes') ? 'Search All Episodes...' : 'Search Short Movies...';
                if (searchBar.placeholder !== newPlaceholder) {
                    searchBar.classList.add('placeholder-fade');
                    setTimeout(() => { searchBar.placeholder = newPlaceholder; searchBar.classList.remove('placeholder-fade'); }, 300);
                }
                tabLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                tabContents.forEach(content => content.classList.toggle('active', content.id === `${tab}-content`));
                searchBar.value = '';
                displayContent('movies', movies);
                displayContent('episodes', episodes);
                displayContent('shorts', shortMovies);
            });
        });

        if (searchBar) {
            searchBar.addEventListener("keyup", (e) => {
                const searchTerm = e.target.value.toLowerCase();
                displayContent('movies', movies.filter(m => m.title.toLowerCase().includes(searchTerm)));
                displayContent('episodes', episodes.filter(ep => ep.title.toLowerCase().includes(searchTerm)));
                displayContent('shorts', shortMovies.filter(s => s.title.toLowerCase().includes(searchTerm)));
            });
        }

        displayContent('movies', movies);
        displayContent('episodes', episodes);
        displayContent('shorts', shortMovies);
    }

    // ==================================================
// PAGE: WATCH.HTML (Interstitial Ad - The Working Solution)
// ==================================================
if (body.classList.contains('watch-page')) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentTitle = decodeURIComponent(urlParams.get('title'));
    const currentType = urlParams.get('type') || 'movies';
    const allContent = (window.dorebox_content && window.dorebox_content[currentType]) ? window.dorebox_content[currentType] : [];
        const currentItem = allContent.find(m => m.title === currentTitle);

        if (currentItem) {
            // === SEO OPTIMIZATION: Dynamic Meta Tags and Title ===
            updateSEO(currentItem.title, currentItem.description, 'watch');
            // ==================================================
            document.getElementById('movie-poster').src = currentItem.poster;
        document.getElementById('movie-title').textContent = currentItem.title;
        document.getElementById('movie-description').textContent = currentItem.description;
        
        const playerContainer = document.getElementById('video-player-container');
        
        // Movie ko turant load kar do
        console.log("Loading movie player directly. Interstitial ad will show on top.");
        if (currentItem.embed && currentItem.embed.trim() !== "") {
            playerContainer.innerHTML = currentItem.embed;
        } else {
            playerContainer.style.display = 'none';
            document.getElementById('player-message').style.display = 'block';
        }

        // Baaki ka code (Download, Share, Related Movies) waise hi rahega
        const downloadButton = document.getElementById('download-link');
        if (currentItem.downloadLinks) {
            downloadButton.href = `download.html?title=${encodeURIComponent(currentItem.title)}&type=${currentType}`;
            downloadButton.style.display = 'inline-flex';
        } else {
            downloadButton.style.display = 'none';
        }
        
        const shareButton = document.getElementById('share-button');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({ title: `Watch ${currentItem.title} on DoreBox`, text: `I'm watching ${currentItem.title} on DoreBox. You can watch or download it from here:`, url: window.location.href }).catch(console.error);
                } else {
                    alert("Sharing is not supported on this browser. Please copy the link manually.");
                }
            });
        }
        
        const relatedGrid = document.getElementById("related-movie-grid");
        if (relatedGrid && window.dorebox_content && window.dorebox_content.movies) {
            const otherMovies = window.dorebox_content.movies.filter(m => m.title !== currentTitle).sort(() => 0.5 - Math.random()).slice(0, 4);
            relatedGrid.innerHTML = '';
            otherMovies.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.className = "movie-card";
                movieCard.innerHTML = `<a href="watch.html?title=${encodeURIComponent(movie.title)}&type=movies"><img src="${movie.poster}" alt="${movie.title}" loading="lazy"><h3>${movie.title}</h3></a>`;
                relatedGrid.appendChild(movieCard);
            });
        }
    } else {
        document.querySelector('.watch-container').innerHTML = "<h1>Error: Content details not found. Please go back to the homepage.</h1>";
    }
}


    // ==================================================
    // PAGE: DOWNLOAD.HTML
    // ==================================================
    if (body.classList.contains('download-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentTitle = decodeURIComponent(urlParams.get('title'));
        const currentType = urlParams.get('type') || 'movies';
        const allContent = (window.dorebox_content && window.dorebox_content[currentType]) ? window.dorebox_content[currentType] : [];
        const currentItem = allContent.find(m => m.title === currentTitle);

        if (currentItem) {
            // === SEO OPTIMIZATION: Dynamic Meta Tags and Title ===
            updateSEO(currentItem.title, currentItem.description, 'download');
            // ==================================================
            document.getElementById('movie-poster').src = currentItem.poster;
            document.getElementById('movie-title').textContent = currentItem.title;
            const qualityOptionsContainer = document.getElementById('quality-options');
            qualityOptionsContainer.innerHTML = '';
            if (currentItem.downloadLinks && Object.keys(currentItem.downloadLinks).length > 0) {
                for (const quality in currentItem.downloadLinks) {
                    const link = currentItem.downloadLinks[quality];
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
                backButton.href = `watch.html?title=${encodeURIComponent(currentItem.title)}&type=${currentType}`;
            }
        } else {
            document.querySelector('.download-page-container').innerHTML = "<h1>Error: Movie details not found. Please go back to the homepage.</h1>";
        }
    }

    // ==================================================
    // PAGE: PROFILE.HTML
    // ==================================================
    if (body.classList.contains('profile-page')) {
        document.getElementById('profile-page-user-id').textContent = currentUserID;
        const clearIdButton = document.getElementById('clear-id-btn');
        if (clearIdButton) {
            clearIdButton.addEventListener('click', () => {
                if (confirm("Are you sure you want to clear your User ID and ALL your data (including balance)? This cannot be undone.")) {
                    localStorage.removeItem('dorebox_user_id');
                    localStorage.removeItem('dorebox_user_data');
                    localStorage.removeItem('dorebox_current_task');
                    alert("Your data has been cleared. A new ID will be generated on the next visit.");
                    window.location.reload();
                }
            });
        }
    }

    // ==================================================
    // PAGE: REWARDS.HTML
    // ==================================================
    if (body.classList.contains('rewards-page')) {
        const balanceEl = document.getElementById('user-balance');
        const generateBtn = document.getElementById('generate-task-btn');
        const withdrawBtn = document.getElementById('withdraw-btn');
        const messageEl = document.getElementById('task-message');
        const spinner = document.querySelector('.spinner');
        const btnText = document.querySelector('.btn-text');

        const userData = getUserData();
        balanceEl.textContent = `$${userData.balance.toFixed(4)}`;

        if (userData.balance >= MIN_WITHDRAWAL) {
            withdrawBtn.classList.remove('disabled');
            withdrawBtn.textContent = `Withdraw $${userData.balance.toFixed(2)}`;
        }

        const pendingTask = JSON.parse(localStorage.getItem('dorebox_current_task'));
        if (pendingTask && pendingTask.status === 'pending') {
            generateBtn.disabled = true;
            btnText.textContent = 'Task Pending...';
            if (messageEl) {
                messageEl.textContent = 'You have a pending task. Please complete it first.';
                messageEl.style.color = 'orange';
            }
        }

        generateBtn.addEventListener('click', async () => {
            generateBtn.disabled = true;
            spinner.classList.remove('hidden');
            btnText.classList.add('hidden');
            if (messageEl) messageEl.textContent = '';

            const secretToken = Math.random().toString(36).substring(2, 12);
            const tokenHash = await hashString(secretToken);

            const taskInfo = { hash: tokenHash, status: 'pending', generatedAt: Date.now() };
            localStorage.setItem('dorebox_current_task', JSON.stringify(taskInfo));

            try {
                const response = await fetch('/api/generate-link', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ secretToken: secretToken })
                });
                const data = await response.json();
                if (response.ok) {
                    const modal = document.getElementById('redirect-modal');
                    const modalLinkInput = document.getElementById('modal-task-link');
                    const modalCountdown = document.getElementById('modal-countdown');

                    modalLinkInput.value = data.shortUrl;
                    modal.classList.remove('hidden');

                    let countdown = 5;
                    modalCountdown.textContent = `Redirecting in ${countdown} seconds...`;

                    const countdownInterval = setInterval(() => {
                        countdown--;
                        modalCountdown.textContent = `Redirecting in ${countdown} seconds...`;
                        if (countdown <= 0) {
                            clearInterval(countdownInterval);
                            window.location.href = data.shortUrl;
                        }
                    }, 1000);

                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            } catch (error) {
                if (messageEl) {
                    messageEl.textContent = `Error: ${error.message}`;
                    messageEl.style.color = 'red';
                }
                localStorage.removeItem('dorebox_current_task');
                generateBtn.disabled = false;
                spinner.classList.add('hidden');
                btnText.classList.remove('hidden');
                btnText.textContent = 'Generate Task Link';
            }
        });
    }

    // ==================================================
    // PAGE: TASK-COMPLETED.HTML
    // ==================================================
    if (body.classList.contains('verification-page')) {
        const statusEl = document.getElementById('verification-status');
        const verifyTask = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const receivedToken = urlParams.get('token');
            if (!receivedToken) {
                statusEl.innerHTML = '<h1>Verification Failed</h1><p>No token found. Please complete the task properly.</p>';
                return;
            }
            const pendingTask = JSON.parse(localStorage.getItem('dorebox_current_task'));
            if (!pendingTask || pendingTask.status !== 'pending') {
                statusEl.innerHTML = '<h1>Verification Failed</h1><p>Task is invalid or has already been completed.</p>';
                return;
            }
            const expectedHash = pendingTask.hash;
            const receivedTokenHash = await hashString(receivedToken);
            if (receivedTokenHash === expectedHash) {
                localStorage.removeItem('dorebox_current_task');
                const userData = getUserData();
                userData.balance += REWARD_AMOUNT;
                saveUserData(userData);
                statusEl.innerHTML = `<h1>Success!</h1><p>$${REWARD_AMOUNT.toFixed(4)} has been added to your balance.</p><p>Redirecting you back...</p>`;
                setTimeout(() => { window.location.href = '/rewards.html'; }, 3000);
            } else {
                statusEl.innerHTML = '<h1>Verification Failed</h1><p>Token mismatch. Please do not try to cheat the system.</p>';
            }
        };
        verifyTask();
    }
});
