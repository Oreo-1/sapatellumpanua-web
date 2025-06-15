document.addEventListener("DOMContentLoaded", function () {

    // navbar logic
    const navbar = document.querySelector(".navbar");

    // Make navbar visible by default
    if (navbar) {
        navbar.style.opacity = "1";
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // change text logic
    const texts = [' Benua', ' Dusun', ' Bukit'];

    let index = 0;
    const textElement = document.getElementById('changing-text');

    setInterval(() => {
        // First make it exit
        textElement.classList.remove('enter');
        textElement.classList.add('exit');

        // After exit, change the text and enter
        setTimeout(() => {
            index = (index + 1) % texts.length;
            textElement.textContent = texts[index];
            textElement.classList.remove('exit');
            textElement.classList.add('enter');
        }, 500);
    }, 2000);

    // gallery logic
    document.addEventListener("DOMContentLoaded", function () {
        var grid = document.querySelector('.masonry-row'); // Your grid wrapper

        // Wait until all images are loaded
        imagesLoaded(grid, function () {
            // Initialize Masonry after images are fully loaded
            new Masonry(grid, {
                itemSelector: '.masonry-item',
                columnWidth: '.masonry-item',
                percentPosition: true
            });
        });
    });

    // 360 modal logic
    document.querySelectorAll(".scene-thumb").forEach((img) => {
        img.addEventListener("click", function () {
            const sceneSrc = this.getAttribute("data-scene");
            const sky = document.querySelector("#sky360");
            const modalElement = document.getElementById("sceneModal");

            if (sky && modalElement) {
                sky.setAttribute("src", sceneSrc);

                const modal = new bootstrap.Modal(modalElement);
                modal.show();

                // Refresh A-Frame scene on modal shown
                modalElement.addEventListener(
                    "shown.bs.modal",
                    () => {
                        const scene = document.querySelector("a-scene");
                        if (scene && scene.resize) {
                            scene.resize();
                        }
                    },
                    { once: true }
                );

                // Cleanup modal artifacts when hidden
                modalElement.addEventListener(
                    "hidden.bs.modal",
                    () => {
                        document.body.classList.remove("modal-open");
                        document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
                    },
                    { once: true }
                );
            }
        });
    });
});
