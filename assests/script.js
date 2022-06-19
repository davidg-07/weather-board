const searchBtnEl = document.getElementById("btn-search");
const inputEl = document.getElementById('input-city');
const apikey = '7c076ebdc9171cc941023949cd3161e3'

searchBtnEl.addEventListener('click', function () {
    console.log('hello all' + inputEl.value);

    getGeoLocation(inputEl.value)
});

function getGeoLocation(cityname) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${apikey}`;
    fetch(geoUrl)
        .then(res => res.json())
        .then(geoData => {
            console.log('data: ', geoData);
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`;
            fetch(weatherUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("city-name").innerText = cityname;
                    document.getElementById("span-temp").innerText = data?.current?.temp;
                    document.getElementById("span-wind").innerText = data?.current?.wind_speed;
                    document.getElementById("span-hum").innerText = data?.current?.humidity;
                    document.getElementById("span-uv").innerText = data?.current?.uvi;
                    document.getElementById("img-icon").src = `https://openweathermap.org/img/w/${data?.current?.weather[0]?.icon}.png`;
                });
        })
        .catch(err => console.error(err));
}
