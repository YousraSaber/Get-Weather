document.getElementById('fetchWeatherBtn').addEventListener('click', function() {
    // Check if the browser supports Geolocation
    if (navigator.geolocation) {
        // user's current position
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeather(latitude, longitude);
        }, function(error) {
            console.error('Error getting location:', error);
            document.getElementById('weather').innerHTML = 'Unable to retrieve your location.';
        });
    } else {
        document.getElementById('weather').innerHTML = 'Geolocation is not supported by this browser.';
    }
});

function fetchWeather(latitude, longitude) {
    const apiKey = '552e7e9d7b5148cba00155304241907'; 
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
    
    // Use AJAX to fetch weather data
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayWeather(data);
        } else {
            console.error('Failed to fetch weather data:', xhr.statusText);
            document.getElementById('weather').innerHTML = 'Failed to fetch weather data.';
        }
    };
    xhr.onerror = function() {
        console.error('Request error...');
        document.getElementById('weather').innerHTML = 'Request error.';
    };
    xhr.send();
}

function displayWeather(data) {
    const location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
    const temperature = data.current.temp_c + '°C';
    const condition = data.current.condition.text;
    const icon = "https:" + data.current.condition.icon; // ✅ تم إصلاح الرابط

    document.getElementById('weather').innerHTML = `
        <h2>Weather in ${location}</h2>
        <p>Temperature: ${temperature}</p>
        <p>Condition: ${condition}</p>
        <img src="${icon}" alt="${condition}">
    `;
}

