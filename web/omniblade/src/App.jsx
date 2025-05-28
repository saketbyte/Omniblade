import React from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

const App = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		window.addEventListener("keydown", handleShortcut);
		return () => {
			window.removeEventListener("keydown", handleShortcut);
		};
	}, []);

	const handleShortcut = (e) => {
		if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "q") {
			setVisible((prev) => !prev);
		}
	};

	if (!visible) return null;
	return (
		<div className='w-[500px] h-[500px] flex flex-col '>
			<Body setVisible={setVisible} />
			<Footer />
		</div>
	);
};

export default App;
