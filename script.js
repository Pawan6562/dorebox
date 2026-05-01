// ==================================================
// ADVANCED SEO FUNCTION (Targeting Download Keywords)
// ==================================================
function updateSEO(title, description, pageType, contentType = 'movie', poster = '', meta = {}) {
    // 1. Title Generate karo (Jo Google Search me dikhega)
    let pageTitle = '';
    
    // Agar Season/Episode hai
    if (contentType === 'episodes' || title.toLowerCase().includes('season')) {
        if (pageType === 'watch') {
            pageTitle = `Watch ${title} All Episodes in Hindi - DoreBox`;
        } else {
            pageTitle = `Download ${title} All Episodes Hindi (HD) - DoreBox`;
        }
    } 
    // Agar Movie hai
    else {
        if (pageType === 'watch') {
            pageTitle = `Watch ${title} Movie in Hindi (Free) - DoreBox`;
        } else {
            pageTitle = `Download ${title} Full Movie in Hindi (1080p/720p) - DoreBox`;
        }
    }

    // 2. Title aur Meta Description set karo
    document.title = pageTitle;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
    }
    
    // Description me bhi "Download" word use karo
    let newDesc = `Free Download & Watch ${title} in Hindi. ${pageType === 'download' ? 'Get direct download links for 1080p, 720p quality.' : 'Stream online without ads.'} DoreBox is the best site for Doraemon movies and episodes.`;
    metaDesc.setAttribute('content', newDesc);

    // 3. Social Media Tags update karo
    const updateMeta = (prop, val) => {
        let tag = document.querySelector(`meta[property="${prop}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', prop);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', val);
    };
    
    updateMeta('og:title', pageTitle);
    updateMeta('og:description', newDesc);
    if(poster) updateMeta('og:image', poster);

    // 4. Google Schema (Rich Results ke liye)
    const oldSchema = document.getElementById('dynamic-schema');
    if (oldSchema) oldSchema.remove();

    const schemaScript = document.createElement('script');
    schemaScript.id = 'dynamic-schema';
    schemaScript.type = 'application/ld+json';

    const schemaData = {
        "@context": "https://schema.org",
        "@type": contentType === 'episodes' ? "TVSeries" : "Movie",
        "name": title,
        "description": description,
        "image": poster,
        "url": window.location.href,
        "inLanguage": "hi",
        "isFamilyFriendly": true,
        "genre": meta.genre ? meta.genre.split(',').map(g => g.trim()) : ["Adventure", "Animation", "Family"],
        "dateCreated": meta.year ? String(meta.year) : undefined,
        "duration": meta.duration ? "PT" + meta.duration.replace("h ", "H").replace("m", "M").replace(" ", "") : undefined,
        "director": meta.director ? { "@type": "Person", "name": meta.director } : undefined,
        "contentRating": meta.rating || "U",
        "keywords": `${title} hindi download, ${title} watch online, doraemon movies hindi, DoreBox`
    };
    
    schemaScript.textContent = JSON.stringify(schemaData);
    document.body.appendChild(schemaScript);
}

// ==================================================
// USER & REWARDS SYSTEM CONFIG
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
        indianTitle: "Doraemon: Nobita Aur Prithvi Ka Sangeet",
        searchTerms: ["earth symphony", "prithvi sangeet", "music movie 2024", "nobita music", "farre planet"],
        poster: "https://iili.io/f94Nezg.jpg",
        description: `Doraemon: Nobita's Earth Symphony (Nobita Aur Prithvi Ka Sangeet)
Release: March 1, 2024 | Duration: 1h 55m
Genre: Adventure • Fantasy • Musical • Sci-Fi
Director: Kazuaki Imai | Studio: Shin-Ei Animation
Language: Hindi Dubbed | Rating: U

Nobita, who struggles in his music class, is suddenly transported to the planet Farre — a magical world where music is the very source of life. Every living creature there communicates and survives through sound and melody. But a terrifying darkness called Noise has begun devouring all sound, threatening both Farre and Earth. Nobita, Doraemon, Shizuka, Gian, and Suneo must unite to perform an ancient, powerful composition called the "Earth Symphony" to defeat Noise and restore harmony to the universe. A deeply moving film about the universal language of music and how it connects all living beings — one of the most emotionally resonant Doraemon films ever made.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/earthsymphonyonbotat1080pbyajh', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita's New World",
        indianTitle: "Doraemon The Movie Nobita Ki Nayi Duniya",
        searchTerms: ["nayi duniya", "new world", "nobita ki nayi duniya", "2024 doraemon"],
        poster: "https://iili.io/qJkX3MB.webp",
        description: `Doraemon: Nobita's New World (Nobita Ki Nayi Duniya)
Release: 2024 | Duration: 1h 37m
Genre: Adventure • Family • Sci-Fi
Director: Kazuaki Imai | Language: Hindi Dubbed | Rating: U

Nobita stumbles upon a mysterious portal that leads to a breathtaking new world unlike anything he has ever seen. With Doraemon's gadgets and the courage of his friends, he dives headfirst into this unknown realm teeming with strange creatures and ancient wonders. But a powerful threat lurks beneath the surface, and only the bond between Nobita and his friends can save this new world from destruction. A heartwarming adventure that celebrates the spirit of exploration and the magic of believing in yourself — even when the odds seem impossible.`,
        embed: ``,
        downloadLinks: { '1080p': 'https://gplinks.co/nobitaKinayiduniyaajhat1080p', '720p': '#', '360p': '#' }
    },
    {
       title: "Doraemon: Nobita's Mermaid Legend",
       indianTitle: "Doraemon: Nobita Aur Jalpari Ki Duniya",
       searchTerms: ["mermaid legend", "jalpari", "nobita jalpari", "mermaid king", "sophia mermaid", "samudri duniya", "underwater kingdom", "2010", "ningyo daikaisen"],
       poster: "https://iili.io/BsgrngS.jpg",
       description: `Doraemon: Nobita's Mermaid Legend (Nobita Aur Jalpari Ki Duniya)
   Release: March 6, 2010 | Duration: 1h 39m
   Genre: Adventure • Fantasy • Action • Sci-Fi
   Director: Kōzō Kusuba | Studio: Shin-Ei Animation
   Language: Hindi Dubbed | Rating: U

   Nobita begs Doraemon to let him experience underwater life. Using his "Underwater Pump Simulator" gadget, Doraemon floods the entire city of Tokyo underwater — turning streets into ocean floors. That night while diving, Nobita spots a mysterious fish tail and discovers a girl named Sophia — a mermaid princess from the planet Aqua who has crash-landed on Earth.

Sophia reveals that her underwater kingdom is under threat from a rival Merman tribe led by a ruthless villain who seeks to steal the legendary Mermaid Sword — an ancient weapon powerful enough to purify entire oceans. When Shizuka is kidnapped by the Merman King, Nobita and Doraemon must plunge deep into the underwater world to rescue her and help Sophia reclaim her kingdom.

A visually breathtaking underwater epic featuring colossal shark battles, ancient oceanic civilizations, and the magic of an unlikely friendship between a human boy and a mermaid princess. One of the most spectacular entries in the Doraemon film series — a love letter to the ocean and the creatures that call it home.`,
    embed: "",
    downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' }
},    
{
       title: "Doraemon: Nobita and the Animal Planet",
       indianTitle: "Doraemon: Jungle Mein Dangal",
       searchTerms: ["animal planet", "jungle mein dangal", "jangal mein dangal", "1990", "chippo", "nimuge", "janwar duniya", "animal world", "classic", "pink gas"],
       poster: "https://iili.io/BsrPil4.jpg",
       description: `Doraemon: Nobita and the Animal Planet (Jungle Mein Dangal)
   Release: March 10, 1990 | Duration: 1h 40m
   Genre: Adventure • Fantasy • Family • Eco
   Director: Tsutomu Shibayama | Studio: Shin-Ei Animation
   Language: Hindi Dubbed | Rating: U

   One mysterious night, a strange pink fog seeps into Nobita's room and pulls him into an extraordinary world — the Animal Planet (Animaru Wakusei), a lush, beautiful planet where intelligent animals live in complete harmony with nature. Every building runs on clean energy, every creature has a voice, and the jungles are alive with wonder.

There, Nobita and Doraemon befriend Chippo — a brave, adventurous young dog boy who is determined to explore the planet's forbidden forest in search of ancient relics. But the Animal Planet is in grave danger. A sinister alien organization called the Nimuge has launched a secret invasion, planning to strip the planet of its natural resources and enslave its animal inhabitants.

As Nobita and his friends join the animal resistance alongside Chippo, they must use Doraemon's gadgets, their own courage, and the power of friendship to drive out the invaders before the planet is destroyed forever. A deeply moving environmental adventure — one of the most beloved classic Doraemon films — with a message about protecting nature that feels more relevant today than ever.`,
    embed: "",
    downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' }
   },
    {
        title: "Doraemon: Nobita's New Dinosaur",
        indianTitle: "Doraemon: Nobita Ka Naya Dinosaur",
        searchTerms: ["new dinosaur", "naya dinosaur", "kyu myu", "2020", "twin dinosaur", "cretaceous"],
        poster: "https://www.tokyoweekender.com/wp-content/uploads/2020/08/Doraemon-Nobitas-new-dinosaur-Tokyo-Weekender-1024x709.jpg",
        description: `Doraemon: Nobita's New Dinosaur (Nobita Ka Naya Dinosaur)
Release: March 6, 2020 | Duration: 1h 50m
Genre: Adventure • Family • Sci-Fi
Director: Kazuaki Imai | Language: Hindi Dubbed | Rating: U

On his birthday, Nobita discovers two rare dinosaur eggs buried in ice — a T-Rex named Kyu and a mysterious new species named Myu. Using Doraemon's time-travel gadget, the gang journeys back 66 million years to the Cretaceous period to safely return the dinosaurs to their time. But the sinister BLACK organization is hunting prehistoric creatures for profit, and they will stop at nothing to capture Kyu and Myu. Nobita must find the courage to fight for the creatures he loves. A stunning, emotional adventure about friendship across time, the beauty of nature, and the heartbreak of goodbye.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/newdinasourbyajhin1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Spiral City",
        indianTitle: "Doraemon: Nobita Aur Spiral City",
        searchTerms: ["spiral city", "spiral shahr", "2023", "parallel dimension city", "nobita city"],
        poster: "https://iili.io/KTEEtjI.jpg",
        description: `Doraemon: Nobita and the Spiral City (Nobita Aur Spiral City)
Release: 2023 | Duration: 1h 40m
Genre: Adventure • Sci-Fi • Mystery
Director: Takahiro Imamura | Language: Hindi Dubbed | Rating: U

Using one of Doraemon's extraordinary gadgets, Nobita and his friends create an entire city inside a giant spiral shell — a place apart from the world, free and perfect. But soon, criminals from their own world discover the entrance and invade their private paradise. What started as a peaceful hideaway quickly turns into a battleground. Nobita and Doraemon must use every trick in their arsenal to protect their spiral city and the people they love. A fast-paced adventure about the meaning of home, freedom, and standing up against those who would take it from you.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Spiralcityonbotat1080p', '720p': 'https://gplinks.co/thespiralcityin720pbycjh', '360p': 'https://gplinks.co/thespiralcityin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Little Star Wars 2021",
        indianTitle: "Doraemon The Movie Nobita In Jannat No 1",
        searchTerms: ["jannat no 1", "little star wars 2021", "kingdom of clouds", "pirika", "papi alien", "star wars"],
        poster: "https://iili.io/KzKuPMQ.jpg",
        description: `Doraemon: Nobita's Little Star Wars 2021 (Nobita In Jannat No 1)
Release: 2021 | Duration: 1h 36m
Genre: Adventure • Fantasy • Family
Director: Takahiro Imamura | Language: Hindi Dubbed | Rating: U

Nobita discovers Papi — a tiny alien president who has fled his home planet Pirika after a military coup led by the ruthless General Gilmore. Using Doraemon's "Small Light" gadget, the gang shrinks themselves to Papi's size to help him hide. But Gilmore's forces track Papi to Earth, and the gang must help the tiny president fight back and reclaim his world. A reimagining of the beloved 1985 classic, updated with modern animation and new emotional depth. A thrilling action-adventure about justice, friendship, and the courage it takes to fight for what is right — no matter how small you are.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/kingdomofcloudin1080pbycjh', '720p': 'https://gplinks.co/kingdomofcloudin720pbycjh', '360p': 'https://gplinks.co/kingdomofcloudin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Magic Wonders",
        indianTitle: "Doraemon Jadoo Mantar Aur Jhanoom",
        searchTerms: ["jadoo mantar jhanoom", "magic wonders", "2023", "fantasy magic", "jadoo mantar"],
        poster: "https://i.postimg.cc/Z5t0TfkP/Doraemon-The-Movie-Jadoo-Mantar-Aur-Jahnoom-by-cjh.jpg",
        description: `Doraemon: Nobita's Magic Wonders (Jadoo Mantar Aur Jhanoom)
Release: 2023 | Duration: 1h 52m
Genre: Adventure • Fantasy • Action
Director: Takahiro Imamura | Language: Hindi Dubbed | Rating: U

Nobita discovers a magical world that runs entirely on sorcery rather than science — where flying carpets, enchanted potions, and spell-wielding wizards are everyday reality. Enchanted by this world, Nobita and his friends dive in, but soon a dark wizard threatens to use forbidden magic to conquer both this realm and Earth. Doraemon's gadgets meet ancient spells in an epic clash. A visually spectacular film packed with magical battles, heart-pounding action, and the message that true power comes not from magic or machines, but from the love between friends.`,
        embed: '',
        downloadLinks: { '1080p':'https://gplinks.co/Jadumantaronbotat1080pbyajh', '720p': 'https://gplinks.co/Jadumantaraurjhanoom720pbycjh', '360p': 'https://gplinks.co/Jadumantaraurjhanoom360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Dinosaur Warriors",
        indianTitle: "Dinosaur Yodha",
        searchTerms: ["dinosaur yodha", "dinosaur warriors", "2014", "time travel hunters", "dino warrior"],
        poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg",
        description: `Doraemon: Nobita's Dinosaur Warriors (Dinosaur Yodha)
Release: 2014 | Duration: 1h 35m
Genre: Adventure • Action • Sci-Fi
Director: Kozo Kusuba | Language: Hindi Dubbed | Rating: U

Nobita and his friends use Doraemon's time machine to travel back millions of years to the age of dinosaurs — a savage world of colossal predators and breathtaking prehistoric landscapes. But sinister hunters from the future have also arrived, armed with powerful weapons, intent on capturing dinosaurs for illegal trade. Nobita and the gang must transform into brave warriors to protect the dinosaurs and stop the poachers. A ferocious, action-driven adventure that blends time travel, ecology, and bravery — reminding viewers that every creature deserves protection, regardless of the era they live in.`,
        embed: '',
        downloadLinks: { '1080p': 'https://gplinks.co/Dinasoryodha', '720p': 'https://gplinks.co/Dinasoryodhain720pbycjh', '360p': 'https://gplinks.co/Dinasoryodhain360pbycjh' }
    },
    {
        title: "Doraemon: Nobita and the Underwater Adventure",
        indianTitle: "Doraemon: Nobita Aur Paani Ke Andar Ki Duniya",
        searchTerms: ["underwater adventure", "paani ke andar", "sea kingdom", "2010", "mermaid", "ocean"],
        poster: "https://i.postimg.cc/yYLjw5Pn/Doraemon-The-Movie-Nobita.jpg",
        description: `Doraemon: Nobita and the Underwater Adventure (Nobita Aur Paani Ke Andar Ki Duniya)
Release: 2010 | Duration: 1h 36m
Genre: Adventure • Fantasy • Family
Director: Shinichi Watanabe | Language: Hindi Dubbed | Rating: U

Nobita and his friends discover a breathtaking underwater civilization hidden deep beneath the ocean — an ancient kingdom filled with merfolk, sea creatures, and forgotten treasures. Using Doraemon's underwater gadgets, the gang dives into this mesmerizing world. But a powerful sea villain is plotting to awaken a long-dormant weapon that could destroy both the underwater kingdom and the surface world. Nobita must summon his courage to become a hero of the deep. A visually stunning underwater epic that blends ancient myth, underwater ecology, and the classic Doraemon spirit of friendship and adventure.`,
        embed: '',
        downloadLinks: { '1080p': 'https://gplinks.co/UnderwaterAdventurebycjh', '720p': 'https://gplinks.co/Underworldadventurebycjh', '360p': 'https://gplinks.co/Underworldadventurebycjh' }
    },
    {
        title: "Doraemon: Ichi Mera Dost",
        indianTitle: "ICHI MERA DOST",
        searchTerms: ["ichi mera dost", "ichi", "flower friend", "2015", "plant friend", "nobita plant"],
        poster: "https://i.postimg.cc/xjpCppDL/Doraemon-The-Movie-Nobita-in-Ichi-Mera-Dost-Hindi.png",
        description: `Doraemon: Ichi Mera Dost (My Friend Ichi)
Release: 2015 | Duration: 1h 37m
Genre: Adventure • Sci-Fi • Family
Director: Kozo Kusuba | Language: Hindi Dubbed | Rating: U

Nobita discovers a tiny, magical seed using one of Doraemon's gadgets. When planted, it grows into a small sapling that can move, think, and communicate — a living creature that quickly becomes Nobita's most beloved companion, whom he names Ichi. As Nobita and Ichi build a deep, beautiful friendship, dark forces from Ichi's home world arrive seeking to destroy Ichi. Nobita must fight to protect his friend with everything he has. A profoundly touching story about the most unexpected friendships, the love of nature, and the pain of protecting someone you love from a world that wants to harm them.`,
        embed: '',
        downloadLinks: { '1080p': 'https://gplinks.co/Ichimeradostin1080pbycjh', '720p': 'https://gplinks.co/Ichimeradostin720pbycjh', '360p': 'https://gplinks.co/Ichimeradostin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Dorabian Nights",
        indianTitle: "Doraemon: Nobita Ki Dorabian Nights",
        searchTerms: ["dorabian nights", "arabian nights", "1001 nights", "1991", "classic", "sinbad"],
        poster: "https://iili.io/KqRfWdv.png",
        description: `Doraemon: Nobita's Dorabian Nights (Nobita Ki Dorabian Nights)
Release: 1991 | Duration: 1h 25m
Genre: Adventure • Fantasy • Comedy
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

When Shizuka gets sucked into a storybook world based on the Arabian Nights, Nobita and Doraemon leap in after her to bring her back. Inside the book, they encounter giant genies, flying carpets, pirate ships, and the legendary world of Sinbad. But the book's villain — an evil sorcerer — refuses to let them leave. They must battle through one fantastical adventure after another to find Shizuka and escape. One of the most beloved classic Doraemon films, overflowing with imagination, humor, and the magic of storybook worlds coming to life. A timeless adventure for all ages.`,
        embed: `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;"><iframe src="https://geo.dailymotion.com/player.html?video=x9t2pss" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`,
        downloadLinks: { '1080p': 'https://gplinks.co/dorabiannightonbotat1080pbyahj', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita's Chronicle of the Moon Exploration",
        indianTitle: "Doraemon: Nobita Aur Chand Ka Rahasya",
        searchTerms: ["chronicle of moon", "chand ka rahasya", "moon exploration", "2019", "lunar", "kaguya"],
        poster: "https://i.postimg.cc/BbmtZs0X/m3.jpg",
        description: `Doraemon: Nobita's Chronicle of the Moon Exploration (Nobita Aur Chand Ka Rahasya)
Release: March 1, 2019 | Duration: 1h 51m
Genre: Adventure • Sci-Fi • Action
Director: Kazuaki Imai | Language: Hindi Dubbed | Rating: U

Nobita and friends discover a secret lunar civilization — the Kaguya, a race of cat-like beings who have been living beneath the Moon's surface for thousands of years, completely hidden from humanity. But a mysterious monster has awakened and is threatening to destroy the Kaguya's hidden world. As Nobita and the gang explore the stunning lunar underground, they unravel ancient secrets about the Moon's true history. A beautifully crafted sci-fi adventure full of mystery, friendship, and breathtaking moonscapes that explores the age-old human fascination with the night sky.`,
        embed: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="https://geo.dailymotion.com/player.html?video=x9qpb4s&autoplay=0" style="width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden; border:none;" allow="fullscreen; web-share" allowfullscreen title="Dailymotion Video Player"></iframe></div>`,
        downloadLinks: { '1080p': 'https://gplinks.co/ChronicleoftheMoonin1080pbycjh', '720p': 'https://gplinks.co/ChronicleoftheMoonin720pbycjh', '360p': 'https://gplinks.co/ChronicleoftheMoonin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Sky Utopia",
        indianTitle: "Doraemon: Nobita Ka Sky Utopia",
        searchTerms: ["sky utopia", "utopia", "2022", "perfect world", "sky paradise", "utopia planet"],
        poster: "https://i.postimg.cc/Nf3QTNXq/doraemon-movie-nobitas-sky-utopia-in-hindi.jpg",
        description: `Doraemon: Nobita's Sky Utopia (Nobita Ka Sky Utopia)
Release: August 5, 2022 | Duration: 1h 40m
Genre: Adventure • Sci-Fi • Mystery
Director: Takahiro Imamura | Language: Hindi Dubbed | Rating: U

Nobita discovers an ancient map that supposedly leads to Utopia — a legendary perfect world floating high above the clouds where no conflict, sadness, or hunger exists. Determined to find it, the gang builds an airship and sets off across the skies. When they finally arrive, the paradise seems too perfect to be real. As they dig deeper, the chilling truth about Utopia begins to surface. A thought-provoking and emotionally layered adventure that questions the very concept of a perfect society, freedom of thought, and what it truly means to be alive and imperfect.`,
        embed: ``,
        downloadLinks: { '1080p': 'https://gplinks.co/NobitaSkyutopiain1080pbycjh', '720p': 'https://gplinks.co/NobitaSkyutopiain7200pbycjh', '360p': 'https://gplinks.co/NobitaSkyutopiain360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Antarctic Adventure",
        indianTitle: "Doraemon: Nobita Ka Antarktik Rahasya",
        searchTerms: ["antarctic adventure", "antarktik rahasya", "1983", "classic penguin", "antarctica pyramid"],
        poster: "https://iili.io/Kx9Qifn.jpg",
        description: `Doraemon: Nobita's Antarctic Adventure (Nobita Ka Antarktik Rahasya)
Release: 1983 | Duration: 1h 36m
Genre: Adventure • Family • Classic
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

A pure classic of the Doraemon franchise! Nobita finds a baby penguin that has wandered far from Antarctica. Determined to return the penguin to its home, Doraemon and the gang embark on an extraordinary expedition to the frozen continent. But the journey is filled with icy dangers, fearsome polar creatures, and impossible weather conditions. One of the earliest and most charming Doraemon theatrical films, this adventure captures the spirit of the series at its most wholesome — the joy of nature, the warmth of friendship, and the determination to do what is right even when it is hard.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/antarcticadventurein1080pbycjh', '720p': 'https://gplinks.co/antarcticadventurein720pbycjh', '360p': 'https://gplinks.co/antarcticadventurein360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Little Star Wars",
        indianTitle: "Doraemon: Nobita Ki Chhoti Antariksh Yudh",
        searchTerms: ["little space war", "chhoti antariksh", "1985", "classic papi alien", "space war original"],
        poster: "https://i.postimg.cc/wTt8Th7t/Doraemon-in-Nobitas-Little-Space-War-Movie-Hindi-Tamil-Telugu-Download-HD-jpg-990x557.png",
        description: `Doraemon: Nobita's Little Star Wars (Nobita Ki Chhoti Antariksh Yudh)
Release: 1985 | Duration: 1h 35m
Genre: Adventure • Sci-Fi • Classic
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

The beloved original! A tiny alien named Papi crashes on Earth while fleeing a military coup on his home planet Pirika. Using Doraemon's "Small Light," the gang shrinks to Papi's miniature size to protect him. But General Gilmore's soldiers track Papi to Earth and launch an invasion. In miniature scale, everyday objects become enormous obstacles, and the gang must fight a full-scale galactic war from a bug's-eye view. This groundbreaking classic invented the "tiny heroes fighting giant foes" concept that defined an entire era of the franchise — hilarious, thrilling, and deeply moving.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/littlespacewaronbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita's Secret Gadget Museum",
        indianTitle: "Doraemon: Gadget Museum Ka Rahasya",
        searchTerms: ["gadget museum", "gadget museum ka rahasya", "2013", "doraemon bell stolen", "museum mystery"],
        poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg",
        description: `Doraemon: Nobita's Secret Gadget Museum (Gadget Museum Ka Rahasya)
Release: 2013 | Duration: 1h 35m
Genre: Adventure • Mystery • Family
Director: Kozo Kusuba | Language: Hindi Dubbed | Rating: U

A thief steals Doraemon's precious bell — the golden heart of his body — and flees to the future's legendary Gadget Museum, a vast archive containing every gadget ever created. Doraemon and Nobita travel to the future to retrieve the bell, only to find themselves in a thrilling museum mystery filled with traps, puzzles, and secret chambers. Meanwhile, a shadowy villain has a far darker plan involving the museum's most dangerous gadgets. A clever, mystery-driven adventure that doubles as a love letter to the entire history of Doraemon's incredible gadget universe.`,
        embed: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/3x0hp0jjn5.js" async type="module"></script><style>wistia-player[media-id='3x0hp0jjn5']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/3x0hp0jjn5/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style> <wistia-player media-id="3x0hp0jjn5" aspect="1.7777777777777777"></wistia-player>`,
        downloadLinks: { '1080p': 'https://gplinks.co/Gadetmuseuminbotat1080p', '720p': 'https://gplinks.co/Nobitagadgetin720pbycjh', '360p': 'https://gplinks.co/Nobitagadgetin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's New Dinosaur (Fan Dubbed)",
        indianTitle: "Doraemon: Nobita Ka Naya Dinosaur (Fan Dubbed)",
        searchTerms: ["new dinosaur fan dub", "fan dubbed dinosaur", "kyu myu fan version"],
        poster: "https://i.postimg.cc/hG0HJGX4/Doraemon-Nobitas-new-dinosaur-by-cjh.jpg",
        description: `Doraemon: Nobita's New Dinosaur — Fan Dubbed Version (Nobita Ka Naya Dinosaur)
Release: 2020 | Duration: 1h 50m
Genre: Adventure • Family • Sci-Fi
Fan Dubbed Version | Language: Hindi

This is the fan-dubbed Hindi version of the 2020 theatrical film "Nobita's New Dinosaur." On his birthday, Nobita hatches two baby dinosaurs from fossilized eggs — Kyu the T-Rex and the mysterious Myu. The gang travels back 66 million years to return the dinosaurs home, only to find themselves hunted by the villainous BLACK organization. The fan dub brings this beloved modern Doraemon film to Hindi-speaking audiences with passionate voice work from dedicated fans. The story remains one of the most emotional in the franchise — a tearful goodbye that will stay with you long after the credits roll.`,
        embed: "",
        downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Space Raiders",
        indianTitle: "Doraemon: Space Hero - Nobita Aur Antariksh Daku",
        searchTerms: ["space hero", "antariksh daku", "space raiders", "2015", "space pirates", "asteroid mine"],
        poster: "https://i.postimg.cc/50CKBN0F/Doraemon-The-Movie-Nobita-aur-Antarishk-Daku-bycjh.jpg",
        description: `Doraemon: Nobita and the Space Raiders (Space Hero — Nobita Aur Antariksh Daku)
Release: 2015 | Duration: 1h 37m
Genre: Adventure • Sci-Fi • Action
Director: Kozo Kusuba | Language: Hindi Dubbed | Rating: U

Space bandits descend on Earth and kidnap Shizuka along with other humans to use as forced labor in dangerous asteroid mines. When Nobita discovers what has happened, he refuses to stand by and do nothing. Doraemon equips the gang with space suits and gadgets, and they blast off to rescue Shizuka from deep in outer space. What follows is a non-stop, action-packed rescue mission across the cosmos against heavily armed alien pirates. A high-energy space opera packed with daring escapes, explosive confrontations, and the powerful message that the most heroic act of all is doing whatever it takes to protect the people you love.`,
        embed: "",
        downloadLinks: { '1080p': '#', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the New Steel Troops",
        indianTitle: "Doraemon: Steel Troops – Nobita Aur Robot Sainik",
        searchTerms: ["steel troops", "robot sainik", "new age steel", "2011", "robot army", "zanda claus"],
        poster: "https://i.postimg.cc/43C9KJr0/Doraemon-The-Movie-Nobita-and-the-Steel-Troops.jpg",
        description: `Doraemon: Nobita and the New Steel Troops — Winged Angels (Steel Troops – Nobita Aur Robot Sainik)
Release: 2011 | Duration: 1h 47m
Genre: Adventure • Sci-Fi • Action
Director: Shinichi Watanabe | Language: Hindi Dubbed | Rating: U

Nobita finds a mysterious portal that leads to a desolate, icy world. There he discovers Zanda Claus — a giant war robot frozen in the snow — and manages to activate it. Nobita and Zanda form a deep bond. But soon, a massive army of robot soldiers is dispatched from a distant alien planet with orders to conquer Earth, and Zanda holds the key to stopping them. A deeply moving sci-fi epic that explores identity, the ethics of war, and what it means to be alive. The emotional climax — one of the most powerful in Doraemon history — will leave you breathless.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Steeltroponbotat1080pbyajh', '720p': 'https://gplinks.co/nobitasteelstroopsin720pbycjh', '360p': 'https://gplinks.co/nobitasteelstroopsin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Three Visionary Swordsmen",
        indianTitle: "Doraemon: Teen Jadooi Talwarbaaz",
        searchTerms: ["three swordsmen", "teen talwarbaaz", "visionary swordsmen", "1994", "dream world", "fantasy sword"],
        poster: "https://i.postimg.cc/RZ82qxJ3/Doraemon-The-Movie-Nobita-s-Three-Magical-Swordsmen.png",
        description: `Doraemon: Nobita's Three Visionary Swordsmen (Teen Jadooi Talwarbaaz)
Release: 1994 | Duration: 1h 36m
Genre: Adventure • Fantasy • Action
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Using Doraemon's "Dream World Entrance Set," Nobita, Gian, and Suneo enter a magnificent dream-world of swords, sorcery, and epic fantasy. Here, Nobita transforms into Nobit the Swordsman, Gian into a mighty warrior, and Suneo into a skilled archer. Together they are the Three Visionary Swordsmen, prophesied to defeat the terrifying Demon King who has plunged the land into eternal darkness. But the dream world is more dangerous than they imagined — and its battles feel very, very real. A breathtaking fantasy epic in the tradition of sword-and-sorcery classics, with jaw-dropping set-pieces and legendary battles.`,
        embed: `<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="doraemon_all_movies_byajh/2443" data-width="100%"></script>`,
        downloadLinks: { '1080p': 'https://gplinks.co/Nobitathreesordmenin1080pbycjh', '720p': 'https://gplinks.co/Nobitathreesordmenin720pbycjh', '360p': 'https://gplinks.co/Nobitathreesordmenin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita's Little Star Wars 2021 - Sky Kingdom",
        indianTitle: "Nobita In Hara Hara Planet",
        searchTerms: ["hara hara planet", "sky kingdom", "2021", "cloud kingdom", "nobita cloud"],
        poster: "https://i.postimg.cc/RV6bNkLK/Doraemon-The-Movie-Nobitain-Hara-Hara-Planet-bycjh.jpg",
        description: `Doraemon: Nobita in Hara Hara Planet (Sky Kingdom Adventure)
Release: 2021 | Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Takahiro Imamura | Language: Hindi Dubbed | Rating: U

Nobita and his friends are transported to the breathtaking Hara Hara Planet — a world of lush, alien landscapes where every step holds a new surprise or a new danger. The planet's unique ecosystem means that even ordinary actions can have extraordinary consequences. As the gang navigates this unpredictable world, they discover that a terrible threat is destabilizing the entire planet's balance. Filled with inventive creature designs, hair-raising close calls, and the trademark warmth of the Doraemon franchise, this is an adventure that keeps you on edge from start to finish.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/haraharaplanetat1080pajh', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita's Adventure in Koya Koya Planet",
        indianTitle: "Doraemon: Koya Koya Planet Ki Sair",
        searchTerms: ["koya koya", "adventure of koya koya", "2009", "fluffy planet", "ball aliens"],
        poster: "https://i.postimg.cc/DwCg656n/Adventures-of-Koya-Koya-Planet-Movie-by-cjh.png",
        description: `Doraemon: Nobita's Adventure in Koya Koya Planet (Koya Koya Planet Ki Sair)
Release: 2009 | Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Shinichi Watanabe | Language: Hindi Dubbed | Rating: U

Doraemon and Nobita discover a small, fluffy planet called Koya Koya drifting through space — a world covered in soft, cloud-like material inhabited by round, gentle creatures called Koyaboys. The gang travels there and befriends these lovable beings. But a powerful villain seeks to destroy Koya Koya and harvest its resources. Nobita and Doraemon must find the courage to defend their new friends and their extraordinary home. A feel-good adventure brimming with imagination, vibrant alien landscapes, and the kind of heartfelt emotional warmth that has made Doraemon a global treasure for over fifty years.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Koyakoyaonbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Birth of Japan",
        indianTitle: "Doraemon: Nobita Aur Japan Ka Janm",
        searchTerms: ["birth of japan", "japan ka janm", "1989", "prehistoric japan", "70000 years ago"],
        poster: "https://i.postimg.cc/MKqNrP7Q/Doraemon-The-Movie-Nobita-and-the-birth-of-Japan.jpg",
        description: `Doraemon: Nobita and the Birth of Japan (Nobita Aur Japan Ka Janm)
Release: 1989 | Duration: 1h 36m
Genre: Adventure • Historical • Family
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Fed up with civilization and everyone around him, Nobita declares he wants to run away to a world where there are no rules. Doraemon uses a gadget to travel back 70,000 years to prehistoric Japan — a time before any human civilization existed on the islands. The gang sets up camp in this wild, ancient land and begins building a life from scratch. But they soon encounter ancient proto-humans and a mysterious evil force that threatens to alter history itself. One of the most unique and ambitious Doraemon films, blending prehistoric adventure with a surprisingly deep meditation on what civilization — and humanity — really means.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Birthdayjapanonbotat1080pbycjh', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita's Dinosaur",
        indianTitle: "Doraemon: Nobita Ka Dinosaur",
        searchTerms: ["nobita dinosaur 2006", "nobita ka dinosaur", "piisuke", "2006", "futabasaurus", "classic remake"],
        poster: "https://iili.io/KiQ8eOQ.jpg",
        description: `Doraemon: Nobita's Dinosaur (Nobita Ka Dinosaur — 2006 Remake)
Release: March 5, 2006 | Duration: 1h 44m
Genre: Adventure • Family • Sci-Fi
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Nobita boasts to his friends that he can find a real, living dinosaur. Using Doraemon's time-reversing gadget, he hatches a baby Futabasaurus from a fossilized egg and names her Piisuke. Nobita and Piisuke form one of the most beloved bonds in Doraemon history. But as Piisuke grows enormous, they can no longer hide her. Nobita must travel back to the Cretaceous period to return her home — while battling dinosaur smugglers who want to steal Piisuke for profit. The film that rebooted the Doraemon film franchise is an emotional masterpiece — the goodbye scene between Nobita and Piisuke remains one of the most tearful moments in all of anime.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/dinasouronbotat1080pbyajh', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita's Parallel Journey to the West",
        indianTitle: "Doraemon: Nobita Ki Parallel Visit Paschim Ko",
        searchTerms: ["parallel visit west", "paschim yatra", "2007", "wild west cowboy", "parallel world west"],
        poster: "https://i.postimg.cc/prbYFGHC/Doraemon-Nobita-Bana-Superhero-Hindi-by-cjh.jpg",
        description: `Doraemon: Nobita's Parallel Journey to the West (Nobita Ki Parallel Visit Paschim Ko)
Release: 2007 | Duration: 1h 37m
Genre: Adventure • Fantasy • Comedy
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Using a gadget that opens a gateway to parallel story worlds, Nobita and his friends step into a Wild West version of the classic Chinese tale Journey to the West. They become cowboy heroes in a sun-baked frontier land of outlaws, sheriffs, and legendary gunfighters. The adventure is rollicking and hilarious — until criminals from the real world follow them into the story, turning the fictional adventure dangerously real. A wildly inventive crossover that combines classic Chinese mythology with the excitement of the American frontier, filtered through the unique lens of Doraemon's boundless imagination.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Paralleltowestonbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Legend of the Sun King",
        indianTitle: "Doraemon: Nobita Aur Suraj Ka Raja",
        searchTerms: ["legend sun king", "suraj ka raja", "2000", "ancient mayan", "sun king lookalike"],
        poster: "https://i.postimg.cc/mrQ7v7Qd/Doraemon-nobita-and-the-legend-of-sun-king-by-cjh.jpg",
        description: `Doraemon: Nobita and the Legend of the Sun King (Nobita Aur Suraj Ka Raja)
Release: 2000 | Duration: 1h 35m
Genre: Adventure • Fantasy • Historical
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Deep in an ancient jungle civilization, the young Sun King bears an uncanny resemblance to Nobita. When enemies kidnap the real Sun King, Nobita must disguise himself as the ruler and protect the kingdom from falling into chaos — while Doraemon and the gang race through treacherous jungle temples to rescue the real king. A swashbuckling adventure steeped in ancient Mayan and Central American mythology, filled with crumbling temples, hidden traps, and fierce warriors. A standout entry in the franchise that proves the Doraemon universe can tackle epic historical adventure with as much flair as science fiction.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Legendsunatboton1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Stand by Me Doraemon",
        indianTitle: "Stand by Me Doraemon – Part 1",
        searchTerms: ["stand by me", "stand by me 1", "2014", "3d doraemon", "doraemon CGI", "nobita marriage", "sewashi"],
        poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png",
        description: `Stand by Me Doraemon (Part 1 — 3D Animated Film)
Release: August 8, 2014 | Duration: 1h 35m
Genre: Adventure • Drama • Animation
Director: Takashi Yamazaki & Ryuichi Yagi | Language: Hindi Dubbed | Rating: U

A future version of Nobita's great-great-grandson Sewashi travels back in time, horrified by how miserable Nobita's life turns out. He brings along robotic cat Doraemon with a single mission: make Nobita happy by the time his school life ends, or Doraemon can never return home to the future. The film reimagines the most pivotal, emotional moments of the Doraemon manga in stunning 3D CGI — Nobita's first meeting with Doraemon, his pursuit of Shizuka's love, his battles with Gian and Suneo, and his desperate attempts to change his fate. A landmark film in the history of Japanese animation — among the highest-grossing anime films of all time — and an absolute tearjerker from start to finish.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Standmeatboton1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Stand by Me Doraemon 2",
        indianTitle: "Stand by Me Doraemon – Part 2",
        searchTerms: ["stand by me 2", "stand by me part 2", "2020", "nobita wedding", "shizuka wedding", "doraemon return"],
        poster: "https://i.postimg.cc/y8wkR4PJ/Doraemon-The-Movie-Stand-by-Me-2-by-cjh.png",
        description: `Stand by Me Doraemon 2 (Part 2 — 3D Animated Film)
Release: November 20, 2020 | Duration: 1h 35m
Genre: Adventure • Drama • Animation
Director: Takashi Yamazaki | Language: Hindi Dubbed | Rating: U

The long-awaited sequel to the landmark 2014 film. Adult Nobita is finally about to marry his beloved Shizuka — but on the eve of the wedding, his cold feet lead to a crisis that only Doraemon can help resolve. A future version of Doraemon travels back to help Nobita gather the courage to step forward into his destiny. The film weaves together heartfelt present-day drama with time-travel adventures, including a deeply moving subplot featuring Nobita's late grandmother. The final reunion between Nobita and Doraemon is one of the most emotionally devastating and joyful scenes in all of anime. A perfect conclusion to the most beloved Doraemon story ever told.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Standme2atboton1080p', '720p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin720p', '360p': 'https://gplinks.co/DoraemonStandbyMe2byCJHin360p' }
    },
    {
        title: "Doraemon: Nobita's Great Adventure in the South Seas",
        indianTitle: "Doraemon: Nobita Ki Dakshin Sagar Mein Mahaan Sair",
        searchTerms: ["south seas adventure", "dakshin sagar", "1998", "pirate ship", "treasure adventure south sea"],
        poster: "https://i.postimg.cc/8zC06x5V/Nobita-Great-Adventure-to-the-South-Seas-by-cjh.jpg",
        description: `Doraemon: Nobita's Great Adventure in the South Seas (Nobita Ki Dakshin Sagar Mahaan Sair)
Release: 1998 | Duration: 1h 36m
Genre: Adventure • Fantasy • Family
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Nobita fantasizes about a life of high-seas piracy and treasure hunting. Doraemon uses a gadget to create an actual ocean in the empty lot, and the gang builds a pirate ship and sets sail. What starts as a fun game quickly becomes real when they are swept into a full-blown ocean adventure complete with sea monsters, rival pirates, and a legendary sunken treasure. A rollicking, swashbuckling adventure on the high seas that perfectly captures the thrill of classic pirate stories — swords, cannons, buried treasure, and the unbreakable bonds forged between sailors who face the sea together.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Southseaonbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita in Toy Kingdom",
        indianTitle: "Doraemon: Khilone Ki Bhul Bhulaiya",
        searchTerms: ["khilone bhul bhulaiya", "toy kingdom", "2004", "living toys", "toy world"],
        poster: "https://i.postimg.cc/w38qYR5V/Doraemon-Khel-Khilona-Bhool-Bhulaiya-by-cjh.jpg",
        description: `Doraemon: Nobita in Toy Kingdom (Khilone Ki Bhul Bhulaiya)
Release: 2004 | Duration: 1h 35m
Genre: Adventure • Fantasy • Family
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Using a magical gadget, Nobita and his friends discover a secret kingdom where all the toys have come alive — a dazzling world of talking teddy bears, mechanical soldiers, flying kites, and spinning tops that think, feel, and dream. The gang is welcomed warmly by the toy folk. But an evil force has infiltrated the kingdom and is turning the innocent toys into an army of destruction. Nobita and friends must use all their creativity and courage to protect the toy world. A wildly imaginative film that taps into every child's dream that their toys are truly alive — and the responsibility that comes with that magic.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Bhulbhulaiyaonbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Birdopia's Sultan",
        indianTitle: "Doraemon: Birdopia Ka Sultan",
        searchTerms: ["birdopia sultan", "birdopia", "2019", "future birds", "bird world", "evolved birds"],
        poster: "https://i.postimg.cc/hjVgbtRQ/Doraemon-The-Movie-Nobita-Aur-Birdopia-Ka-Sultan.jpg",
        description: `Doraemon: Nobita and the Birdopia's Sultan (Birdopia Ka Sultan)
Release: 2019 | Duration: 1h 51m
Genre: Adventure • Sci-Fi • Action
Director: Kazuaki Imai | Language: Hindi Dubbed | Rating: U

In the far future, Earth has become "Birdopia" — a civilization where birds have evolved into the planet's dominant intelligent species, while humans have faded from history. Nobita and his friends travel to this astonishing future world and are dazzled by the birds' incredible culture, architecture, and power. But a ruthless villain plans to weaponize the birds' evolved abilities to wage war. The gang must navigate a world where they are the outsiders, forming alliances with bird-people to stop the coming catastrophe. A breathtakingly designed sci-fi adventure that challenges assumptions about evolution, intelligence, and the future of our planet.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Birdopiasultanonbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita's Treasure Island",
        indianTitle: "Doraemon: Nobita Ka Khajana Dwip",
        searchTerms: ["treasure island", "khajana dwip", "2018", "pirate treasure island", "captain hook"],
        poster: "https://i.postimg.cc/t46rgZ36/Doraemon-the-Nobita-s-Treasure-Island-by-cjh.jpg",
        description: `Doraemon: Nobita's Treasure Island (Nobita Ka Khajana Dwip)
Release: 2018 | Duration: 1h 44m
Genre: Adventure • Fantasy • Action
Director: Kazuaki Imai | Language: Hindi Dubbed | Rating: U

Inspired by Robert Louis Stevenson's classic novel, Nobita and Doraemon set sail on a thrilling treasure hunt to a legendary uncharted island. But this island is no mere map-marked location — it is a living, ancient mystery guarded by fierce pirates and ancient mechanical traps. When Shizuka is kidnapped by the island's enigmatic ruler, Nobita must find the courage of a true captain and fight to rescue her. A visually gorgeous swashbuckling epic that honors the spirit of classic adventure literature while adding the unique wonder and emotional depth that only Doraemon can deliver. One of the most cinematic entries in the franchise.`,
        embed: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="https://geo.dailymotion.com/player.html?video=x9szpd2&autoplay=0" style="width:100%; height:100%; position:absolute; left:0px; top:0px; overflow:hidden; border:none;" allow="fullscreen; web-share" allowfullscreen title="Dailymotion Video Player"></iframe></div>`,
        downloadLinks: { '1080p': 'https://gplinks.co/treasureislandonbotat1080p', '720p': 'https://gplinks.co/treasureislandbycjhin720p', '360p': 'https://gplinks.co/treasureislandbycjhin360p' }
    },
    {
        title: "Doraemon: Nobita – The Explorer Bow! Bow!",
        indianTitle: "Doraemon: Nobita Explorer Bow Bow",
        searchTerms: ["explorer bow bow", "bow bow", "2012", "jungle planet", "wild planet"],
        poster: "https://i.postimg.cc/HxY336f0/The-Movie-Nobita-The-Explorer-Bow-Bow-by-cjh.png",
        description: `Doraemon: Nobita — The Explorer Bow! Bow! (Nobita Explorer Bow Bow)
Release: 2012 | Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Shinichi Watanabe | Language: Hindi Dubbed | Rating: U

Fired up by a nature documentary, Nobita demands that Doraemon take him to a completely unexplored planet teeming with wild creatures. Doraemon obliges, and the gang arrives on a lush, jungle-covered world never touched by civilization. The planet is a naturalist's paradise — but also a ferocious predator's hunting ground. When the gang gets separated, survival becomes the only priority as they are hunted by enormous, terrifying creatures in the dense alien jungle. A pulse-pounding survival adventure that draws inspiration from classic wilderness films — Jurassic Park meets Doraemon, with the heart and humor only Nobita can bring.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Bowbowonbotat1080p', '720p': 'https://gplinks.co/Nobitabowbowin720pbycjh', '360p': 'https://gplinks.co/Nobitabowbowin360pbycjh' }
    },
    {
        title: "Doraemon: Nobita and the Windmasters",
        indianTitle: "Doraemon: Nobita Aur Toofani Adventure",
        searchTerms: ["windmasters", "toofani adventure", "2003", "wind power", "fuuko wind sprite"],
        poster: "https://i.postimg.cc/bYFLHHLb/Doraemon-Toofani-Adventure-by-cjh.jpg",
        description: `Doraemon: Nobita and the Windmasters (Nobita Aur Toofani Adventure)
Release: 2003 | Duration: 1h 35m
Genre: Adventure • Fantasy • Action
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Nobita and his friends encounter Fuuko — a small, mysterious wind sprite separated from her family. The gang sets out to help Fuuko find her people, journeying through spectacular lands ruled by the elemental power of wind. Magnificent windstorms, aerial battles, and soaring flight sequences make this one of the most visually dynamic Doraemon films. But a dark warlord seeks to harness the wind's power to rule the world. Nobita and Doraemon must summon the power of the wind itself to stop him. A sweeping, elemental adventure with a gentle heart about the bond between humans and the forces of nature.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Windmasteronbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Island of Miracles",
        indianTitle: "Doraemon: Nobita Aur Jadooi Tapu",
        searchTerms: ["island of miracles", "jadooi tapu", "2012", "miracle island", "extinct animals island"],
        poster: "https://i.postimg.cc/yd8X0kZv/Doraemon-The-Movie-Nobita-Aur-Jadooi-Tapu-by-cjh.jpg",
        description: `Doraemon: Nobita and the Island of Miracles (Nobita Aur Jadooi Tapu)
Release: 2012 | Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Shinichi Watanabe | Language: Hindi Dubbed | Rating: U

Nobita discovers a legend about a mysterious island where the impossible becomes possible — where extinct animals roam freely, where ancient gadgets of incredible power are scattered everywhere, and where the laws of nature seem to have been rewritten. The gang travels to find this island and is awe-struck by its wonders. But beneath the miracles lies a dark secret about who created this island and why. A thought-provoking adventure that celebrates biodiversity, the beauty of nature, and asks: what is the true cost of miracles? A standout sci-fi film in the franchise with a genuinely surprising twist.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Islandmiracleonbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Galaxy Super-Express",
        indianTitle: "Doraemon: Galaxy Super Express Hindi",
        searchTerms: ["galaxy super express", "galaxy express", "1996", "space train", "mechanizer robots"],
        poster: "https://i.postimg.cc/XY6fQ25Z/Doraemon-The-Movie-Galaxy-Super-Express-by-cjh.png",
        description: `Doraemon: Nobita and the Galaxy Super-Express (Galaxy Super Express Hindi)
Release: 1996 | Duration: 1h 36m
Genre: Adventure • Sci-Fi • Classic
Director: Tsutomu Shibayama | Language: Hindi Dubbed | Rating: U

Doraemon wins a pair of tickets to the Galactic Express — a legendary space train that travels across the entire universe, stopping at hundreds of extraordinary worlds and civilizations. Nobita and Doraemon board this magnificent train for the trip of a lifetime. But a sinister group called the Mechanizers has infiltrated the train with a terrifying plan: to drain the life force from every living passenger and turn them into robots. A thrilling space train adventure inspired by Kenji Miyazawa's "Night on the Galactic Railroad," featuring some of the most imaginative alien world-building in the entire Doraemon film catalog.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/galaxyexpressonbotat1080p', '720p': '#', '360p': '#' }
    },
    {
        title: "Doraemon: Nobita and the Kingdom of Robots",
        indianTitle: "Doraemon: Nobita Aur Robot Singham",
        searchTerms: ["kingdom of robots", "robot singham", "2011", "mechatopia", "robot kingdom"],
        poster: "https://i.postimg.cc/j5fNHPj6/The-Movie-Nobita-and-the-Kingdom-of-Robot-by-cjh.jpg",
        description: `Doraemon: Nobita and the Kingdom of Robots (Nobita Aur Robot Singham)
Release: 2011 | Duration: 1h 47m
Genre: Adventure • Sci-Fi • Action
Director: Shinichi Watanabe | Language: Hindi Dubbed | Rating: U

On a distant planet called Mechatopia, robots have completely replaced all biological life — and the robot rulers consider organic beings inferior and worthy only of elimination. When Nobita and Doraemon arrive, they meet Sui, a young robot who is desperately searching for answers about his own origins and the humans who once lived on Mechatopia. The robot rulers plan to invade Earth and replace humanity as they did on their own planet. Nobita and Doraemon must expose the truth about Mechatopia's history to stop the invasion. A deep, philosophically rich sci-fi adventure about the relationship between creator and creation, and what makes us truly alive.`,
        embed: "",
        downloadLinks: { '1080p': 'https://gplinks.co/Robotsinghamonbotat1080p', '720p': '#', '360p': '#' }
    },
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

// ==================================================
// MOVIE METADATA (Year, Duration, Genre, Director)
// ==================================================
const movieMeta = {
    "Doraemon: Nobita's Earth Symphony": { year: 2024, duration: "1h 55m", genre: "Adventure, Fantasy, Musical, Sci-Fi", director: "Kazuaki Imai", language: "Hindi", rating: "U" },
    "Doraemon The Movie Nobita Ki Nayi Duniya": { year: 2024, duration: "1h 37m", genre: "Adventure, Family, Sci-Fi", director: "Kazuaki Imai", language: "Hindi", rating: "U" },
    "Doraemon: Nobita's Mermaid Legend": { year: 2010, duration: "1h 39m", genre: "Adventure, Fantasy, Action, Sci-Fi", director: "Kōzō Kusuba", language: "Hindi", rating: "U" },
    "Doraemon: Nobita and the Animal Planet": { year: 1990, duration: "1h 40m", genre: "Adventure, Fantasy, Family, Eco", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Doraemon: Nobita's New Dinosaur": { year: 2020, duration: "1h 50m", genre: "Adventure, Family, Sci-Fi", director: "Kazuaki Imai", language: "Hindi", rating: "U" },
    "Doraemon Nobita and the Spiral City": { year: 2023, duration: "1h 40m", genre: "Adventure, Sci-Fi, Mystery", director: "Takahiro Imamura", language: "Hindi", rating: "U" },
    "Doraemon The Movie Nobita In Jannat No 1": { year: 2021, duration: "1h 36m", genre: "Adventure, Fantasy, Family", director: "Takahiro Imamura", language: "Hindi", rating: "U" },
    "Doraemon jadoo Mantar aur jhanoom": { year: 2023, duration: "1h 52m", genre: "Adventure, Fantasy, Action", director: "Takahiro Imamura", language: "Hindi", rating: "U" },
    "Dinosaur Yodha": { year: 2014, duration: "1h 35m", genre: "Adventure, Action, Sci-Fi", director: "Kozo Kusuba", language: "Hindi", rating: "U" },
    "Doraemon The Movie Nobita and the Underwater Adventure": { year: 2010, duration: "1h 36m", genre: "Adventure, Fantasy, Family", director: "Shinichi Watanabe", language: "Hindi", rating: "U" },
    "ICHI MERA DOST": { year: 2015, duration: "1h 37m", genre: "Adventure, Sci-Fi, Family", director: "Kozo Kusuba", language: "Hindi", rating: "U" },
    "Doraemon Nobita's Dorabian Nights": { year: 1991, duration: "1h 25m", genre: "Adventure, Fantasy, Comedy", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Chronicle of the Moon": { year: 2019, duration: "1h 51m", genre: "Adventure, Sci-Fi, Action", director: "Kazuaki Imai", language: "Hindi", rating: "U" },
    "Sky Utopia": { year: 2022, duration: "1h 40m", genre: "Adventure, Sci-Fi, Mystery", director: "Takahiro Imamura", language: "Hindi", rating: "U" },
    "Antarctic Adventure": { year: 1983, duration: "1h 36m", genre: "Adventure, Family, Classic", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Little Space War": { year: 1985, duration: "1h 35m", genre: "Adventure, Sci-Fi, Classic", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Gadget Museum Ka Rahasya": { year: 2013, duration: "1h 35m", genre: "Adventure, Mystery, Family", director: "Kozo Kusuba", language: "Hindi", rating: "U" },
    "Doraemon: Nobita's New Dinosaur (fan Dubbed)": { year: 2020, duration: "1h 50m", genre: "Adventure, Family, Sci-Fi", director: "Kazuaki Imai", language: "Hindi", rating: "U" },
    "Space Hero": { year: 2015, duration: "1h 37m", genre: "Adventure, Sci-Fi, Action", director: "Kozo Kusuba", language: "Hindi", rating: "U" },
    "Steel Troops – New Age": { year: 2011, duration: "1h 47m", genre: "Adventure, Sci-Fi, Action", director: "Shinichi Watanabe", language: "Hindi", rating: "U" },
    "Three Visionary Swordsmen": { year: 1994, duration: "1h 36m", genre: "Adventure, Fantasy, Action", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Nobita In Hara Hara Planet": { year: 2021, duration: "1h 36m", genre: "Adventure, Sci-Fi, Family", director: "Takahiro Imamura", language: "Hindi", rating: "U" },
    "Adventure of Koya Koya": { year: 2009, duration: "1h 36m", genre: "Adventure, Sci-Fi, Family", director: "Shinichi Watanabe", language: "Hindi", rating: "U" },
    "Doraemon nobita and the Birthday of japan": { year: 1989, duration: "1h 36m", genre: "Adventure, Historical, Family", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Nobita's Dinosaur": { year: 2006, duration: "1h 44m", genre: "Adventure, Family, Sci-Fi", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Parallel Visit to West": { year: 2007, duration: "1h 37m", genre: "Adventure, Fantasy, Comedy", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Legend of Sun King": { year: 2000, duration: "1h 35m", genre: "Adventure, Fantasy, Historical", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Stand by Me – Part 1": { year: 2014, duration: "1h 35m", genre: "Adventure, Drama, Animation", director: "Takashi Yamazaki", language: "Hindi", rating: "U" },
    "Stand by Me – Part 2": { year: 2020, duration: "1h 35m", genre: "Adventure, Drama, Animation", director: "Takashi Yamazaki", language: "Hindi", rating: "U" },
    "Doraemon Nobita's Great Adventure in the South Seas": { year: 1998, duration: "1h 36m", genre: "Adventure, Fantasy, Family", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Khilone Ki Bhul Bhulaiya": { year: 2004, duration: "1h 35m", genre: "Adventure, Fantasy, Family", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Birdopia Ka Sultan": { year: 2019, duration: "1h 51m", genre: "Adventure, Sci-Fi, Action", director: "Kazuaki Imai", language: "Hindi", rating: "U" },
    "Doraemon Nobita's Treasure Island": { year: 2018, duration: "1h 44m", genre: "Adventure, Fantasy, Action", director: "Kazuaki Imai", language: "Hindi", rating: "U" },
    "Doraemon The Movie Nobita The Explorer Bow Bow": { year: 2012, duration: "1h 36m", genre: "Adventure, Sci-Fi, Family", director: "Shinichi Watanabe", language: "Hindi", rating: "U" },
    "Doraemon Nobita and the Windmasters": { year: 2003, duration: "1h 35m", genre: "Adventure, Fantasy, Action", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Doraemon Nobita and the Island of Miracle": { year: 2012, duration: "1h 36m", genre: "Adventure, Sci-Fi, Family", director: "Shinichi Watanabe", language: "Hindi", rating: "U" },
    "Doraemon Galaxy Super Express Hindi": { year: 1996, duration: "1h 36m", genre: "Adventure, Sci-Fi, Classic", director: "Tsutomu Shibayama", language: "Hindi", rating: "U" },
    "Doraemon Nobita And The Kingdom Of Robot Singham": { year: 2011, duration: "1h 47m", genre: "Adventure, Sci-Fi, Action", director: "Shinichi Watanabe", language: "Hindi", rating: "U" },
};

// Better descriptions for movies with generic descriptions
const movieDescriptions = {
    "Doraemon The Movie Nobita Ki Nayi Duniya": `Title: Doraemon The Movie: Nobita Ki Nayi Duniya
Release Date: 2024
Duration: 1h 37m
Genre: Adventure • Family • Sci-Fi
Language: Hindi (Dubbed)

Description:
Nobita discovers a mysterious new world filled with wonders beyond imagination. With Doraemon's magical gadgets and the support of his friends, he embarks on an extraordinary journey to protect this new world from a dangerous threat. A heartwarming adventure about friendship, courage, and the magic of believing in the impossible.`,

    "Doraemon: Nobita's New Dinosaur": `Title: Doraemon: Nobita's New Dinosaur
Release Date: March 6, 2020
Duration: 1h 50m
Genre: Adventure • Family • Sci-Fi
Director: Kazuaki Imai | Studio: Shin-Ei Animation

Description:
On his birthday, Nobita discovers two twin dinosaur eggs — a T-Rex and a different species never seen before. Using Doraemon's time machine, the gang travels back to the Cretaceous period to return the dinosaurs home. But an evil organization called BLACK wants to capture the dinosaurs, putting everyone in danger. A moving story about friendship across time and the bond between humans and animals.`,

    "Little Space War": `Title: Doraemon: Little Space War (Nobita and the Little Space War)
Release Date: 1985
Duration: 1h 35m
Genre: Adventure • Sci-Fi • Classic
Director: Tsutomu Shibayama | Studio: Shin-Ei Animation

Description:
Nobita and his friends encounter Papi, a tiny alien president who has fled to Earth after a military coup on his home planet Pirika. Using Doraemon's "Small Light" gadget, the gang shrinks themselves to tiny size and travels to Pirika to help Papi reclaim his world from the ruthless General Gilmore. A beloved classic that combines action, humor, and heartfelt emotion.`,

    "Nobita In Hara Hara Planet": `Title: Doraemon: Nobita in Hara Hara Planet
Release Date: 2021
Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Takahiro Imamura | Language: Hindi (Dubbed)

Description:
Nobita and his friends travel to a distant planet where danger lurks around every corner. With Doraemon's gadgets as their only aid, they must navigate a world full of unpredictable creatures and environments. A thrilling space adventure packed with action, humor, and the unbreakable bond of friendship.`,

    "Adventure of Koya Koya": `Title: Doraemon: Adventure of Koya Koya Planet
Release Date: 2009
Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Shinichi Watanabe | Language: Hindi (Dubbed)

Description:
Doraemon and Nobita discover a fluffy cloud-like planet in outer space called Koya Koya. The gang travels there and befriends its soft, ball-shaped inhabitants. But when a powerful villain threatens to destroy the planet, Nobita and friends must summon all their courage to protect their new friends. A feel-good adventure full of heart and excitement.`,

    "Doraemon nobita and the Birthday of japan": `Title: Doraemon: Nobita and the Birth of Japan
Release Date: 1989
Duration: 1h 36m
Genre: Adventure • Historical • Family
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
When Nobita gets frustrated with civilization and wants to run away, Doraemon uses a gadget to travel back 70,000 years to prehistoric Japan — a time before any human civilization. Together, the gang encounters cave dwellers and ancient creatures. But when a mysterious villain threatens to change history, they must fight to protect the past and ensure the future of Japan. A unique adventure blending history, humor, and heart.`,

    "Nobita's Dinosaur": `Title: Doraemon: Nobita's Dinosaur
Release Date: March 5, 2006
Duration: 1h 44m
Genre: Adventure • Family • Sci-Fi
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Nobita boasts to his friends that he can find a living dinosaur, and with the help of Doraemon's time-reversing gadget, he successfully hatches a baby Futabasaurus from a fossilized egg. He names the dinosaur Piisuke and raises it in secret. When Piisuke grows too large to hide, they travel back in time to the Cretaceous period to return him home — but a group of time-traveling dinosaur smugglers threatens to steal Piisuke. A classic tale of love, friendship, and sacrifice.`,

    "Parallel Visit to West": `Title: Doraemon: Nobita's Parallel Visit to the West
Release Date: 2007
Duration: 1h 37m
Genre: Adventure • Fantasy • Comedy
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Using a gadget that creates a parallel world, Nobita and friends step into a version of the Wild West — an alternate universe where cowboys, outlaws, and frontier adventures await. When criminals from their own world follow them in, the gang must use Doraemon's gadgets and teamwork to restore order. A fun, fast-paced adventure set against a Western backdrop.`,

    "Legend of Sun King": `Title: Doraemon: Nobita and the Legend of the Sun King
Release Date: 2000
Duration: 1h 35m
Genre: Adventure • Fantasy • Historical
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Doraemon and Nobita travel to an ancient civilization deep in the jungle and discover a boy who looks exactly like Nobita — the young Sun King. When the king is kidnapped by enemies, Nobita must take his place and protect the kingdom while Doraemon and friends race to rescue the real king. A swashbuckling adventure full of mystery, action, and ancient magic.`,

    "Stand by Me – Part 1": `Title: Stand by Me Doraemon – Part 1
Release Date: August 8, 2014
Duration: 1h 35m
Genre: Adventure • Drama • 3D Animation
Director: Takashi Yamazaki & Ryuichi Yagi | Language: Hindi (Dubbed)

Description:
A future version of Nobita shows his great-great-grandson Sewashi the miserable life Nobita is destined to live. Sewashi sends robotic cat Doraemon back in time with a mission: make Nobita happy, or Doraemon can never return to the future. The film follows the most emotional moments of their friendship, culminating in a heartbreaking farewell. One of the most beloved animated films ever made.`,

    "Stand by Me – Part 2": `Title: Stand by Me Doraemon – Part 2
Release Date: November 20, 2020
Duration: 1h 35m
Genre: Adventure • Drama • 3D Animation
Director: Takashi Yamazaki | Language: Hindi (Dubbed)

Description:
An emotional sequel to the beloved film. Nobita reunites with Doraemon for one last adventure as he prepares to marry Shizuka. When Nobita travels to the future and discovers that his future self is getting cold feet, he must journey through time — with the help of an older Doraemon — to ensure the wedding goes ahead. A tear-jerking and joyful celebration of love, friendship, and growing up.`,

    "Doraemon Nobita's Great Adventure in the South Seas": `Title: Doraemon: Nobita's Great Adventure in the South Seas
Release Date: 1998
Duration: 1h 36m
Genre: Adventure • Fantasy • Family
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Inspired by pirate stories, Nobita wishes to sail the seven seas. Doraemon creates an ocean using a gadget, and the gang sets off on a pirate adventure. But real pirates and a deadly sea monster threaten their voyage. A rousing, swashbuckling adventure on the high seas full of treasure, danger, and laughs.`,

    "Khilone Ki Bhul Bhulaiya": `Title: Doraemon: Khilone Ki Bhul Bhulaiya (Nobita in Toy Kingdom)
Release Date: 2004
Duration: 1h 35m
Genre: Adventure • Fantasy • Family
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Nobita and friends discover a magical kingdom where all the toys have come to life. Everything seems perfect in this playful paradise — until an evil force begins turning the living toys against humans. Doraemon and the gang must use their wits and teamwork to save the toy kingdom. A delightful, imagination-packed adventure perfect for the whole family.`,

    "Space Hero": `Title: Doraemon: Nobita aur Antariksh Daku (Space Hero)
Release Date: 2015
Duration: 1h 37m
Genre: Adventure • Sci-Fi • Action
Director: Kozo Kusuba | Language: Hindi (Dubbed)

Description:
Space bandits attack Earth and kidnap civilians to mine precious stones on a distant asteroid. When Shizuka is taken, Nobita vows to rescue her. Doraemon and friends blast off into space, facing dangerous alien environments and powerful space pirates. A thrilling, action-packed space adventure with stunning visuals and a heroic message about protecting the people you love.`,

    "Steel Troops – New Age": `Title: Doraemon: Nobita and the Steel Troops – New Age
Release Date: 2011
Duration: 1h 47m
Genre: Adventure • Sci-Fi • Action
Director: Shinichi Watanabe | Language: Hindi (Dubbed)

Description:
Nobita discovers a secret portal to an icy, desolate world. There he finds Zanda Claus, a giant robot who he befriends and names Zanda. But powerful robot soldiers are being sent from a distant planet to conquer Earth, and Zanda may hold the key to stopping them. A gripping sci-fi adventure with themes of friendship, identity, and protecting one's home.`,

    "Three Visionary Swordsmen": `Title: Doraemon: Nobita's Three Magical Swordsmen
Release Date: 1994
Duration: 1h 36m
Genre: Adventure • Fantasy • Action
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Using Doraemon's "Dream World Entrance Set" gadget, the gang enters a dream-world of swords and sorcery. Nobita, Gian, and Suneo become mighty warriors destined to defeat the evil Demon King who terrorizes the land. But the dream world holds real dangers. An epic fantasy adventure with thrilling battles, magic, and legendary quests.`,

    "Doraemon The Movie Nobita The Explorer Bow Bow": `Title: Doraemon: Nobita the Explorer — Bow! Bow!
Release Date: 2012
Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Shinichi Watanabe | Language: Hindi (Dubbed)

Description:
After watching a nature documentary, Nobita begs Doraemon to let him explore an undiscovered planet. Using a gadget, they travel to a wild, jungle-covered world teeming with dangerous and exotic creatures. But when the gang gets separated and hunted by the planet's predators, survival becomes the only priority. An exciting, pulse-pounding adventure in the wild.`,

    "Doraemon Nobita and the Windmasters": `Title: Doraemon: Nobita and the Windmasters
Release Date: 2003
Duration: 1h 35m
Genre: Adventure • Fantasy • Action
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Nobita and friends help Fuuko, a young wind sprite, find her family. Their journey takes them through magical lands ruled by the power of wind and weather. But a dark force seeks to control the wind's power to dominate the world. A beautifully animated adventure with elemental powers, heartfelt friendships, and spectacular aerial battles.`,

    "Doraemon Nobita and the Island of Miracle": `Title: Doraemon: Nobita and the Island of Miracles
Release Date: 2012
Duration: 1h 36m
Genre: Adventure • Sci-Fi • Family
Director: Shinichi Watanabe | Language: Hindi (Dubbed)

Description:
Doraemon and Nobita discover a legendary island where impossible things happen — extinct animals roam freely and incredible gadgets are everywhere. As they explore, they uncover a dark secret behind the island's miracles and must fight to protect it. A wonder-filled adventure celebrating nature, science, and the power of miracles.`,

    "Doraemon Galaxy Super Express Hindi": `Title: Doraemon: Nobita and the Galaxy Super-Express
Release Date: 1996
Duration: 1h 36m
Genre: Adventure • Sci-Fi • Classic
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
Doraemon wins tickets for the Galactic Express — the most amazing train in the universe, which travels through space visiting countless worlds. But the journey becomes dangerous when a sinister group called the Mechanizer plots to turn all living creatures into robots. A classic sci-fi adventure with imaginative worlds, robot battles, and a message about the value of life.`,

    "Doraemon Nobita And The Kingdom Of Robot Singham": `Title: Doraemon: Nobita and the Kingdom of Robots
Release Date: 2011
Duration: 1h 47m
Genre: Adventure • Sci-Fi • Action
Director: Shinichi Watanabe | Language: Hindi (Dubbed)

Description:
On a faraway planet called Mechatopia, robots have replaced all human life. When Doraemon and Nobita arrive, they discover a young robot named Zanda Claus who longs to know the truth about his origins. But the planet's robot rulers see humans as inferior and plan to invade Earth. A thrilling sci-fi epic exploring the relationship between humans and machines.`,

    "Birdopia Ka Sultan": `Title: Doraemon: Nobita aur Birdopia Ka Sultan
Release Date: 2019
Duration: 1h 51m
Genre: Adventure • Sci-Fi • Action
Director: Kazuaki Imai | Language: Hindi (Dubbed)

Description:
Nobita and friends travel to the future Earth and discover it has become "Birdopia" — a paradise ruled by intelligent birds who have evolved to become the dominant species. But a dangerous villain plans to use the birds' power to wage war. The gang must navigate this incredible bird-filled world and stop the villain before it's too late. A visually stunning sci-fi adventure.`,

    "Sky Utopia": `Title: Doraemon: Nobita's Sky Utopia
Release Date: August 5, 2022
Duration: 1h 40m
Genre: Adventure • Sci-Fi • Mystery
Director: Takahiro Imamura | Language: Hindi (Dubbed)

Description:
Nobita discovers a map that leads to Utopia — a legendary perfect world floating somewhere in the sky. Using Doraemon's gadgets, the gang sets off on an airship expedition to find it. When they finally arrive, the paradise seems too good to be true. A thought-provoking adventure about the true meaning of a perfect world, freedom, and friendship.`,

    "Chronicle of the Moon": `Title: Doraemon: Nobita's Chronicle of the Moon Exploration
Release Date: March 1, 2019
Duration: 1h 51m
Genre: Adventure • Sci-Fi • Action
Director: Kazuaki Imai | Language: Hindi (Dubbed)

Description:
Nobita and friends discover a secret world on the Moon — a civilization of cat-like aliens called Kaguya who secretly live in the lunar underground. But a mysterious monster threatens to destroy their hidden world. The gang must unravel the moon's ancient secrets and protect their new friends. A beautifully crafted sci-fi adventure full of mystery, emotion, and breathtaking lunar landscapes.`,

    "Antarctic Adventure": `Title: Doraemon: Nobita's Little Star Wars (Antarctic Adventure)
Release Date: 1983
Duration: 1h 36m
Genre: Adventure • Family • Classic
Director: Tsutomu Shibayama | Language: Hindi (Dubbed)

Description:
A classic Doraemon adventure! Nobita finds a tiny penguin that has escaped from Antarctica. With Doraemon's gadgets, the gang shrinks themselves and embarks on an incredible journey to the frozen continent. But dangerous obstacles lie in their path. A charming, heartfelt adventure showcasing the magic of Doraemon at its finest.`,
};

window.dorebox_content = { movies, episodes, shortMovies, movieMeta, movieDescriptions };

// ==================================================
// MAIN WEBSITE LOGIC
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // ==================================================
    // PAGE: INDEX.HTML
    // ==================================================
    if (document.getElementById('hero')) { // Check if it's the homepage
        function startCountdown() { /* Festival countdown removed */ }
        startCountdown();

        // Old Search Bar (keeping it for safety if you revert layout, otherwise it won't run if element missing)
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
                const yearBadge = (window.dorebox_content.movieMeta && window.dorebox_content.movieMeta[item.title] && window.dorebox_content.movieMeta[item.title].year) ? `<span class="card-year-badge">${window.dorebox_content.movieMeta[item.title].year}</span>` : '';
                const indianSubtitle = item.indianTitle ? `<span class="card-indian-title">${item.indianTitle}</span>` : '';
                card.innerHTML = `<a href="watch.html?title=${encodeURIComponent(item.title)}&type=${type}"><div class="poster-container"><img src="${item.poster}" alt="${item.title} Hindi Download" loading="lazy"><div class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"></path></svg></div>${yearBadge}</div><h3>${item.title}</h3>${indianSubtitle}</a>`;
                grid.appendChild(card);
            });
        }

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const tab = link.getAttribute('data-tab');
                // Only update placeholder if searchBar exists
                if (searchBar) {
                    let newPlaceholder = (tab === 'movies') ? 'Search All Movies...' : (tab === 'episodes') ? 'Search All Episodes...' : 'Search Short Movies...';
                    if (searchBar.placeholder !== newPlaceholder) {
                        searchBar.classList.add('placeholder-fade');
                        setTimeout(() => { searchBar.placeholder = newPlaceholder; searchBar.classList.remove('placeholder-fade'); }, 300);
                    }
                    searchBar.value = '';
                }
                
                tabLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                tabContents.forEach(content => content.classList.toggle('active', content.id === `${tab}-content`));
                
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
    // PAGE: WATCH.HTML
    // ==================================================
    if (body.classList.contains('watch-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentTitle = decodeURIComponent(urlParams.get('title'));
        const currentType = urlParams.get('type') || 'movies';
        const allContent = (window.dorebox_content && window.dorebox_content[currentType]) ? window.dorebox_content[currentType] : [];
        const currentItem = allContent.find(m => m.title === currentTitle);

        if (currentItem) {
            const betterDesc = (window.dorebox_content.movieDescriptions && window.dorebox_content.movieDescriptions[currentItem.title]) 
                ? window.dorebox_content.movieDescriptions[currentItem.title] 
                : currentItem.description;
            const meta = (window.dorebox_content.movieMeta && window.dorebox_content.movieMeta[currentItem.title]) || {};
            
            updateSEO(currentItem.title, betterDesc, 'watch', currentType, currentItem.poster, meta);
            document.getElementById('movie-poster').src = currentItem.poster;
            document.getElementById('movie-poster').alt = currentItem.title + ' - Hindi Movie Poster';
            document.getElementById('movie-title').textContent = currentItem.title;
            // Show Indian title if available
            const indianTitleEl = document.getElementById('movie-indian-title');
            if (indianTitleEl && currentItem.indianTitle) {
                indianTitleEl.textContent = currentItem.indianTitle;
                indianTitleEl.style.display = 'block';
            }
            document.getElementById('movie-description').textContent = betterDesc;
            // Breadcrumb
            const bc = document.getElementById('breadcrumb-title');
            if (bc) bc.textContent = currentItem.title;

            // Display meta badges
            const metaBadgesEl = document.getElementById('movie-meta-badges');
            if (metaBadgesEl) {
                const badges = [];
                if (meta.year) badges.push(`<span class="meta-badge"><i class="fas fa-calendar-alt"></i> ${meta.year}</span>`);
                if (meta.duration) badges.push(`<span class="meta-badge"><i class="fas fa-clock"></i> ${meta.duration}</span>`);
                if (meta.language) badges.push(`<span class="meta-badge"><i class="fas fa-language"></i> ${meta.language}</span>`);
                if (meta.rating) badges.push(`<span class="meta-badge rating-badge"><i class="fas fa-certificate"></i> ${meta.rating}</span>`);
                metaBadgesEl.innerHTML = badges.join('');
            }
            const genreEl = document.getElementById('movie-genre');
            if (genreEl && meta.genre) {
                genreEl.innerHTML = meta.genre.split(',').map(g => `<span class="genre-tag">${g.trim()}</span>`).join('');
            }
            const directorEl = document.getElementById('movie-director');
            if (directorEl && meta.director) {
                directorEl.innerHTML = `<i class="fas fa-film"></i> <strong>Director:</strong> ${meta.director}`;
            }
            
            const playerContainer = document.getElementById('video-player-container');
            
            console.log("Loading movie player directly.");
            if (currentItem.embed && currentItem.embed.trim() !== "") {
                playerContainer.innerHTML = currentItem.embed;
            } else {
                playerContainer.style.display = 'none';
                document.getElementById('player-message').style.display = 'block';
            }

            const downloadButton = document.getElementById('download-link');
            if (currentItem.downloadLinks) {
                downloadButton.href = `download.html?title=${encodeURIComponent(currentItem.title)}&type=${currentType}`;
                downloadButton.style.display = 'inline-flex';
            } else {
                downloadButton.style.display = 'none';
            }
            
            // ---- WATCHLIST BUTTON ----
            const wlBtn = document.getElementById('watchlist-button');
            const wlText = document.getElementById('wl-btn-text');
            if (wlBtn) {
                let wl = JSON.parse(localStorage.getItem('dorebox_watchlist') || '[]');
                const isInWl = wl.some(x => x.title === currentItem.title);
                if (isInWl) { wlBtn.querySelector('i').className = 'fas fa-bookmark'; wlText.textContent = 'Saved'; wlBtn.style.color = 'var(--primary-color)'; }
                wlBtn.addEventListener('click', () => {
                    let wl2 = JSON.parse(localStorage.getItem('dorebox_watchlist') || '[]');
                    const idx = wl2.findIndex(x => x.title === currentItem.title);
                    if (idx > -1) {
                        wl2.splice(idx, 1);
                        wlText.textContent = 'Save';
                        wlBtn.querySelector('i').className = 'far fa-bookmark';
                        wlBtn.style.color = '';
                    } else {
                        const meta = (window.dorebox_content.movieMeta && window.dorebox_content.movieMeta[currentItem.title]) || {};
                        wl2.unshift({ title: currentItem.title, poster: currentItem.poster, type: currentType, year: meta.year, addedAt: new Date().toISOString() });
                        wlText.textContent = 'Saved';
                        wlBtn.querySelector('i').className = 'fas fa-bookmark';
                        wlBtn.style.color = 'var(--primary-color)';
                    }
                    localStorage.setItem('dorebox_watchlist', JSON.stringify(wl2));
                });
            }

            // ---- WATCH HISTORY ----
            if (localStorage.getItem('dorebox_save_history') !== 'false') {
                let hist = JSON.parse(localStorage.getItem('dorebox_watch_history') || '[]');
                hist = hist.filter(x => x.title !== currentItem.title); // remove duplicate
                const meta = (window.dorebox_content.movieMeta && window.dorebox_content.movieMeta[currentItem.title]) || {};
                hist.unshift({ title: currentItem.title, poster: currentItem.poster, type: currentType, year: meta.year, watchedAt: new Date().toISOString() });
                if (hist.length > 100) hist = hist.slice(0, 100);
                localStorage.setItem('dorebox_watch_history', JSON.stringify(hist));
            }

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
            updateSEO(currentItem.title, currentItem.description, 'download', currentType, currentItem.poster);
            document.getElementById('movie-poster').src = currentItem.poster;
            document.getElementById('movie-title').textContent = currentItem.title;
            const qualityOptionsContainer = document.getElementById('quality-options');
            qualityOptionsContainer.innerHTML = '';
            if (currentItem.downloadLinks && Object.keys(currentItem.downloadLinks).length > 0) {
                let hasLinks = false;
                const qualityIcons = { '1080p': '🎬', '720p': '📺', '360p': '📱' };
                const qualityLabels = { '1080p': 'Full HD', '720p': 'HD', '360p': 'SD' };
                for (const quality in currentItem.downloadLinks) {
                    const link = currentItem.downloadLinks[quality];
                    if (link && link !== '#') {
                        hasLinks = true;
                        const qualityBtn = document.createElement('a');
                        qualityBtn.href = link;
                        qualityBtn.className = 'quality-btn';
                        qualityBtn.target = '_blank';
                        qualityBtn.rel = 'nofollow';
                        const icon = qualityIcons[quality] || '⬇️';
                        const label = qualityLabels[quality] || '';
                        qualityBtn.innerHTML = `<span class="q-left">${icon} <span>Download ${quality}</span></span><span class="q-badge">${label}</span>`;
                        qualityOptionsContainer.appendChild(qualityBtn);
                    }
                }
                if (!hasLinks) {
                    qualityOptionsContainer.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:20px">Download links coming soon. Follow our Telegram for updates.</p>';
                }
            } else {
                qualityOptionsContainer.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:20px">Download links coming soon.</p>';
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
                    const keysToRemove = Object.keys(localStorage).filter(k => k.startsWith('dorebox_'));
                    keysToRemove.forEach(k => localStorage.removeItem(k));
                    alert("Your data has been cleared. You will be redirected to homepage.");
                    window.location.href = 'index.html';
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

// ==================================================
// CHATBOT INTEGRATION LOGIC
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close-btn');
    const messagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');

    let chatHistory = [
        {
            role: "system",
            content: "You are the friendly and helpful DoreBox AI assistant. Your primary role is to answer questions about Doraemon movies, the DoreBox website's features (like the rewards system), and general inquiries. Keep your tone light and encouraging, like a friend of Doraemon and Nobita."
        },
        {
            role: "assistant",
            content: "Hello! I'm the DoreBox AI. How can I help you with movies, rewards, or any other questions?"
        }
    ];

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                chatInput.focus();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    function displayMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(role === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = content;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessageToAPI(userMessage) {
        chatHistory.push({ role: "user", content: userMessage });
        displayMessage('user', userMessage);

        const loadingMessage = document.createElement('div');
        loadingMessage.classList.add('message', 'bot-message', 'loading');
        loadingMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Typing...';
        messagesContainer.appendChild(loadingMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatHistory }),
            });

            messagesContainer.removeChild(loadingMessage);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'API call failed');
            }

            const data = await response.json();
            const botResponse = data.choices[0].message.content;

            chatHistory.push({ role: "assistant", content: botResponse });
            displayMessage('bot', botResponse);

        } catch (error) {
            console.error("Chatbot API Error:", error);
            displayMessage('bot', 'Sorry, I am having trouble connecting to the AI. Please try again later. Error: ' + error.message);
            chatHistory.pop();
        }
    }

    function handleSendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            chatInput.value = '';
            sendMessageToAPI(userMessage);
        }
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
});

// ==================================================
// DRAWER & MENU LOGIC (NEW ADDITION)
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle-btn');
    const sideDrawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('side-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');

    function openDrawer() {
        if(sideDrawer && overlay) {
            sideDrawer.classList.add('open');
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeDrawer() {
        if(sideDrawer && overlay) {
            sideDrawer.classList.remove('open');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    if(menuBtn) menuBtn.addEventListener('click', openDrawer);
    if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if(overlay) overlay.addEventListener('click', closeDrawer);
});
