const searchBtnEl = document.getElementById("btn-search");
const inputEl = document.getElementById('input-city');
const apikey = '7c076ebdc9171cc941023949cd3161e3'

searchBtnEl.addEventListener('click', function(){   
    console.log('hello all' + inputEl.value);
    // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`;
    getGeoLocation(inputEl.value)
});

function getGeoLocation(cityname) {
    const apiurl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${apikey}`;
    fetch(apiurl).then(function(res){
        return res.json();
    }).then(function(data){
        console.log('data: ', data)
    }); 
}
