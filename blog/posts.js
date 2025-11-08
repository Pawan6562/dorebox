// FINAL, RELIABLE DATA FILE
// Naya post add karne ke liye, bas is array mein neeche ek naya object add kar dena hai.

const blogPosts = [
    {
        id: "nobita-lifestyle",
        title: "Nobita ki Lifestyle: Aalas ya Sadgi?",
        poster: "https://i.postimg.cc/3w83qTtr/Doraemon-The-Movie-Dinosaur-Yoddhha-Hindi-Tamil-Telugu-Download-FHD-990x557.jpg",
        description: "Nobita ke daily routine, uski aadaton aur uske piche ki psychology ko samjhein. Kya woh sirf aalsi hai ya uski life mein kuch gehraai hai?",
        date: "November 07, 2025",
        content: `
            <h2>Nobita: Ek Aam Bacche ki Kahani</h2>
            <p>Nobita Nobi, Doraemon series ka hero, hum sabke liye ek jaana-pehchana chehra hai. Usko aksar ek aalsi, padhai mein kamzor aur bhulakkad bacche ke roop mein dikhaya jaata hai. Lekin kya uski kahani sirf itni hi hai?</p>
            <h3>Subah ki Shuruaat</h3>
            <p>Nobita ki subah hamesha der se hoti hai. Uski maa use uthane ki koshish karti hai, lekin woh 5 minute aur sone ki zidd karta hai. Ye hum mein se kayi logo ki kahani hai.</p>
            <h3>School Life</h3>
            <p>School mein, Nobita ko hamesha zero marks milte hain aur uske teacher use daantate rehte hain. Gian aur Suneo use pareshan karte hain. Yahan Doraemon uski madad ke liye aata hai.</p>
            <h2>Conclusion</h2>
            <p>Nobita ki lifestyle sadgi aur masoomiyat se bhari hai. Woh humein yaad dilata hai ki galtiyan karna theek hai, jab tak hamare paas acche dost hain jo hamara saath dete hain.</p>
        `
    },
    {
        id: "doraemon-movies-magic",
        title: "Doraemon ki Movies ka Jaadu: Kyun Hain Ye Itni Khaas?",
        poster: "https://i.postimg.cc/vmkLDN1X/Doraemon-The-Movie-Stand-by-Me-by-cjh.png",
        description: "Doraemon ki movies sirf cartoons nahi, balki emotions aur adventure ka ek anokha safar hain. Aaiye jaante hain inki popularity ke peeche ka raaz.",
        date: "November 08, 2025",
        content: `
            <h2>Introduction: Sirf Ek Cartoon Nahi</h2>
            <p>Jab hum Doraemon ka naam sunte hain, to humein Nobita ki masti aur gadgets ki duniya yaad aati hai. Lekin Doraemon ki movies isse kahin badhkar hain. Ye movies humein dosti, himmat, aur sahi kaam karne ki seekh deti hain. Har movie ek naye adventure par le jaati hai, kabhi dinosaurs ke beech, to kabhi outer space mein.</p>
            <h3>1. Badi Kahani, Bade Emotions</h3>
            <p>TV series ke chote-chote episodes ke mukable, movies ek poori, badi kahani batati hain. Inmein characters ka development, unke dar, aur unki jeet ko gehraai se dikhaya jaata hai. "Stand by Me" jaisi movies ne to logon ko rula tak diya. Ye movies humein Nobita aur uske doston se emotionally jodti hain.</p>
            <h3>2. Naye Worlds, Naye Characters</h3>
            <p>Har movie humein ek nayi duniya mein le jaati hai. "Nobita's Dinosaur" humein pre-historic times mein le jaati hai, to "The Record of Nobita's Spaceblazer" humein ek alag hi galaxy ki sair karati hai. In movies mein humein naye aur yaadgaar characters milte hain jo kahani ko aur bhi interesting bana dete hain.</p>
            <h3>3. Animation aur Music ka Kamaal</h3>
            <p>Movies ka animation quality TV series se kahin behtar hota hai. Landscapes, action scenes, aur character expressions bahut detail mein banaye jaate hain. Saath hi, movies ka background music aur theme songs kahani ke emotions ko aur badha dete hain. "Himawari no Yakusoku" gaana aaj bhi logon ka favorite hai.</p>
            <h2>Conclusion</h2>
            <p>Doraemon ki movies sirf time-pass nahi hain. Wo ek experience hain jo har age group ke logon ko pasand aata hai. Ye humein sikhata hai ki agar dost saath hon, to koi bhi mushkil badi nahi hoti. Aapki favorite Doraemon movie kaun si hai? Humein zaroor bataiye!</p>
        `
    }, // ✅✅✅ FIX: YAHAN PAR COMMA ADD KAR DIYA GAYA HAI ✅✅✅

    // Ye file ab seedha post object return karegi
    {
    id: "top-10-doraemon-movies",
    title: "Top 10 Doraemon Movies: Nobita ke Sabse Yaadgaar Adventures!",
    // ✅✅✅ POSTER IMAGE UPDATE HO GAYA HAI ✅✅✅
    poster: "https://i.postimg.cc/Y0yP7Hz8/bdb7a0e7-5956-4af3-ba28-cac5fa08decd.png",
    description: "Doraemon ki duniya mein movies ka ek alag hi jaadu hai. Humne aapke liye top 10 best Doraemon movies ki list taiyaar ki hai jo har fan ko zaroor dekhni chahiye. Yahan se aap in movies ko free mein dekh aur download bhi kar sakte hain.",
    date: "November 09, 2025",
    content: `
        <h2>Introduction: Doraemon Movies ka Anokha Safar</h2>
        <p>Doraemon sirf ek TV show nahi, balki hamare bachpan ka ek important hissa hai. Jab baat movies ki aati hai, to Doraemon humein hamesha ek naye, rochak aur emotional safar par le jaata hai. Ye movies sirf adventure nahi, balki dosti, himmat aur acche insaan banne ki seekh bhi deti hain. Agar aap Doraemon ke asli fan hain, to ye 10 movies aapki 'must-watch' list mein honi chahiye. Aaiye, shuru karte hain!</p>

        <hr>

        <h3>10. Nobita's Great Adventure in the South Seas (1998 )</h3>
        <p><strong>Kahani:</strong> School project ke liye samundar ke baare mein research karte hue, Nobita aur uske dost ek asli treaure map dhoondh lete hain. Iske baad shuru hota hai samundri daakuon, toofano aur ek anokhe khazane ki khoj ka safar. Ye movie classic treasure hunt stories ko Doraemon ka twist deti hai.</p>
        <p><strong>Kyun Dekhein:</strong> Adventure aur mystery se bharpoor, ye movie aapko aakhri tak baandhe rakhegi. Ismein samundri jeevan aur exploration ka anokha anubhav hai.</p>
        <div class="promo-box">
            <p>Is romanchak samundri safar ka hissa banne ke liye, aap is movie ko DoreBox par dekh ya download kar sakte hain.</p>
            <a href="watch.html?title=Doraemon%20Nobita's%20Great%20Adventure%20in%20the%20South%20Seas" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>9. Nobita and the Green Giant Legend (2008)</h3>
        <p><strong>Kahani:</strong> Nobita ko ek chota sa paudha milta hai jise wo ghar le aata hai. Doraemon ke gadget se, wo paudha zinda ho jaata hai aur bolne lagta hai, jiska naam wo "Kibo" rakhte hain. Jald hi unhein pata chalta hai ki Kibo ek alag hi 'Green Planet' se hai, aur ab unhein poore planet ko bachana hai.</p>
        <p><strong>Kyun Dekhein:</strong> Ye movie environment aur nature ki importance par ek khoobsurat message deti hai. Nobita aur Kibo ki dosti aapko emotional kar degi.</p>
        <div class="promo-box">
            <p>Nature aur dosti ki is dil chhoo lene wali kahani ko DoreBox par dekhein.</p>
            <a href="watch.html?title=Nobita%20In%20Hara%20Hara%20Planet" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>8. Nobita's Dinosaur (2006)</h3>
        <p><strong>Kahani:</strong> Ye 1980 ki classic movie ka ek modern remake hai. Nobita galti se ek dinosaur ka anda dhoondh leta hai aur usmein se ek baby dinosaur, Pisuke, nikalta hai. Nobita use chup kar paalta hai, lekin jab Pisuke bada ho jaata hai, to use uske time mein wapis chhodne ka emotional faisla lena padta hai.</p>
        <p><strong>Kyun Dekhein:</strong> Ye movie dosti aur zimmedari ka sabse accha example hai. Nobita aur Pisuke ka bond aapki aankhon mein aansu la dega. Animation bhi lajawaab hai.</p>
        <div class="promo-box">
            <p>Nobita aur uske dinosaur dost ki is pyaari kahani ko DoreBox par experience karein.</p>
            <a href="watch.html?title=Nobita's%20Dinosaur" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>7. Nobita and the Birth of Japan (2016)</h3>
        <p><strong>Kahani:</strong> Apne gharon se pareshan hokar, Nobita aur uske dost 70,000 saal peeche, ancient Japan mein jaakar rehne ka faisla karte hain. Wahan unki mulaqat ek primitive tribe se hoti hai jise ek shaktishali, jaadui dushman se khatra hai. Ab un sabko milkar us tribe ko bachana hai.</p>
        <p><strong>Kyun Dekhein:</strong> History, fantasy aur action ka perfect blend. Ye movie dikhati hai ki kaise alag-alag culture ke log ek saath aa sakte hain.</p>
        <div class="promo-box">
            <p>70,000 saal purane is historical adventure ko DoreBox par free mein dekhein.</p>
            <a href="watch.html?title=Doraemon%20nobita%20and%20the%20Birthday%20of%20japan" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>6. Nobita's Treasure Island (2018)</h3>
        <p><strong>Kahani:</strong> "Treasure Island" ki kahani se inspire hokar, Nobita apne doston ko kehta hai ki wo samundar mein apna khazana dhoondhega. Doraemon ke gadgets ki madad se unka safar shuru hota hai, lekin jald hi unka saamna asli samundri daakuon se hota hai aur Shizuka kidnap ho jaati hai.</p>
        <p><strong>Kyun Dekhein:</strong> High-octane action, suspense, aur ek parivaar ke raaz ki kahani. Iska animation aur fast-paced story isey bahut engaging banati hai.</p>
        <div class="promo-box">
            <p>Kya Nobita Shizuka ko bacha paayega? Janne ke liye, is movie ko DoreBox par dekhein.</p>
            <a href="watch.html?title=Doraemon%20Nobita's%20Treasure%20Island" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>5. Nobita and the Steel Troops: The New Age (2011)</h3>
        <p><strong>Kahani:</strong> Nobita galti se ek giant robot ke parts order kar leta hai. Jald hi, ek ajeeb ladki, Riruru, us robot ko lene aati hai. Pata chalta hai ki wo ek robot army ka hissa hai jo Earth par hamla karne wali hai. Ab Nobita aur uske doston ko Riruru ke saath milkar apni duniya ko bachana hai.</p>
        <p><strong>Kyun Dekhein:</strong> Ye movie dosti, sacrifice aur humanity par ek bahut hi gehra message deti hai. Iska climax bahut emotional aur powerful hai. Ye shayad sabse mature Doraemon movies mein se ek hai.</p>
        <div class="promo-box">
            <p>Action aur emotions se bharpoor is sci-fi masterpiece ko DoreBox par zaroor dekhein.</p>
            <a href="watch.html?title=Steel%20Troops%20%E2%80%93%20New%20Age" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>4. Nobita's Dorabian Nights (1991)</h3>
        <p><strong>Kahani:</strong> Shizuka Arabian Nights ki kahaniyon ki duniya mein jaana chahti hai. Doraemon ke gadget se wo sach mein uss storybook ki duniya mein chale jaate hain. Lekin jab Shizuka wahan kho jaati hai, to Nobita aur uske dost use bachane ke liye Sinbad, Alibaba aur jaadui chirag ki duniya mein utar jaate hain.</p>
        <p><strong>Kyun Dekhein:</strong> Ek classic fantasy adventure. Arabian Nights ki jaadui duniya ko Doraemon ke saath explore karna ek anokha anubhav hai.</p>
        <div class="promo-box">
            <p>Jaadui chirag aur udne wale قالین ke is safar ko DoreBox par live dekhein.</p>
            <a href="watch.html?title=Doraemon%20Nobita's%20Dorabian%20Nights" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>3. Nobita and the Windmasters (2003)</h3>
        <p><strong>Kahani:</strong> Doraemon ke gadget se, Nobita hawa ke ek chote se toofan ko paal leta hai jiska naam wo Fuko rakhta hai. Fuko unhein ek aisi duniya mein le jaati hai jahan log hawa ko control karte hain. Wahan unhein ek purani, shaitani shakti ka saamna karna padta hai.</p>
        <p><strong>Kyun Dekhein:</strong> Is movie ka concept bahut unique hai. Fuko aur Nobita ki dosti, aur Gian ka heroic role is movie ko bahut khaas banata hai.</p>
        <div class="promo-box">
            <p>Hawa ke saath udne wale is adventure ko DoreBox par high quality mein dekhein.</p>
            <a href="watch.html?title=Doraemon%20Nobita%20and%20the%20Windmasters" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>2. Nobita and the Tin Labyrinth (1993)</h3>
        <p><strong>Kahani:</strong> Nobita ke papa galti se ek ajeeb suitcase ghar le aate hain, jo ek hotel ka darwaza nikalta hai. Ye hotel ek aisi duniya mein hai jahan saare insaan robots ke gulam ban chuke hain. Ab Nobita aur uske doston ko insaaniyat ko bachane ke liye robots se ladna hai.</p>
        <p><strong>Kyun Dekhein:</strong> Ek dark, thrilling aur suspenseful story. Ye movie artificial intelligence ke khatron par ek gehra sawaal uthati hai. Iska maze (labyrinth) wala concept bahut hi creative hai.</p>
        <div class="promo-box">
            <p>Robots aur insaano ki is jung ko DoreBox par dekhein aur download karein.</p>
            <a href="watch.html?title=Khilone%20Ki%20Bhul%20Bhulaiya" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <h3>1. Stand by Me Doraemon (2014)</h3>
        <p><strong>Kahani:</strong> Ye movie koi naya adventure nahi, balki Doraemon aur Nobita ki poori kahani ko ek saath jodti hai - unke pehli mulaqat se lekar unke bichhadne tak. Ye dikhati hai ki Doraemon Nobita ki life ko behtar banane ke liye future se aaya tha, aur jab uska mission poora ho jaata hai, to use wapis jaana padega.</p>
        <p><strong>Kyun Dekhein:</strong> Ye sirf ek movie nahi, ek emotional rollercoaster hai. Ye har uss insaan ke liye hai jo Doraemon dekhte hue bada hua hai. Iska 3D animation isey ek alag hi level par le jaata hai. Ye movie aapko hasayegi bhi aur rulayegi bhi. Ye dosti ki sabse khoobsurat kahani hai.</p>
        <div class="promo-box">
        <p>Dosti ki is anokhi aur emotional kahani ko DoreBox par zaroor experience karein.</p>
        <a href="watch.html?title=Stand%20by%20Me%20%E2%80%93%20Part%201" class="promo-button">Watch Now on DoreBox</a>
        </div>

        <hr>

        <h2>Conclusion: Aapki Favorite Movie Kaunsi Hai?</h2>
        <p>Ye thi hamari top 10 Doraemon movies ki list. Har movie apne aap mein khaas hai aur ek alag anubhav deti hai. Ho sakta hai aapki favorite movie is list mein na ho, kyunki Doraemon ki har movie hi lajawaab hai. Aap in sabhi movies ko hamari website par aasani se dekh aur download kar sakte hain.</p>
        <div class="final-promo">
            <h3>Poori Movie Collection Dekhein</h3>
            <p>DoreBox par aapko Doraemon ki saari old aur new movies milengi. Abhi visit karein aur apne favorite adventure ko dobara jeeyein!</p>
            <a href="/" class="final-promo-button">Visit DoreBox Now!</a>
        </div>
    `
    },
    {
        id: "top-5-gadgets",
        title: "Top 5 Doraemon Gadgets Jo Hum Sab Chahte Hain",
        poster: "https://i.postimg.cc/9QsfxJbw/Doraemon-Gadget-Museum-Ka-Rahasya-by-cjh.jpg",
        description: "Anywhere Door se lekar Time Machine tak, dekhein kaunse gadgets hamari life badal sakte hain. Ye hain hamari top 5 list!",
        content: `
            <h2>Introduction</h2>
            <p>Doraemon ka 4D pocket ek khazana hai jismein bhavishya ke anokhe gadgets hain. Har episode mein hum ek naya gadget dekhte hain jo Nobita ki mushkilon ko (aksar thode time ke liye  ) solve karta hai. Agar humein inmein se kuch gadgets mil jaayein, to hamari zindagi kitni badal jaayegi! Chaliye dekhte hain top 5 aise gadgets jo har koi chahta hai.</p>
            <h3>1. Anywhere Door (Dokodemo Door)</h3>
            <p>Ye list iske bina adhoori hai. Anywhere Door ek jaadui darwaza hai jise kholkar aap duniya mein kahin bhi, kisi bhi jagah, turant pahunch sakte hain. Socho, school ya office ke liye kabhi late nahi honge! Traffic ka jhanjhat khatam. Weekend par Paris mein breakfast aur Tokyo mein dinner kar sakte hain. Ye gadget travel industry ko hamesha ke liye badal dega.</p>
            <h3>2. Time Machine</h3>
            <p>Itihas ko apni aankhon se dekhna ya future mein jhaankna - Time Machine is sapne ko sach karti hai. Aap apne purvajon se mil sakte hain, dinosaurs ko dekh sakte hain, ya dekh sakte hain ki 100 saal baad duniya kaisi hogi. Ye sirf ek adventure hi nahi, balki seekhne ka ek anokha zariya bhi hai. Haan, iska galat istemal khatarnak ho sakta hai, jaisa ki humne kayi movies mein dekha hai.</p>
            <h3>3. Bamboo-Copter (Take-Copter)</h3>
            <p>Personal flight ka sabse simple aur cool tareeka! Bas is choti si pankhi ko apne sir par lagao aur udd jao. Ye shehron mein traffic ki samasya ka ek perfect solution ho sakta hai. Aap aasman se duniya ka nazara le sakte hain aur apni manzil par tezi se pahunch sakte hain. Ye rozmarra ki zindagi mein sabse zyada kaam aane wala gadget ho sakta hai.</p>
            <h3>4. What-If Phone Booth</h3>
            <p>Ye ek bahut hi powerful gadget hai. Is phone booth mein jaakar aap "what if" (kya hota agar) wali koi bhi situation bol sakte hain, aur duniya uske hisab se badal jaayegi. Jaise, "Kya hota agar mujhe exam mein 100 marks milte?" aur result aane par aapko sach mein 100 marks milenge. Ye gadget aapko kisi bhi situation ka alternate reality version anubhav karne deta hai. Lekin har badlav ke apne nateeje hote hain!</p>
            <h3>5. Memory Bread</h3>
            <p>Students ke liye ye gadget ek vardaan hai! Memory Bread par aapko bas apni textbook ya notes ko chhaapna hai aur use kha lena hai. Vo saari information aapko turant yaad ho jaayegi. Exams se ek raat pehle poori syllabus cover karna ab mumkin ho jaayega. Isse seekhna kitna aasan aur mazedaar ho sakta hai!</p>
            <h2>Conclusion</h2>
            <p>Doraemon ke gadgets sirf kalpana nahi hain, balki wo hamari ichhaon aur sapno ko darshate hain. Ye gadgets humein inspire karte hain ki technology aur creativity se kuch bhi sambhav hai. Aapka favorite gadget kaunsa hai? Humein neeche comments mein batao!</p>
        `
    }
    // Naya post add karne ke liye, yahan ek comma lagao aur upar jaisa ek aur object paste kar do.
];
