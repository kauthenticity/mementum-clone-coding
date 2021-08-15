const weather = document.querySelector('.weather');
const weather_icon = weather.querySelector('#weather_icon');
const temperature = weather.querySelector('#temperature');
const city_name = weather.querySelector('#city_name');


const API_KEY = '194bda66412202a3ac76cc100fb66424';
const COORDS = "coords";

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  .then((res)=>{
    return res.json();
  }).then((json)=>{
    var temp = +(Math.round(json.main.temp/10 + "e+2")  + "e-2");
    const place = json.name;
    const icon = json.weather[0].icon;

    weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" / width="50">`;
    temperature.innerText = temp;
    city_name.innerText = place;

    weather_icon.appendChild(temperature);
    weather.appendChild(weather_icon);
    weather.appendChild(city_name);
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
}

function handleGeoError(){
  console.log('Not allowed');
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }
  else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();