import React from "react";
import getMeaning from "../../services/dictionaryApi";

import { useState, useRef, useEffect, useMemo } from "react";

// phonetic - dataDictionary[0].phonetic
// audio - dataDictionary[0].phonetics[i].audio
// parts of speech - dataDictionary[0].meanings[0].partOfSpeech
// meanings - dataDictionary[0].meanings[0].definitions[i].definition
// synonyms - dataDictionary[0].meanings[0].synonyms[i]
// antonyms - dataDictionary[0].meanings[0].antonyms[i]
function Dictionary() {
	const [dictionaryData, setDictionaryData] = useState(null);
	const [keyword, setKeyword] = useState("");
	const [error, setError] = useState(null);

	const fetchMeaning = async (word) => {
		try {
			if (!word) return;
			const data = await getMeaning(word);
			setDictionaryData(data);
			setError(null); // clear previous errors
			console.log(data);
		} catch (err) {
			setError({ error: err.message });
			console.log(error);
		}
	};

	const pronunciation = useMemo(() => {
		return dictionaryData?.[0]?.phonetics || [];
	}, [dictionaryData]);

	const word = dictionaryData?.[0]?.word;
	const phonetic = dictionaryData?.[0]?.phonetic;
	// const pronunciation = dictionaryData?.[0]?.phonetics || [];
	const meanings = dictionaryData?.[0]?.meanings || [];

	const audioRefs = useRef([]);

	// Populate refs once phonetics are available
	useEffect(() => {
		if (pronunciation) audioRefs.current = pronunciation.map((_, i) => audioRefs.current[i] || new Audio(pronunciation[i].audio));
	}, [pronunciation]);

	const playAudio = (index) => {
		const audio = audioRefs.current[index];
		console.log(audioRefs);
		if (audio && audio.src) {
			audio.play();
		}
	};

	return (
		<div className='neobrutal w-[480px] h-[480px] overflow-y-auto p-4 m-4 bg-gray-200'>
			{/* Header */}
			<input
				type='text'
				placeholder='Search a word'
				onChange={(e) => setKeyword(e.target.value)}
				className='
                        bg-white border-2 border-black text-[8px]
                        focus:outline-none focus:shadow-[3px_3px_0px_0px_black] p-1 mr-2'
			/>

			<button className='btn-brutal m-2' onClick={() => fetchMeaning(keyword)}>
				🔍
			</button>
			<div className='flex flex-col items-start '>
				<div className='text-[14px] mt-2 mb-2'>
					{word}
					{phonetic}
				</div>

				<div className='flex gap-2'>
					{pronunciation &&
						pronunciation.map((p, idx) =>
							p.audio ? (
								<button key={idx} onClick={() => playAudio(idx)} className='btn-brutal mb-3'>
									▶ {pronunciation[idx].audio.slice(-6, -4)}
								</button>
							) : null
						)}
				</div>
			</div>

			{/* Meanings, Synonyms, Antonyms */}
			{meanings &&
				meanings.map((meaning, mIdx) => (
					<div key={mIdx} className='mb-6'>
						<div className='text-[8px] underline'>As {meaning.partOfSpeech}</div>

						{/* Definitions */}
						{meaning.definitions &&
							meaning.definitions.map((def, dIdx) => (
								<div key={dIdx} className=' text-[8px] mt-3'>
									<span className='font-semibold'>{dIdx + 1}:</span> {def.definition}
								</div>
							))}

						{/* Synonyms */}
						{meaning.synonyms && meaning.synonyms && meaning.synonyms.length > 0 && (
							<div className='text-[8px] mt-5'>
								<span className='underline'>Synonyms:</span> {meaning.synonyms.join(", ")}
							</div>
						)}

						{/* Antonyms */}
						{meaning && meaning.antonyms && meaning.antonyms.length > 0 && (
							<div className='text-[8px] mt-3'>
								<span className='underline'>Antonyms:</span> {meaning.antonyms.join(", ")}
							</div>
						)}

						{meanings && mIdx < meanings.length - 1 && <hr className='border-black my-4' />}
					</div>
				))}
		</div>
	);
}

export default Dictionary;
