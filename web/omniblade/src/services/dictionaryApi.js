const DICTIONARY_API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

const getMeaning = async (word) => {
	try {
		const url = `${DICTIONARY_API_URL}${word}`;

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

export default getMeaning;
