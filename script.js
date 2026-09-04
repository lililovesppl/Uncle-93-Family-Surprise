document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       VIDEO DATA
       All videos are in the ROOT folder
       ========================================= */

    const videoData = {

        // FAMILY GREETINGS
        "lylie": {
            name: "Lylie",
            file: "lylie.mp4",
            message: "A sweet birthday greeting from Lylie."
        },

        "akeisha-jenny-son": {
            name: "Akiesha and Jenny's Son",
            file: "akeisha-jenny-son.mp4",
            message: "A special birthday greeting from Akiesha and Jenny's son."
        },

        "ethan": {
            name: "Ethan",
            file: "ethan.mp4",
            message: "A birthday greeting from Ethan, son of Nico."
        },

        "pau-ashley-camille": {
            name: "Pau, Ashley and Camille",
            file: "pau-ashley-camille.mp4",
            message: "A fun family birthday greeting filled with laughter."
        },

        "metseng-tony": {
            name: "Metseng and Tony",
            file: "metseng-tony.mp4",
            message: "A special birthday greeting from Metseng and Tony."
        },

        "paullene": {
            name: "Paullene",
            file: "paullene.mp4",
            message: "A birthday greeting from Paullene."
        },

        "raquel": {
            name: "Raquel",
            file: "raquel.mp4",
            message: "A special birthday greeting from Raquel."
        },

        "janet": {
            name: "Janet",
            file: "janet.mp4",
            message: "A birthday greeting from Janet."
        },

        "jenny": {
            name: "Jenny",
            file: "jenny.mp4",
            message: "A birthday greeting from Jenny."
        },

        "jesyl": {
            name: "Jesyl",
            file: "jesyl.mp4",
            message: "A special birthday greeting from Jesyl."
        },

        "dianne": {
            name: "Dianne",
            file: "dianne.mp4",
            message: "A birthday greeting from Dianne."
        },

        "grace-camille-puti": {
            name: "Grace, Camille and Puti",
            file: "grace-camille-puti.mp4",
            message: "A special family birthday greeting."
        },

        "dinand": {
            name: "Dinand",
            file: "dinand.mp4",
            message: "A birthday greeting from Dinand."
        },

        "glenda": {
            name: "Glenda",
            file: "glenda.mp4",
            message: "A birthday greeting from Glenda."
        },

        "akeisha-dance": {
            name: "Akiesha's Dance",
            file: "akeisha-dance.mp4",
            message: "A special dance for Uncle."
        },

        "vilma-santy": {
            name: "Vilma and Santy",
            file: "vilma-santy.mp4",
            message: "A birthday greeting from Vilma and Santy."
        },

        "nica": {
            name: "Nica",
            file: "nica.mp4",
            message: "A birthday greeting from Nica."
        },

        "aj": {
            name: "AJ",
            file: "aj.mp4",
            message: "A special birthday greeting from AJ."
        },

        "pauldhess-wife-son": {
            name: "Pauldhess, Wife and Son",
            file: "pauldhess-wife-son.mp4",
            message: "A special birthday greeting from the family."
        },


        /* =========================================
           CELEBRATION VIDEOS
           ========================================= */

        "birthday-food": {
            name: "Birthday Celebration",
            file: "birthday-food.mp4",
            message: "A little glimpse of the food and celebration prepared for Uncle's 93rd birthday."
        },

        "everyone-dancing": {
            name: "Everyone Dancing",
            file: "everyone-dancing.mp4",
            message: "Everyone enjoying the celebration together."
        },

        "before-birthday-celebration": {
            name: "Before the Birthday",
            file: "before-birthday-celebration.mp4",
            message: "A special moment before Uncle's actual birthday celebration."
        },

        "calling-uncle-after-eating-1": {
            name: "Calling Uncle After Eating",
            file: "calling-uncle-after-eating-1.mp4",
            message: "After eating, everyone called Uncle."
        },

        "calling-uncle-after-eating-2": {
            name: "Calling Uncle After Eating — Part 2",
            file: "calling-uncle-after-eating-2.mp4",
            message: "The family call continues."
        },

        "cousins-green-light": {
            name: "Uncle's Green Light",
            file: "cousins-green-light.mp4",
            message: "Sometimes, the best family memories start with one person saying, 'Go ahead!' Uncle supported our cousins' bonding, and this is one of the memories we made together."
        }
    };


    /* =========================================
       GET ELEMENTS
       ========================================= */

    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    const secretModal = document.getElementById("secretModal");
    const finalSurprise = document.getElementById("finalSurprise");


    /* =========================================
       OPEN VIDEO
       ========================================= */

    window.openVideo = function(key) {

        const video = videoData[key];

        if (!video) {
            console.error("Video not found:", key);
            return;
        }

        console.log("Opening video:", video.file);

        // Stop previous video
        modalVideo.pause();
        modalVideo.removeAttribute("src");
        modalVideo.load();

        // Update modal information
        modalTitle.textContent = video.name;
        modalMessage.textContent = video.message;

        // Set new video
        modalVideo.src = video.file;
        modalVideo.load();

        // Show modal
        videoModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Try to play
        const playPromise = modalVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented. User can press play.", error);
            });
        }

        playClick();
        createConfetti();
    };


    /* =========================================
       CLOSE VIDEO
       ========================================= */

    window.closeVideo = function() {

        if (!videoModal) return;

        modalVideo.pause();
        modalVideo.removeAttribute("src");
        modalVideo.load();

        videoModal.classList.remove("active");

        document.body.style.overflow = "";
    };


    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE MODAL
       ========================================= */

    if (videoModal) {

        videoModal.addEventListener("click", function(event) {

            if (event.target === videoModal) {
                closeVideo();
            }

        });
    }


    /* =========================================
       ESC KEY
       ========================================= */

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {

            closeVideo();

            if (secretModal) {
                secretModal.classList.remove("active");
            }

        }

    });


    /* =========================================
       VIDEO ERROR DETECTION
       ========================================= */

    if (modalVideo) {

        modalVideo.addEventListener("error", function() {

            console.error("VIDEO ERROR");
            console.error("File:", modalVideo.src);
            console.error("Error:", modalVideo.error);

        });

    }


    /* =========================================
       VIDEO LOADED
       ========================================= */

    if (modalVideo) {

        modalVideo.addEventListener("loadeddata", function() {

            console.log("Video successfully loaded:", modalVideo.src);

        });

    }


    /* =========================================
       CLICK SOUND
       ========================================= */

    function playClick() {

        try {

            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;

            const audioContext = new AudioContext();

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = "square";

            oscillator.frequency.setValueAtTime(
                500,
                audioContext.currentTime
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                900,
                audioContext.currentTime + 0.08
            );

            gainNode.gain.setValueAtTime(
                0.05,
                audioContext.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.12
            );

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.12
            );

        } catch (error) {

            console.log("Sound unavailable:", error);

        }

    }


    /* =========================================
       CONFETTI
       ========================================= */

    function createConfetti() {

        const canvas = document.getElementById("confettiCanvas");

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];

        for (let i = 0; i < 80; i++) {

            pieces.push({

                x: Math.random() * canvas.width,

                y: -20,

                size: Math.random() * 8 + 4,

                speed: Math.random() * 4 + 2,

                rotation: Math.random() * 360,

                rotationSpeed: Math.random() * 10 - 5

            });

        }

        let animationFrame;

        function animate() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            let activePieces = 0;

            pieces.forEach(piece => {

                if (piece.y < canvas.height + 20) {

                    activePieces++;

                    piece.y += piece.speed;

                    piece.rotation += piece.rotationSpeed;

                    ctx.save();

                    ctx.translate(
                        piece.x,
                        piece.y
                    );

                    ctx.rotate(
                        piece.rotation * Math.PI / 180
                    );

                    ctx.fillRect(
                        -piece.size / 2,
                        -piece.size / 2,
                        piece.size,
                        piece.size
                    );

                    ctx.restore();

                }

            });

            if (activePieces > 0) {

                animationFrame =
                    requestAnimationFrame(animate);

            } else {

                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

            }

        }

        cancelAnimationFrame(animationFrame);

        animate();

    }


    /* =========================================
       SECRET MESSAGE
       ========================================= */

    window.openSecret = function() {

        if (!secretModal) return;

        secretModal.classList.add("active");

        document.body.style.overflow = "hidden";

        playClick();
        createConfetti();

    };


    window.closeSecret = function() {

        if (!secretModal) return;

        secretModal.classList.remove("active");

        document.body.style.overflow = "";

    };


    /* =========================================
       FINAL SURPRISE
       ========================================= */

    window.showFinalSurprise = function() {

        if (!finalSurprise) return;

        finalSurprise.classList.add("active");

        playClick();
        createConfetti();

    };


    /* =========================================
       PAGE LOADING EFFECT
       ========================================= */

    const loadingScreen =
        document.getElementById("loadingScreen");

    const loadingProgress =
        document.getElementById("loadingProgress");

    if (loadingScreen) {

        let progress = 0;

        const loadingInterval = setInterval(() => {

            progress += Math.floor(
                Math.random() * 12
            ) + 5;

            if (progress >= 100) {

                progress = 100;

                clearInterval(loadingInterval);

                setTimeout(() => {

                    loadingScreen.classList.add("hidden");

                }, 500);

            }

            if (loadingProgress) {

                loadingProgress.style.width =
                    progress + "%";

            }

        }, 150);

    }


    /* =========================================
       FAKE SYSTEM ERROR
       ========================================= */

    const errorScreen =
        document.getElementById("errorScreen");

    const revealScreen =
        document.getElementById("revealScreen");

    const startButton =
        document.getElementById("startButton");

    if (startButton) {

        startButton.addEventListener(
            "click",
            function() {

                if (errorScreen) {

                    errorScreen.classList.add("active");

                }

                playClick();

            }
        );

    }


    /* =========================================
       REVEAL BUTTON
       ========================================= */

    const revealButton =
        document.getElementById("revealButton");

    if (revealButton) {

        revealButton.addEventListener(
            "click",
            function() {

                if (errorScreen) {

                    errorScreen.classList.remove("active");

                }

                if (revealScreen) {

                    revealScreen.classList.add("active");

                }

                playClick();
                createConfetti();

            }
        );

    }


    /* =========================================
       COUNTDOWN
       ========================================= */

    const countdown =
        document.getElementById("countdown");

    const mainContent =
        document.getElementById("mainContent");

    if (countdown) {

        let number = 5;

        const countdownInterval =
            setInterval(() => {

                countdown.textContent = number;

                playClick();

                number--;

                if (number < 0) {

                    clearInterval(
                        countdownInterval
                    );

                    countdown.style.display =
                        "none";

                    if (mainContent) {

                        mainContent.classList.add(
                            "active"
                        );

                    }

                    createConfetti();

                }

            }, 1000);

    }


    /* =========================================
       WINDOW RESIZE
       ========================================= */

    window.addEventListener(
        "resize",
        function() {

            const canvas =
                document.getElementById(
                    "confettiCanvas"
                );

            if (!canvas) return;

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;

        }
    );


    console.log(
        "Uncle 93 Family Surprise loaded successfully."
    );

    console.log(
        "Total videos:",
        Object.keys(videoData).length
    );

});
