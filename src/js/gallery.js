const trips = ["bialy-dunajec-2024", "bialy-dunajec-2023", "kdm-2024", "kdm-2023", "sylwester-2024", "sylwester-2023"];

async function fetchImages(trip) {
    try {
        const response = await fetch(`/api/images/${trip}`);
        const data = await response.json();
        createGallery(trip, data.images);
    } catch (error) {
        console.error(`Błąd podczas ładowania zdjęć dla ${trip}:`, error);
    }
}

function createGallery(trip, images) {
    const gallery = document.getElementById("gallery");

    const title = document.createElement("h2");
    title.classList.add("center-h2");
    title.style.cssText = `
    display: flex;
    justify-content: center;
    margin-top: 30px;`;
    title.textContent = trip.replace(/-/g, " ").toUpperCase();
    gallery.appendChild(title);

    const container = document.createElement("div");
    container.classList.add("gallery-container");

    const leftArrow = document.createElement("span");
    leftArrow.classList.add("arrow", "left-arrow");
    leftArrow.innerHTML = "&#10094;";

    const wrapper = document.createElement("div");
    wrapper.classList.add("gallery-wrapper");

    const track = document.createElement("div");
    track.classList.add("gallery-track");

    // Tworzymy zapętloną kolejkę zdjęć
    const firstClone = images[0]; // Pierwsze zdjęcie
    const lastClone = images[images.length - 1]; // Ostatnie zdjęcie
    const loopedImages = [lastClone, ...images, firstClone];

    let currentIndex = 1; // Startujemy od pierwszego prawdziwego zdjęcia

    loopedImages.forEach((image, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("gallery-item");

        if (index === currentIndex) imgContainer.classList.add("active");

        const img = document.createElement("img");
        img.src = image;
        img.alt = `Zdjęcie z ${trip}`;

        imgContainer.appendChild(img);
        track.appendChild(imgContainer);
    });

    wrapper.appendChild(track);
    container.appendChild(leftArrow);
    container.appendChild(wrapper);

    const rightArrow = document.createElement("span");
    rightArrow.classList.add("arrow", "right-arrow");
    rightArrow.innerHTML = "&#10095;";
    container.appendChild(rightArrow);

    gallery.appendChild(container);

    function updateGallery() {
        const items = track.querySelectorAll(".gallery-item");
    const itemWidth = items[0].offsetWidth + 20; // 🔹 Pobiera rzeczywistą szerokość + odstęp

    items.forEach((item) => item.classList.remove("active"));
    items[currentIndex].classList.add("active");

    const offset = -(currentIndex * itemWidth) + (wrapper.offsetWidth / 2 - itemWidth / 2);
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${offset}px)`;
    }

    function moveSlide(direction) {
        const items = track.querySelectorAll(".gallery-item");

        currentIndex += direction;
        updateGallery();

        setTimeout(() => {
            if (currentIndex >= items.length - 1) {
                currentIndex = 1;
                track.style.transition = "none";
                updateGallery();
            } else if (currentIndex <= 0) {
                currentIndex = items.length - 2;
                track.style.transition = "none";
                updateGallery();
            }
        }, 500); // Po zakończeniu animacji resetujemy index
    }

    leftArrow.onclick = () => moveSlide(-1);
    rightArrow.onclick = () => moveSlide(1);

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") moveSlide(-1);
        else if (event.key === "ArrowRight") moveSlide(1);
    });

    updateGallery();
}

trips.forEach(fetchImages);
