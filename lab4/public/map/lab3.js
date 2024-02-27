function fetchAndDisplayWeather(city) {
    fetch(`http://localhost:3000/weather/${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => {
        fetch('http://localhost:3000/addHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cityName: city, weatherData: data }),
        })
        .then(historyResponse => {
            if (!historyResponse.ok) {
                throw new Error('Failed to add history record');
            }
            return historyResponse.json();
        })
        .then(historyData => {
            console.log('History record added:', historyData);
        })
        .catch(historyError => {
            console.error('Error adding history record:', historyError);
        });
        const rightRightDiv = document.getElementById('weather-map');
            
        const weatherInfo = document.createElement('p');
        const temp = data.main.temp * 1.8 - 459.67;
        weatherInfo.textContent = `Temperature: ${temp.toFixed(2)}°F`;
        console.log('Fetching weather for:', city); 

        rightRightDiv.innerHTML = '';
        rightRightDiv.appendChild(weatherInfo);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('fetchWeatherButton');
    button.addEventListener('click', function() {
        const city = document.getElementById('cityName').value;
        fetchAndDisplayWeather(city);
    });
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15, 
        center: {lat: 42.7302, lng: -73.6788} 
    });

    var geocoder = new google.maps.Geocoder();

    document.getElementById('fetchWeatherButton').addEventListener('click', function() {
        geocodeAndDisplayMap(geocoder, map);
    });
}

function geocodeAndDisplayMap(geocoder, map) {
    var city = document.getElementById('cityName').value;
    geocoder.geocode({'address': city}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

document.getElementById('deleteAllHistory').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all history records? This action cannot be undone.')) {
        fetch('/deleteHistory', {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('All history records have been successfully deleted.');
            } else {
                alert('Failed to delete history records.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});