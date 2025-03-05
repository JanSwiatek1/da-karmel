async function fetchImages() {
    try {
        const response = await fetch("images.php"); // Pobieramy listę zdjęć z PHP
        const images = await response.json();
        createGallery(images);
    } catch (error) {
        console.error("Błąd podczas ładowania zdjęć:", error);
    }
}

function createGallery(images) {
    const gallery = document.getElementById("gallery");

    if (images.length === 0) {
        gallery.innerHTML = "<p>Brak zdjęć w folderze!</p>";
        return;
    }

    const title = document.createElement("h2");
    title.textContent = "Galeria";
    gallery.appendChild(title);

    const container = document.createElement("div");
    container.classList.add("gallery-container");

    const leftArrow = document.createElement("span");
    leftArrow.classList.add("arrow");
    leftArrow.innerHTML = "&#10094;";

    const wrapper = document.createElement("div");
    wrapper.classList.add("gallery-wrapper");

    const track = document.createElement("div");
    track.classList.add("gallery-track");
    let currentIndex = 0;

    images.forEach((image, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("gallery-item");
        if (index === 0) imgContainer.classList.add("active");

        const img = document.createElement("img");
        img.src = image;
        img.alt = "Zdjęcie";

        imgContainer.appendChild(img);
        track.appendChild(imgContainer);
    });

    wrapper.appendChild(track);
    container.appendChild(leftArrow);
    container.appendChild(wrapper);

    const rightArrow = document.createElement("span");
    rightArrow.classList.add("arrow");
    rightArrow.innerHTML = "&#10095;";
    container.appendChild(rightArrow);

    gallery.appendChild(container);

    function updateGallery() {
        const items = track.querySelectorAll(".gallery-item");
        items.forEach((item, index) => {
            item.classList.remove("active");
        });
        items[currentIndex].classList.add("active");

        const offset = -(currentIndex * 130) + 200;
        track.style.transform = `translateX(${offset}px)`;
    }

    function moveSlide(direction) {
        const items = track.querySelectorAll(".gallery-item");
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }

        updateGallery();
    }

    leftArrow.onclick = () => moveSlide(-1);
    rightArrow.onclick = () => moveSlide(1);

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            moveSlide(-1);
        } else if (event.key === "ArrowRight") {
            moveSlide(1);
        }
    });

    updateGallery();
}

// Wywołujemy funkcję po załadowaniu strony
document.addEventListener("DOMContentLoaded", fetchImages);
