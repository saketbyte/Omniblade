import React, { useState, useEffect, useRef } from "react";

const Calculator = () => {
	const [display, setDisplay] = useState("");
	const containerRef = useRef(null);

	// Focus on mount to capture keyboard events
	useEffect(() => {
		containerRef.current.focus();
	}, []);

	// Handle button clicks
	const handleButtonClick = (value) => {
		if (value === "C") {
			setDisplay("");
		} else if (value === "=") {
			try {
				// eslint-disable-next-line no-eval
				const result = eval(display);
				setDisplay(String(result));
			} catch {
				setDisplay("Error");
			}
		} else if (value === "%") {
			try {
				const result = parseFloat(display) / 100;
				setDisplay(String(result));
			} catch {
				setDisplay("Error");
			}
		} else {
			setDisplay((prev) => prev + value);
		}
	};

	// Handle keyboard input
	const handleKeyDown = (e) => {
		const key = e.key;
		if (/^[0-9.]$/.test(key)) {
			handleButtonClick(key);
		} else if (["+", "-", "*", "/"].includes(key)) {
			handleButtonClick(key);
		} else if (key === "Enter" || key === "=") {
			handleButtonClick("=");
		} else if (key === "%") {
			handleButtonClick("%");
		} else if (key === "Backspace") {
			setDisplay((prev) => prev.slice(0, -1));
		} else if (key.toLowerCase() === "c") {
			handleButtonClick("C");
		}
	};

	const buttons = ["C", "%", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", "0", "."];

	return (
		<div ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown} className='neobrutal w-[380px] h-[380px] p-2 flex flex-col justify-between'>
			{/* Display */}
			<input className='neobrutal mb-4 p-1 text-right text-xl h-6 overflow-hidden' placeholder='0' value={display} />

			{/* Buttons grid */}
			<div className='grid grid-cols-4 gap-1 flex-grow'>
				{buttons.map((btn) => (
					<button key={btn} onClick={() => handleButtonClick(btn)} className='btn-brutal flex items-center justify-center'>
						{btn}
					</button>
				))}
			</div>
		</div>
	);
};

export default Calculator;
