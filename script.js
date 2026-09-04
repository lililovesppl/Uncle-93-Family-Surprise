document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADING
    ===================================== */

    const loadingMessages = [
        "Organizing family memories...",
        "Finding old stories...",
        "Collecting birthday greetings...",
        "Checking the family archive...",
        "Preparing something special...",
        "Almost ready..."
    ];

    const loadingBar = document.getElementById("loadingBar");
    const loadingText = document.getElementById("loadingText");
    const loadingPercent = document.getElementById("loadingPercent");

    let progress = 0;
    let messageIndex = 0;

    const loadingInterval = setInterval(() => {

        progress += 2;

        if (loadingBar) {
            loadingBar.style.width = progress + "%";
        }

        if (loadingPercent) {
            loadingPercent.textContent = progress + "%";
        }

        if (
            progress % 18 === 0 &&
            messageIndex < loadingMessages.length - 1
        ) {
            messageIndex++;

            if (loadingText) {
                loadingText.textContent =
                    loadingMessages[messageIndex];
            }
        }

        if (progress >= 100) {

            clearInterval(loadingInterval);

            setTimeout(() => {

                const intro = document.getElementById("intro");
                const errorScreen =
                    document.getElementById("errorScreen");

                if (intro) {
                    intro.classList.add("hidden");
                }

                if (errorScreen) {
                    errorScreen.classList.remove("hidden");
                }

                playSound("error");

            }, 500);
        }

    }, 60);


    /* =====================================
       SOUND EFFECTS
    ===================================== */

    let audioContext = null;

    function getAudioContext() {

        if (!audioContext) {
            audioContext =
                new (window.AudioContext ||
                    window.webkitAudioContext)();
        }

        return audioContext;
    }


    function playTone(
        frequency,
        duration,
        type = "square",
        volume = 0.04
    ) {

        try {

            const ctx = getAudioContext();

            const oscillator =
                ctx.createOscillator();

            const gain =
                ctx.createGain();

            oscillator.type = type;
            oscillator.frequency.value = frequency;

            gain.gain.setValueAtTime(
                volume,
                ctx.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                ctx.currentTime + duration
            );

            oscillator.connect(gain);
            gain.connect(ctx.destination);

            oscillator.start();

            oscillator.stop(
                ctx.currentTime + duration
            );

        } catch (error) {

            console.log("Audio unavailable.");

        }
    }


    function playSound(type) {

        if (type === "click") {

            playTone(650, 0.07);

            setTimeout(() => {
                playTone(900, 0.08);
            }, 60);

        }

        if (type === "error") {

            playTone(
                180,
                0.18,
                "sawtooth",
                0.05
            );

            setTimeout(() => {
                playTone(
                    120,
                    0.25,
                    "sawtooth",
                    0.05
                );
            }, 160);

        }

        if (type === "success") {

            playTone(523, 0.1);

            setTimeout(() => {
                playTone(659, 0.1);
            }, 100);

            setTimeout(() => {
                playTone(784, 0.18);
            }, 200);

        }

        if (type === "countdown") {

            playTone(440, 0.12);

        }

    }


    /* =====================================
       REVEAL
    ===================================== */

    window.showReveal = function () {

        playSound("click");

        const errorScreen =
            document.getElementById("errorScreen");

        const revealScreen =
            document.getElementById("revealScreen");

        if (errorScreen) {
            errorScreen.classList.add("hidden");
        }

        if (revealScreen) {
            revealScreen.classList.remove("hidden");
        }

    };


    /* =====================================
       COUNTDOWN
    ===================================== */

    window.startCountdown = function () {

        playSound("success");

        const revealScreen =
            document.getElementById("revealScreen");

        const countdownScreen =
            document.getElementById("countdownScreen");

        const number =
            document.getElementById("countdownNumber");

        if (revealScreen) {
            revealScreen.classList.add("hidden");
        }

        if (countdownScreen) {
            countdownScreen.classList.remove("hidden");
        }

        let count = 5;

        if (number) {
            number.textContent = count;
        }

        const timer = setInterval(() => {

            count--;

            if (number) {
                number.textContent = count;
            }

            playSound("countdown");

            if (count <= 0) {

                clearInterval(timer);

                setTimeout(() => {

                    if (countdownScreen) {
                        countdownScreen.classList.add("hidden");
                    }

                    const mainWebsite =
                        document.getElementById("mainWebsite");

                    if (mainWebsite) {
                        mainWebsite.classList.remove("hidden");
                    }

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                    launchConfetti();

                }, 500);
            }

        }, 900);

    };


    /* =====================================
       SCROLL
    ===================================== */

    window.scrollToSection = function (id) {

        playSound("click");

        const section =
            document.getElementById(id);

        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth"
        });

        launchConfetti(20);

    };


    /* =====================================
       SECRET MESSAGE
    ===================================== */

    window.showSecretMessage = function () {

        playSound("success");

        const secret =
            document.getElementById("secretMessage");

        if (!secret) return;

        secret.classList.remove("hidden");

        secret.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        launchConfetti(80);

    };


    /* =====================================
       VIDEO DATABASE
       ALL VIDEOS ARE IN ROOT FOLDER
    ===================================== */

    const videos = {

        "birthday-food": {
            file: "birthday-food.mp4",
            title: "Birthday Food",
            description:
                "Good food, family and a reason to celebrate."
        },

        "everyone-dancing": {
            file: "everyone-dancing.mp4",
            title: "Everyone Dancing",
            description:
                "When the family celebration turns into a dance floor."
        },

        "before-birthday-celebration": {
            file: "before-birthday-celebration.mp4",
            title: "Before the Birthday Celebration",
            description:
                "A celebration before the actual birthday."
        },

        "calling-uncle-after-eating-1": {
            file: "calling-uncle-after-eating-1.mp4",
            title: "Calling Uncle After Eating",
            description:
                "Everyone calls Uncle after finishing the food."
        },

        "calling-uncle-after-eating-2": {
            file: "calling-uncle-after-eating-2.mp4",
            title: "The Call Continues",
            description:
                "The family call continues."
        },

        "cousins-green-light": {
            file: "cousins-green-light.mp4",
            title: "Uncle's Green Light",
            description:
                "Sometimes the best family memories start with someone saying, Go ahead."
        },

        "lylie": {
            file: "lylie.mp4",
            title: "Lylie",
            description:
                "A little birthday greeting from Lylie."
        },

        "akeisha-jenny-son": {
            file: "akeisha-jenny-son.mp4",
            title: "Akeisha & Jenny's Son",
            description:
                "A birthday song made especially for Uncle."
        },

        "ethan": {
            file: "ethan.mp4",
            title: "Ethan",
            description:
                "A birthday message from Ethan."
        },

        "pau-ashley-camille": {
            file: "pau-ashley-camille.mp4",
            title: "Pau, Ashley & Camille",
            description:
                "A birthday greeting filled with laughter."
        },

        "metseng-tony": {
            file: "metseng-tony.mp4",
            title: "Metseng & Tony",
            description:
                "A birthday greeting from the family."
        },

        "paullene": {
            file: "paullene.mp4",
            title: "Paullene",
            description:
                "A birthday message from Paullene."
        },

        "raquel": {
            file: "raquel.mp4",
            title: "Raquel",
            description:
                "A birthday greeting from Raquel."
        },

        "janet": {
            file: "janet.mp4",
            title: "Janet",
            description:
                "A birthday message from Janet."
        },

        "jenny": {
            file: "jenny.mp4",
            title: "Jenny",
            description:
                "A birthday greeting from Jenny."
        },

        "jesyl": {
            file: "jesyl.mp4",
            title: "Jesyl",
            description:
                "A birthday message from Jesyl."
        },

        "dianne": {
            file: "dianne.mp4",
            title: "Dianne",
            description:
                "A birthday greeting from Dianne."
        },

        "grace-camille-puti": {
            file: "grace-camille-puti.mp4",
            title: "Grace, Camille & Puti",
            description:
                "A family birthday greeting."
        },

        "dinand": {
            file: "dinand.mp4",
            title: "Dinand",
            description:
                "A birthday greeting from Dinand."
        },

        "glenda": {
            file: "glenda.mp4",
            title: "Glenda",
            description:
                "A birthday message from Glenda."
        },

        "akeisha-dance": {
            file: "akeisha-dance.mp4",
            title: "Akeisha",
            description:
                "A special birthday dance for Uncle."
        },

        "vilma-santy": {
            file: "vilma-santy.mp4",
            title: "Vilma & Santy",
            description:
                "A birthday greeting from Vilma and Santy."
        },

        "nica": {
            file: "nica.mp4",
            title: "Nica",
            description:
                "A birthday message from Nica."
        },

        "aj": {
            file: "aj.mp4",
            title: "AJ",
            description:
                "A birthday greeting from AJ."
        },

        "pauldhess-wife-son": {
            file: "pauldhess-wife-son.mp4",
            title: "Pauldhess, Wife & Son",
            description:
                "A birthday greeting from the family."
        }

    };


    /* =====================================
       OPEN VIDEO
    ===================================== */

    window.openVideo = function (videoId) {

        const video = videos[videoId];

        if (!video) {
            console.error(
                "Video not found:",
                videoId
            );
            return;
        }

        playSound("success");
        launchConfetti(45);

        const modal =
            document.getElementById("videoModal");

        const modalVideo =
            document.getElementById("modalVideo");

        const modalTitle =
            document.getElementById("modalTitle");

        const modalDescription =
            document.getElementById("modalDescription");

        if (
            !modal ||
            !modalVideo ||
            !modalTitle ||
            !modalDescription
        ) {
            console.error(
                "Video modal elements are missing."
            );
            return;
        }

        modalTitle.textContent =
            video.title;

        modalDescription.textContent =
            video.description;

        /*
         * The videos are in the SAME folder
         * as index.html, so no "videos/" here.
         */

        modalVideo.src = video.file;

        modal.classList.remove("hidden");

        document.body.style.overflow = "hidden";

        modalVideo.load();

        modalVideo.play().catch(() => {
            /*
             * Some browsers block autoplay.
             * The video controls will still work.
             */
        });

    };


    /* =====================================
       CLOSE VIDEO
    ===================================== */

    window.closeVideo = function () {

        playSound("click");

        const modal =
            document.getElementById("videoModal");

        const modalVideo =
            document.getElementById("modalVideo");

        if (modalVideo) {

            modalVideo.pause();

            modalVideo.currentTime = 0;

            modalVideo.removeAttribute("src");

            modalVideo.load();
        }

        if (modal) {
            modal.classList.add("hidden");
        }

        document.body.style.overflow = "";

    };


    /* =====================================
       CLICK OUTSIDE VIDEO
    ===================================== */

    const videoModal =
        document.getElementById("videoModal");

    if (videoModal) {

        videoModal.addEventListener(
            "click",
            function (event) {

                if (event.target === videoModal) {
                    closeVideo();
                }

            }
        );

    }


    /* =====================================
       ESCAPE KEY
    ===================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeVideo();
            }

        }
    );


    /* =====================================
       FINAL SURPRISE
    ===================================== */

    window.unlockFinalSurprise = function () {

        playSound("success");

        launchConfetti(180);

        const section =
            document.getElementById("lastSurprise");

        if (!section) return;

        section.classList.remove("hidden");

        setTimeout(() => {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }, 100);

    };


    /* =====================================
       PERSONAL GIFT
    ===================================== */

    window.openPersonalGift = function () {

        playSound("success");

        launchConfetti(200);

        /*
            REPLACE THE URL BELOW
            WITH YOUR PERSONAL BIRTHDAY WEBSITE.
        */

        const personalWebsite = "#";

        if (personalWebsite !== "#") {

            window.open(
                personalWebsite,
                "_blank"
            );

        } else {

            alert(
                "Your personal surprise website link will be added here."
            );

        }

    };


    /* =====================================
       CLOSE SURPRISE
    ===================================== */

    window.closeSurprise = function () {

        playSound("click");

        const section =
            document.getElementById("lastSurprise");

        if (!section) return;

        section.classList.add("hidden");

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    };


    /* =====================================
       CONFETTI
    ===================================== */

    const canvas =
        document.getElementById("confettiCanvas");

    const ctx =
        canvas ? canvas.getContext("2d") : null;

    let confettiPieces = [];

    function resizeCanvas() {

        if (!canvas) return;

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    function launchConfetti(amount = 100) {

        if (!canvas || !ctx) return;

        const colors = [
            "#ff159f",
            "#00e5ff",
            "#ffe600",
            "#ffffff",
            "#8a5cff"
        ];

        for (let i = 0; i < amount; i++) {

            confettiPieces.push({

                x:
                    Math.random() *
                    canvas.width,

                y: -20,

                size:
                    Math.random() * 8 + 4,

                speed:
                    Math.random() * 4 + 2,

                drift:
                    Math.random() * 2 - 1,

                rotation:
                    Math.random() * 360,

                rotationSpeed:
                    Math.random() * 8 - 4,

                color:
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ]

            });

        }

        if (confettiPieces.length > 500) {

            confettiPieces =
                confettiPieces.slice(-500);

        }

        animateConfetti();

    }


    let animationRunning = false;

    function animateConfetti() {

        if (animationRunning) return;

        animationRunning = true;

        function frame() {

            if (!ctx || !canvas) {

                animationRunning = false;
                return;

            }

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            confettiPieces =
                confettiPieces.filter(
                    piece =>
                        piece.y <
                        canvas.height + 30
                );

            confettiPieces.forEach(
                piece => {

                    piece.y += piece.speed;

                    piece.x += piece.drift;

                    piece.rotation +=
                        piece.rotationSpeed;

                    ctx.save();

                    ctx.translate(
                        piece.x,
                        piece.y
                    );

                    ctx.rotate(
                        piece.rotation *
                        Math.PI / 180
                    );

                    ctx.fillStyle =
                        piece.color;

                    ctx.fillRect(
                        -piece.size / 2,
                        -piece.size / 2,
                        piece.size,
                        piece.size * 1.8
                    );

                    ctx.restore();

                }
            );

            if (confettiPieces.length > 0) {

                requestAnimationFrame(frame);

            } else {

                animationRunning = false;

            }

        }

        requestAnimationFrame(frame);

    }


    /* =====================================
       ALL BUTTONS GET SOUND
    ===================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest("button");

            if (!button) return;

            if (
                button.hasAttribute("onclick")
            ) {
                playSound("click");
            }

        }
    );

});
