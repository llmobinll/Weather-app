const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".submit");

const searchHandler = () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("Please enter city name");
  }
};

searchButton.addEventListener("click", searchHandler);
