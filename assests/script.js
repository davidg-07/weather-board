const searchBtnEl = document.getElementById("btn-search");
const inputEl = document.getElementById('input-city');
const apikey = '7c076ebdc9171cc941023949cd3161e3';

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
            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&units=imperial&exclude=minutely,hourly&appid=${apikey}`;
            fetch(weatherUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const daily = data.daily;
                    document.getElementById("city-name").innerText = cityname + ' ' + moment.unix(daily[0].dt).format('MM/DD/YY');
                    document.getElementById("span-temp").innerText = data?.current?.temp + " F";
                    document.getElementById("span-wind").innerText = data?.current?.wind_speed + " MPH";
                    document.getElementById("span-hum").innerText = data?.current?.humidity + " %";
                    document.getElementById("span-uv").innerText = data?.current?.uvi;
                    document.getElementById("img-icon").src = `https://openweathermap.org/img/w/${data?.current?.weather[0]?.icon}.png`;
                    uviColor(data);
                    fiveDayForecast(data);
                });
        })
        .catch(err => console.error(err));
}

// getting fivedayforecast 
function fiveDayForecast(data) {
    for (i = 0; i <= 4 ; i++) {
        const daily = data.daily;
        console.log(daily);
        const forecastEl = document.getElementById("forecast-section");
        const divEl = document.createElement("div");
        divEl.setAttribute("id", i);
        divEl.setAttribute("class", "card");
        const dateEl = document.createElement("p");
        dateEl.innerText = moment.unix(daily[i].dt).format('MM/DD/YY');
        const image = document.createElement('img')
        image.src = "https://openweathermap.org/img/w/" + iconPic + ".png";
        const iconPic = data.daily[i].weather[0].icon;
        const tempEl = document.createElement("p");
        tempEl.innerText = "temp: " + daily[i].temp.day + " F";
        const windEl = document.createElement("p");
        windEl.innerText = "Wind: " + daily[i].wind_speed
        + " MPH";
        const humidityEl = document.createElement("p");
        humidityEl.innerText = "Humidity: " + daily[i].humidity
        + " %";
        divEl.appendChild(dateEl);
        divEl.appendChild(iconPic)
        divEl.appendChild(tempEl);
        divEl.appendChild(windEl);
        divEl.appendChild(humidityEl);
        forecastEl.appendChild(divEl);
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