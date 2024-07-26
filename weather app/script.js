document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f8ac8a673621acb966961175f272100c'; 
    const weatherInfoDiv = document.getElementById('weather-info');
    const getWeatherButton = document.getElementById('get-weather');
    const locationInput = document.getElementById('location');

    
    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        }
    });

    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherDataByCoordinates(lat, lon);
        });
    } else {
        weatherInfoDiv.innerHTML = 'Geolocation is not supported by this browser.';
    }

    function fetchWeatherData(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function fetchWeatherDataByCoordinates(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            weatherInfoDiv.innerHTML = `
                <div class="weather-info-item">Temperature: ${temperature} °C</div>
                <div class="weather-info-item">Description: ${description}</div>
                <div class="weather-info-item">Humidity: ${humidity}%</div>
                <div class="weather-info-item">Wind Speed: ${windSpeed} m/s</div>
            `;
        } else {
            weatherInfoDiv.innerHTML = 'Location not found. Please try again.';
        }
    }
});
