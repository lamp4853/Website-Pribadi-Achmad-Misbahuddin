document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENT HTML
    ========================= */

    const menuItems =
        document.querySelectorAll(".menu-item");

    const characterImage =
        document.getElementById("characterImage");

    const infoContainer =
        document.getElementById("infoContainer");

    const bgmAudio =
        document.getElementById("bgmAudio");

    const characterVoice =
        document.getElementById("characterVoice");

    const bgmButton =
        document.getElementById("bgmButton");

    const bgmStatus =
        document.getElementById("bgmStatus");


    /* =========================
       DATA HALAMAN
    ========================= */

    const pages = {

        home: {

            character:
                "Nero.png",

            voice: [
                "Nero 1.mp3",
                "Nero 2.mp3"
            ],

            title:
                "Achmad Misbahuddin:",

            page:
                "Home",

            description:
                "Website ini dibuat sebagai tugas developer untuk kegiatan CBT 26 yang diadakan oleh UKM Universitas Trunojoyo Madura CCC. UI Website ini dibuat dengan inspirasi UI game Fate/Extella: The Umbral Star. Website ini berisi mengenai beberapa info tentang deskripsi web ini, profil pengembang, dan contact pengembang."

        },


        about: {

            character:
                "Carlemagne.png",

            voice: [
                "Carlemagne 1.mp3",
                "Carlemagne 2.mp3",
                "Carlemagne 3.mp3",
                "Carlemagne 4.mp3"
            ],

            title:
                "Achmad Misbahuddin:",

            page:
                "About Me",

            description:
                "Halo! Saya Achmad Misbahuddin pengembang website ini. Website ini merupakan salah satu project yang saya buat untuk mempelajari pengembangan website, khususnya HTML, CSS, dan JavaScript. Walaupun ada beberapa hal yang kurang saya mengerti, saya dapat mempelajarinya secara perlahan."

        },


        contact: {

            character:
                "Archer.png",

            voice: [
                "Archer Japanese Battle Voice Lines (1).mp3",
                "Archer Japanese Battle Voice Lines (2).mp3",
                "Archer Japanese Battle Voice Lines.mp3"
            ],

            title:
                "Achmad Misbahuddin:",

            page:
                "Contact",

            description: `
                Jika ingin menghubungi saya, kamu dapat menggunakan
                beberapa kontak berikut:

                <br><br>

                <a href="https://www.instagram.com/achmad_misbahuddin?stkn=cHk0a3V5N21lYXV3"
                target="_blank">
                Instagram
                </a>

                <br><br>

                <a href="https://wa.me/qr/2F3ZP3BY2FTSM1"
                target="_blank">
                Whatsapp
                </a>
            `
        }

    };


    /* =========================
       VOICE RANDOM
    ========================= */

    let lastVoice = -1;


    function playRandomVoice(page) {

        if (!page.voice || page.voice.length === 0) {
            return;
        }


        let randomVoice;


        /* Jangan memainkan suara
           yang sama dua kali berturut-turut */

        do {

            randomVoice =
                Math.floor(
                    Math.random() *
                    page.voice.length
                );

        } while (
            page.voice.length > 1 &&
            randomVoice === lastVoice
        );


        lastVoice = randomVoice;


        /* Masukkan file suara */

        characterVoice.src =
            page.voice[randomVoice];


        /* Mulai dari awal */

        characterVoice.currentTime = 0;


        /* Putar */

        characterVoice.play()
            .catch(error => {

                console.error(
                    "Gagal memainkan voice:",
                    error
                );

            });

    }


    /* =========================
       HALAMAN AKTIF
    ========================= */

    let currentPage = "home";


    /* =========================
       GANTI HALAMAN
    ========================= */

    function changePage(pageName) {

        const page =
            pages[pageName];

        if (!page) {
            console.error(
                "Halaman tidak ditemukan:",
                pageName
            );

            return;
        }


        currentPage = pageName;


        /* =====================
           CHARACTER KELUAR
        ===================== */

        characterImage.classList.remove(
            "character-enter"
        );

        characterImage.classList.add(
            "character-exit"
        );


        /* =====================
           INFO KELUAR
        ===================== */

        infoContainer.classList.remove(
            "info-enter"
        );

        infoContainer.classList.add(
            "info-exit"
        );


        /* =====================
           TUNGGU ANIMASI
        ===================== */

        setTimeout(() => {


            /* =====================
               GANTI CHARACTER
            ===================== */

            characterImage.src =
                page.character;


            characterImage.classList.remove(
                "character-exit"
            );


            void characterImage.offsetWidth;


            characterImage.classList.add(
                "character-enter"
            );


            /* =====================
               GANTI TEXTBOX
            ===================== */

            infoContainer.innerHTML = `

                <div class="status">

                    <div class="status-inner">

                        <div class="status-header">

                            <span class="orange">
                                ${page.title}
                            </span>

                            <span class="value">
                                ${page.page}
                            </span>

                        </div>

                        <div class="Deskripsi">

                            <span>
                                ${page.description}
                            </span>

                        </div>

                    </div>

                </div>

            `;


            /* =====================
               INFO MASUK
            ===================== */

            infoContainer.classList.remove(
                "info-exit"
            );


            void infoContainer.offsetWidth;


            infoContainer.classList.add(
                "info-enter"
            );


        }, 500);

    }


    /* =========================
       MENU CLICK
    ========================= */

    menuItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {


                /* Active menu */

                menuItems.forEach(menu => {

                    menu.classList.remove(
                        "active"
                    );

                });


                item.classList.add(
                    "active"
                );


                /* Ambil nama halaman */

                const pageName =
                    item.dataset.page;


                /* Ganti halaman */

                changePage(pageName);

            }
        );

    });


    /* =========================
       CHARACTER CLICK
    ========================= */

    characterImage.addEventListener(
        "click",
        () => {

            const page =
                pages[currentPage];


            playRandomVoice(page);

        }
    );


    /* =========================
       BGM
    ========================= */

    let bgmPlaying = false;


    bgmButton.addEventListener(
        "click",
        () => {


            if (!bgmPlaying) {


                bgmAudio.volume = 0.4;


                bgmAudio.play()
                    .then(() => {

                        bgmPlaying = true;

                        bgmStatus.textContent =
                            "ON";

                        bgmButton.classList.add(
                            "on"
                        );

                    })
                    .catch(error => {

                        console.error(
                            "BGM gagal diputar:",
                            error
                        );

                    });

            }

            else {


                bgmAudio.pause();


                bgmPlaying = false;


                bgmStatus.textContent =
                    "OFF";


                bgmButton.classList.remove(
                    "on"
                );

            }

        }
    );

});