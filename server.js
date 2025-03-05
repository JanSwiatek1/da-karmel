const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Ustawienie folderu publicznego (dla HTML, CSS, JS, obrazów)
app.use(express.static("src"));

// Endpoint do pobierania listy zdjęć dla danego wyjazdu
app.get("/api/images/:trip", (req, res) => {
    const trip = req.params.trip;
    const directoryPath = path.join(__dirname, "src/images/wyjazdy", trip);

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Nie znaleziono zdjęć" });
        }

        // Tworzymy pełne ścieżki do obrazów
        const images = files.map(file => `/images/wyjazdy/${trip}/${file}`);
        res.json({ images });
    });
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
