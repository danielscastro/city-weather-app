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

const getTimeIcon = weatherIcon => `<img src="./src/icons/${WeatherIcon}.svg">`;

const unhideCard = () => {
  if(cityWeatherCard.classList.contains('d-none')) {
    cityWeatherCard.classList.remove('d-none');
  }
}

formChangeCity.addEventListener('submit', async event => {
    event.preventDefault();

    searchedCity = event.target.city.value;

    [{ Key, LocalizedName }] = await getCityData(searchedCity);
    [{ IsDayTime, WeatherText, Temperature, WeatherIcon }] = await getCityWeather(Key);
    forecast = await getCityForecast(Key);

    dayOrNightImg.src = chooseDayOrNightImg(IsDayTime);
    timeIconContainer.innerHTML = getTimeIcon(WeatherIcon);
    weatherForecastText.innerHTML = forecast.Headline.Text;
    cityName.textContent = LocalizedName;
    cityWeather.textContent = WeatherText;
    cityTemperature.textContent = Temperature.Metric.Value;

    unhideCard();

    formChangeCity.reset();
})
