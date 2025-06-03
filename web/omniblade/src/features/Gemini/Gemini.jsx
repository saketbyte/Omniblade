import React, { useState } from "react";
import Markdown from "react-markdown";
import { GoogleGenAI } from "@google/genai";

const GeminiTextGenerator = () => {
	const [prompt, setPrompt] = useState("");
	const [responseText, setResponseText] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Replace this securely in real deployment
	const ai = new GoogleGenAI({
		apiKey: import.meta.env.VITE_GEMINI_API_KEY // Use env var via Vite
	});

	const handleGenerate = async (input) => {
		console.log(input);
		if (!prompt.trim()) return;
		setLoading(true);
		setError("");
		setResponseText("");

		try {
			const result = await ai.models.generateContent({
				model: "gemini-2.0-flash",
				contents: [prompt]
			});
			// console.log(result);
			console.log(result.candidates[0].content.parts[0].text.toString());
			setResponseText(result.candidates[0].content.parts[0].text.toString());
		} catch (err) {
			console.error("Gemini error:", err);
			setError("Failed to generate content.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='neobrutal w-[480px] h-[480px] overflow-y-auto p-4 m-4 bg-gray-200'>
			<div className='neobrutal p-4 mb-4'>
				<input className='bg-white border-2 border-black text-[10px] focus:outline-none focus:shadow-[3px_3px_0px_0px_black] p-1 w-3/4 mr-2' type='text' placeholder='Ask Gemini something...' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
				<button className='btn-brutal' onClick={(e) => handleGenerate(e.target.value)} disabled={loading}>
					{loading ? "..." : "✨"}
				</button>
			</div>

			{error && <p className='text-red-600 text-sm'>{error}</p>}

			{responseText ? (
				<div className='normal-case font-sans p-2 bg-white border border-black text-sm whitespace-pre-wrap'>
					<Markdown>{responseText}</Markdown>
				</div>
			) : loading ? (
				"Gemini is thinking..."
			) : (
				""
			)}
		</div>
	);
};

export default GeminiTextGenerator;
