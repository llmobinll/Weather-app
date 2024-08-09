const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "91aaf13f8d031b51cc1987c0d26cb5b4";

const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".submit");
const cityName = document.querySelector(".name");
const temp = document.querySelector(".temp");
const cloud = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const getWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const renderCurrentWeather = (data) => {
  temp.innerText = Math.round(data.main.temp) + "\u00B0";
  cloud.innerText = data.clouds.all + "%";
  humidity.innerText = data.main.humidity + "%";
  wind.innerText = data.wind.speed + "km/h";
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
