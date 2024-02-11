function getWeather(latitude, longitude) {
    const apiKey = "ff32ef96e13a598c8668c6353b80e1e3";
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;
    //weather form
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            const description = data.weather[0].description;
            const tempC = (data.main.temp - 273.15).toFixed(2);
            const tempF = ((tempC * 9/5) + 32).toFixed(2); 

            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const icon = data.weather[0].icon;

            const weatherDiv = document.getElementById("weather-data");
            weatherDiv.innerHTML = `
                <h2>Weather information: </h2>
                <p><b>location:</b> ${city}</p>
                <p><b>Weather:</b> ${description}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" />
                <p><b>Celsius temperature:</b> ${tempC}°C</p>
                <p><b>Fahrenheit temperature:</b> ${tempF}°C</p>
                <p><b>Humidity:</b> ${humidity}%</p>
                <p><b>Wind speed:</b> ${windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error("API error：", error);
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        const x = document.getElementById("weather");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const x = document.getElementById("weather");
    //Initial weather
    getWeather(position.coords.latitude, position.coords.longitude);
    //Initial map
    initMap(position.coords.latitude, position.coords.longitude);
}

window.onload = getLocation;


let map;

        function initMap(lati, longi) {
            const mapOptions = {
                center: { lat: lati, lng: longi },
                zoom: 10,
            };
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            const input = document.getElementById('address');
            const autocomplete = new google.maps.places.Autocomplete(input);
        }

        function geoCodeAddress() {
            const address = document.getElementById("address").value;
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBap6hHqVZtXGgmTgYXdUcYMtvucDmH7nY`)
                .then(response => response.json())
                .then(data => {
                    const location = data.results[0].geometry.location;
                    map.setCenter(new google.maps.LatLng(location.lat, location.lng));
                    //Change weather
                    getWeather(location.lat, location.lng);
                })
                .catch(error => {
                    console.error("Geocoding 请求失败：", error);
                });
        }
function start()
{
    alert("start");
}

function getFrank(){
    alert("start");
    const apiUrl="https://api.frankfurter.app/latest";
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const amount = data.amount;
            const base = data.base;
            const date = data.date;
            const rateAUD = data.rates.AUD; 

            const frankDiv = document.getElementById("frank");
            frankDiv.innerHTML = `
                <h2>Weather information: </h2>
                <p><b>location:</b> ${amount}</p>
                <p><b>Weather:</b> ${base}</p>
                <p><b>Humidity:</b> ${date}%</p>
                <p><b>Wind speed:</b> ${rateAUD} m/s</p>
            `;
        })
        .catch(error => {
            console.error("API error：", error);
        });
    
}