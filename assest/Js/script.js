const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "91aaf13f8d031b51cc1987c0d26cb5b4";

const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".submit");
const cityName = document.querySelector(".name");
const temp = document.querySelector(".temp");
const cloud = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const condition = document.querySelector(".condition");
const cities = document.querySelectorAll(".city");
const getWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const displayLocalTime = (latitude, longitude) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        const localTime = new Date(
          (timestamp + data.dstOffset + data.rawOffset) * 1000
        );
      }
    });
  console.log(localTime);
};

const renderCurrentWeather = (data) => {
  temp.innerText = Math.round(data.main.temp) + "\u00B0";
  cloud.innerText = data.clouds.all + "%";
  humidity.innerText = data.main.humidity + "%";
  wind.innerText = data.wind.speed + "km/h";
  condition.innerText = data.weather[0].description;
  const { lat, lon } = data.coord;
  displayLocalTime(lat, lon);
  console.log(data);
};

const searchHandler = async () => {
  const citySearch = searchInput.value;
  if (!citySearch) {
    alert("Please enter city name");
  } else {
    function capitalizeFirstLetter(string) {
      return string.replace(/^\w/, (match) => match.toUpperCase());
    }
    const capitalizedString = capitalizeFirstLetter(citySearch);
    cityName.innerText = capitalizedString;
  }
  const currentData = await getWeatherByName(citySearch);

  renderCurrentWeather(currentData);
};

searchButton.addEventListener("click", searchHandler);
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    searchInput.value = city.innerText;
  });
});
