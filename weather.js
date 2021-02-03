const weatherShow = document.querySelector(".js-weather");
const a = "";

function getLatLon() {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const latLonObj = {
      LAT: lat,
      LON: lon,
    };
    localStorage.setItem("GEO", JSON.stringify(latLonObj));
    printWeather(lat, lon);
  });
}

async function printWeather(lat, lon) {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${a}`;
  const loadWeatherObj = await (await fetch(api_url)).json();
  const placeNow = loadWeatherObj.name;
  const temperatureNow = parseInt(loadWeatherObj.main.temp - 273.15);
  const weatherNow = loadWeatherObj.weather[0].main;
  weatherShow.innerHTML = `${placeNow}<br>${temperatureNow}℃ ${weatherNow}`;
}

function loadWeather() {
  const loadLatLon = localStorage.getItem("GEO");

  if (loadLatLon) {
    const lat_lon = JSON.parse(loadLatLon);
    let lat = lat_lon["LAT"];
    let lon = lat_lon["LON"];
    printWeather(lat, lon);
  } else {
    getLatLon();
  }
}

function init() {
  loadWeather();
}

init();
