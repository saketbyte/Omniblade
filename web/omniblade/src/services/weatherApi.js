const APIKEY = import.meta.env.VITE_API_KEY;

const WEATHER_API_URL = `http://api.weatherapi.com/v1/forecast.json`;

const getWeather = async (location) => {
	try {
		const url = `${WEATHER_API_URL}?key=${APIKEY}&q=${location}&aqi=no&days=4`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const weatherData = await response;
		console.log(weatherData);
		return weatherData.json();
	} catch (error) {
		console.error("Error fetching weather data:", error);
		throw error;
	}
};

export default getWeather;
