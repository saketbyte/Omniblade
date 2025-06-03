import Clipboard from "../features/clipboard/Clipboard";
import Dictionary from "../features/dictionary/Dictionary";
import Search from "../features/search/Search";
import WikipediaSearch from "../features/Wiki/WikipediaSearch";
import Calculator from "../features/Calculator/Calculator";
import getWeather from "../services/weatherApi";
import { useState, useEffect } from "react";
import TodoBrutal from "../features/ToDo/Todo";
import GeminiTextGenerator from "../features/Gemini/Gemini";

// weather.forecast.forecastday.map((obj) => obj.day.avgtemp_c).join("°C, ")
const Body = ({ setVisible }) => {
	const [currentTab, setCurrentTab] = useState("Clipboard");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState(null);

	const handleClick = (tab) => {
		setCurrentTab(tab);
	};

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				if (!location) return;
				const data = await getWeather(location);
				setWeather(data);
				console.log(data);
			} catch (err) {
				setError({ error: err.message });
				console.log(error);
			}
		};

		fetchWeather();
	}, [location]);

	return (
		<div className='w-[590px] h-[576px] mx-auto bg-[#f5f5f5] border border-black shadow-xl flex flex-col overflow-hidden'>
			{/* Header */}
			<header
				className='
    neobrutal p-2 border-b border-black
    grid grid-rows-2 grid-cols-12 gap-2
  '>
				{/*** Row 1: Title | Input | Search | Minimize ***/}
				<p className='title align-middle justify-self-center col-span-3 row-start-1 text-xs'>Omniblade</p>

				<input
					type='text'
					placeholder='Enter city'
					className=' weather-search
                        col-span-4 row-start-1
                        bg-white border-2 border-black text-[6px] rounded-sm
                        focus:outline-none focus:shadow-[3px_3px_0px_0px_black]
                        w-3/4 p-1'
				/>

				<button className='weather-button btn-brutal col-span-1 row-start-1' onClick={() => setLocation(document.querySelector("input").value)}>
					🔍
				</button>
				{weather && (
					<p className='col-span-3 row-start-1 text-xs font-medium text-[3px]'>
						Temp: {weather.forecast.forecastday[0].day.avgtemp_c}°C Rain: {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
					</p>
				)}

				{/*** Row 2: Tabs spanning full width ***/}
				<div className='col-span-12 row-start-2 flex flex-wrap gap-2 justify-center'>
					{["Clip", "Gemini", "ToDo", "Calc", "Word", "Search", "Wiki"].map((tab) => (
						<button key={tab} className='btn-brutal text-xs px-3 py-1' onClick={() => handleClick(tab)}>
							{tab === "YoutubeSummary" ? "YT Summary" : tab}
						</button>
					))}
				</div>
			</header>

			{/* Body */}
			<main className='grow mt-2 overflow-auto'>
				<div className='flex justify-center '>
					{currentTab === "Clip" && <Clipboard />}
					{currentTab === "Gemini" && <GeminiTextGenerator />}
					{currentTab === "Calc" && <Calculator />}
					{currentTab === "Word" && <Dictionary />}
					{currentTab === "Wiki" && <WikipediaSearch />}
					{currentTab === "Search" && <Search />}
					{currentTab === "ToDo" && <TodoBrutal />}
				</div>
			</main>
		</div>
	);
};

export default Body;
