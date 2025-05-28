import React from "react";
import { useEffect } from "react";
const Footer = () => {
	const [time, setTime] = React.useState(new Date().toLocaleTimeString());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		return () => clearInterval(interval); // Cleanup the interval on component unmount
	}, []);

	return <footer className='neobrutal text-center text-[8px]'>📶 Speed: -- Mbps | 🕒 Time:{time} </footer>;
};

export default Footer;
