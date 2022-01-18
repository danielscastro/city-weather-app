const formChangeCity = document.querySelector('[data-js="change-location"]');
const cityName = document.querySelector('[data-js="city-name"]');
const cityWeather = document.querySelector('[data-js="city-weather"]');
const cityTemperature = document.querySelector('[data-js="city-temperature"]');
const dayOrNightImg = document.querySelector('[data-js="time"]');
const cityWeatherCard = document.querySelector('[data-js="card"]');
const timeIconContainer = document.querySelector('[data-js="time-icon"]');
const weatherForecastText = document.querySelector('[data-js="weather-forecast-text"]');

const chooseDayOrNightImg = isDayTime => isDayTime
  ? './src/day.svg'
  : './src/night.svg';

const getTimeIcon = weatherIcon => `<img src="./src/icons/${weatherIcon}.svg">`;

const unhideCard = () => {
  if(cityWeatherCard.classList.contains('d-none')) {
    cityWeatherCard.classList.remove('d-none');
  }
}

const storeLastCity = searchedCity => localStorage.setItem('lastCity', searchedCity);

const showCityWeatherInfo = async searchedCity => {
  const [{ Key, LocalizedName }] = await getCityData(searchedCity);
  const [{ IsDayTime, WeatherText, Temperature, WeatherIcon }] = await getCityWeather(Key);
  const { Headline } = await getCityForecast(Key);

  dayOrNightImg.src = chooseDayOrNightImg(IsDayTime);
  timeIconContainer.innerHTML = getTimeIcon(WeatherIcon);
  weatherForecastText.innerHTML = Headline.Text;
  cityName.textContent = LocalizedName;
  cityWeather.textContent = WeatherText;
  cityTemperature.textContent = Temperature.Metric.Value;

  unhideCard();
}

const showCityWeatherCard = event => {
    event.preventDefault();

    searchedCity = event.target.city.value;

    showCityWeatherInfo(searchedCity);

    formChangeCity.reset();

    storeLastCity(searchedCity);
}

const verifyLastCity = () => {
  const lastCity = localStorage.getItem('lastCity');
  if(lastCity) {
    showCityWeatherInfo(lastCity);
  }
}

verifyLastCity();
formChangeCity.addEventListener('submit', showCityWeatherCard);
