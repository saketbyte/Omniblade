// src/components/Clipboard.jsx
import React, { useEffect, useState } from "react";

const Clipboard = () => {
	const [snips, setSnips] = useState([]);

	// Load existing snips from localStorage
	useEffect(() => {
		const existing = localStorage.getItem("snips");
		if (existing) {
			setSnips(JSON.parse(existing));
		}
	}, []);

	// Save a new clip to localStorage and state
	const saveClip = (text) => {
		const trimmed = text.trim();
		if (!trimmed) return;

		const normalized = trimmed.toLowerCase();

		const existingIndex = snips.findIndex((s) => s.text.trim().toLowerCase() === normalized);

		// If it's already at the top, skip
		if (existingIndex === 0) return;

		let updated = [];

		if (existingIndex > 0) {
			// Move existing snip to top
			const existing = snips[existingIndex];
			updated = [existing, ...snips.filter((_, i) => i !== existingIndex)];
		} else {
			// Add new snip to top
			const newSnip = { id: Date.now(), text: trimmed };
			updated = [newSnip, ...snips.slice(0, 19)];
			sendToRedis(newSnip); // Placeholder for Redis
		}

		setSnips(updated);
		localStorage.setItem("snips", JSON.stringify(updated));
	};

	const sendToRedis = (snip) => {
		// Later you can send snip to Redis-backed API
		console.log("Will send to Redis:", snip);
	};

	// Add copy and cut listeners
	useEffect(() => {
		const handleCopyCut = (event) => {
			console.log(event);
			const selection = window.getSelection().toString();
			if (selection) {
				saveClip(selection);
			}
		};

		document.addEventListener("copy", handleCopyCut);
		document.addEventListener("cut", handleCopyCut);

		return () => {
			document.removeEventListener("copy", handleCopyCut);
			document.removeEventListener("cut", handleCopyCut);
		};
	}, [snips]);

	return (
		<div className='w-[420px] h-[360px] mt-2 border-2 border-black  z-50  flex flex-col justify-between'>
			<div className=''>
				{snips.map((snip, index) => (
					<div
						key={snip.id}
						className='border border-gray-300 text-[4px] hover:scale-[1.05] cursor-pointer transition-all duration-200'
						onClick={() => {
							navigator.clipboard.writeText(snip.text);

							// Move clicked to top
							const updated = [snip, ...snips.filter((_, i) => i !== index)];
							setSnips(updated);
							localStorage.setItem("snips", JSON.stringify(updated));
						}}
						title='Click to copy'>
						<p className='whitespace-pre-wrap break-words space-x-2'>{snip.text}</p>
					</div>
				))}
			</div>

			{/* Clear Button */}
			<div className='flex justify-end mt-2'>
				<button
					className='text-xs border btn-brutal border-black px-1 py-0.5 hover:bg-white  hover:text-white transition-all '
					onClick={() => {
						setSnips([]);
						localStorage.removeItem("snips");
					}}>
					🗑️ Clear
				</button>
			</div>
		</div>
	);
};

export default Clipboard;
