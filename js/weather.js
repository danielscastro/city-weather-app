const APIKey = 'nVbJ0HNuWQe2fqBfwVAIGyqHUKKJu8Lf';
const baseUrl = 'http://dataservice.accuweather.com';

const getCityUrl = cityName => `${baseUrl}/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`;
const getWeatherUrl = cityKey => `${baseUrl}/currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`;
const getForecastUrl = cityKey => `${baseUrl}/forecasts/v1/daily/1day/${cityKey}?apikey=${APIKey}&language=pt-br`;

const fetchData = async url => {
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error('Não foi possível alcançar os dados requisitados.');
        }

        return response.json();
    } catch (error) {
        return alert(`${error.title}: ${error.message}`);
    }
}

const getCityData = cityName => fetchData(getCityUrl(cityName));
const getCityWeather = cityKey => fetchData(getWeatherUrl(cityKey));
const getCityForecast = cityKey => fetchData(getForecastUrl(cityKey));
