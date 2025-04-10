const RSS_URL = "https://calendar.google.com/calendar/ical/266297%40student.pwr.edu.pl/public/basic.ics";

async function fetchRSS() {
    try {
        const response = await fetch(RSS_URL);
        const text = await response.text();
        console.log(text); // Sprawdź dane w konsoli
    } catch (error) {
        console.error("Błąd podczas pobierania RSS:", error);
    }
}

fetchRSS();
