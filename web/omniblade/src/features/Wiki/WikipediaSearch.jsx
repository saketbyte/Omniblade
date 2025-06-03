import React, { useState } from "react";

const WikipediaFullPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [pageUrl, setPageUrl] = useState("");

	const handleSearch = () => {
		if (!searchTerm.trim()) return;

		const title = encodeURIComponent(searchTerm.trim());
		const wikiUrl = `https://en.wikipedia.org/wiki/${title}`;
		setPageUrl(wikiUrl);
	};

	return (
		<div className='neobrutal w-[480px] h-[480px] overflow-y-auto p-4 m-4 bg-gray-200'>
			<div className='neobrutal p-4  mb-4'>
				<input
					className='
                        bg-white border-2 border-black text-[8px]
                        focus:outline-none focus:shadow-[3px_3px_0px_0px_black] p-1 w-3/4 mr-2'
					type='text'
					placeholder='Search Wiki!'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button className='btn-brutal' onClick={handleSearch}>
					🔍
				</button>
			</div>

			{pageUrl && <iframe src={pageUrl} title='Wikipedia Full Page' className='w-full h-[80vh] border border-black rounded bg-white' />}
		</div>
	);
};

export default WikipediaFullPage;
