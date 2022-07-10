const searchBtnEl = document.getElementById("btn-search");
const inputEl = document.getElementById('input-city');
const apikey = '7c076ebdc9171cc941023949cd3161e3'

searchBtnEl.addEventListener('click', function () {
    console.log('hello all' + inputEl.value);

    getGeoLocation(inputEl.value)
});

// calling data from requested location
function getGeoLocation(cityname) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${apikey}`;
    fetch(geoUrl)
        .then(res => res.json())
        .then(geoData => {
            console.log('data: ', geoData);
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&units=imperial&appid=${apikey}`;
            fetch(weatherUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("city-name").innerText = cityname;
                    document.getElementById("span-temp").innerText = data?.current?.temp + " F";
                    document.getElementById("span-wind").innerText = data?.current?.wind_speed + " MPH";
                    document.getElementById("span-hum").innerText = data?.current?.humidity + " %";
                    document.getElementById("span-uv").innerText = data?.current?.uvi;
                    document.getElementById("img-icon").src = `https://openweathermap.org/img/w/${data?.current?.weather[0]?.icon}.png`;
                    uviColor(data);
                });
        })
        .catch(err => console.error(err));
}

function fiveDayForecast(data) {
    for (i = 0; i < data.daily.length; i++) {
        let daily = data.daily[i];
        let dailyDescription = daily.weather[0].description;
        let dailyTempMin = daily.temp.day.wind_speed.humidity;
    }
}

function uviColor(data) {
    let uvIndex = document.getElementById("span-uv");
    let uvi = data.current.uvi;
    // Low UV
    if (uvi <= 3) {
        uvIndex.style.backgroundColor = "green";
        uvIndex.style.color = "white";
        uvIndex.style.width = "10rem";
    }
    // Moderate UV
    if (uvi > 3 && uvi <= 6) {
        uvIndex.style.backgroundColor = "yellow";
        uvIndex.style.color = "black";
        uvIndex.style.width = "10rem";
    }
    // High UV
    if (uvi > 6) {
        uvIndex.style.backgroundColor = "red";
        uvIndex.style.color = "white";
        uvIndex.style.width = "10rem";
    }
  }