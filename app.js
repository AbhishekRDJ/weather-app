const search = document.querySelector('.container input');
const btn = document.querySelector('.container .fa-solid.fa-magnifying-glass');

const apikey = 'ac721d649eebeffab0bc177b8f095bbb';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#humidity_val").innerHTML = data.main.humidity + "%";
        document.querySelector("#Wind_speed").innerHTML = data.wind.speed + "Km/h";

        // Update the weather icon based on the weather condition
        updateWeatherIcon(data.weather[0].main);

        console.log(data);
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        alert("City not found or network error. Please try again.");
    }
}

function updateWeatherIcon(condition) {
    const weatherIcon = document.querySelector('.temp i');

    switch (condition) {
        case 'Clear':
        case 'Sun':
        case 'Sunny':
            weatherIcon.className = 'fa-solid fa-sun';
            break;
        case 'Clouds':
        case 'Haze':
        case 'Fog':
        case 'Mist':
        case 'Smoke':
        case 'Dust':
        case 'Sand':
            weatherIcon.className = 'fa-solid fa-cloud-sun';
            break;
        case 'Drizzle':
        case 'Rain':
        case 'Snow':
            weatherIcon.className = 'fa-solid fa-cloud-showers-heavy';
            break;
        case 'Tornado':
            weatherIcon.className = 'fa-solid fa-tornado';
            break;
        default:
            weatherIcon.className = 'fa-solid fa-sun'; // Default to sun icon if unknown
    }
}

function fetchWeather() {
    const city = search.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
}

btn.addEventListener("click", fetchWeather);

search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});
    