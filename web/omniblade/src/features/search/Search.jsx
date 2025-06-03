import React, { useState } from "react";

const GoogleSearch = () => {
	const API_KEY = import.meta.vite.env.VITE_SEARCH_API_KEY; // ← replace this
	const CSE_ID = import.meta.vite.env.VITE_SEARCH_CSE_ID; // ← your CSE ID
	const RESULTS_PER_PAGE = 10;

	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]); // array of { title, link, snippet }
	const [totalResults, setTotalResults] = useState(0);
	const [startIndex, setStartIndex] = useState(1); // Google’s “start” is 1-based
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch a page of results (startIndex = 1, 11, 21, …)
	const fetchResults = async (newStart = 1) => {
		if (!query.trim()) return;
		setLoading(true);
		setError(null);

		const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&start=${newStart}`;

		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`);
			}
			const data = await res.json();

			if (data.error) {
				throw new Error(data.error.message);
			}

			// data.items may be undefined if no results
			const items = data.items || [];
			const mapped = items.map((item) => ({
				title: item.title,
				link: item.link,
				snippet: item.snippet
			}));

			setResults(mapped);
			setTotalResults(parseInt(data.searchInformation?.totalResults || "0", 10));
			setStartIndex(newStart);
		} catch (err) {
			console.error("Fetch error:", err);
			setError(err.message || "Unknown error");
			setResults([]);
			setTotalResults(0);
		} finally {
			setLoading(false);
		}
	};

	// Handler for clicking “Search”
	const onSearch = (e) => {
		e.preventDefault();
		fetchResults(1);
	};

	// Handler for “Next” page
	const onNextPage = () => {
		const nextIndex = startIndex + RESULTS_PER_PAGE;
		// don’t exceed totalResults
		if (nextIndex <= totalResults) {
			fetchResults(nextIndex);
		}
	};

	// Handler for “Previous” page
	const onPrevPage = () => {
		const prevIndex = startIndex - RESULTS_PER_PAGE;
		if (prevIndex >= 1) {
			fetchResults(prevIndex);
		}
	};

	// Compute current page number (1-based)
	const currentPage = Math.ceil(startIndex / RESULTS_PER_PAGE);
	const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

	return (
		<div className='neobrutal w-[480px] h-[480px] overflow-y-auto p-4 m-4 bg-gray-200'>
			<form onSubmit={onSearch} style={{ marginBottom: 20 }}>
				<input
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Search Google...'
					className='
                        bg-white border-2 border-black text-[8px]
                        focus:outline-none focus:shadow-[3px_3px_0px_0px_black] w-3/4 p-1 mr-2'
				/>
				<button type='submit' className='btn-brutal p-2'>
					🔍
				</button>
			</form>

			{loading && <p>Loading…</p>}
			{error && <p>Error: {error}</p>}
			{!loading && !error && results.length === 0 && startIndex === 1 && <p style={{ color: "#666" }}>Google Search.</p>}

			<ul style={{ listStyle: "none", padding: 0, fontFamily: "google-sans", textTransform: "none" }}>
				{results.map((item, idx) => (
					<li
						key={idx}
						style={{
							marginBottom: 20,
							padding: 12,
							border: "1px solid #eee",
							borderRadius: 4
						}}>
						<a href={item.link} target='_blank' rel='noopener noreferrer' style={{ fontSize: 18, color: "#1a0dab", textDecoration: "none" }}>
							{item.title}
						</a>
						<p style={{ margin: "8px 0", color: "#555" }}>{item.snippet}</p>
						<a href={item.link} target='_blank' rel='noopener noreferrer' style={{ fontSize: 14, color: "#006621" }}>
							{item.link}
						</a>
					</li>
				))}
			</ul>

			{/* Pagination controls */}
			{totalResults > 0 && (
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: 20
					}}>
					<button
						onClick={onPrevPage}
						disabled={startIndex === 1 || loading}
						style={{
							padding: "6px 12px",
							fontSize: 14,
							cursor: startIndex === 1 || loading ? "not-allowed" : "pointer"
						}}>
						← Previous
					</button>

					<span style={{ fontSize: 14, color: "#333" }}>
						Page {currentPage} of {totalPages}
					</span>

					<button
						onClick={onNextPage}
						disabled={loading || startIndex + RESULTS_PER_PAGE > totalResults}
						style={{
							padding: "6px 12px",
							fontSize: 14,
							cursor: loading || startIndex + RESULTS_PER_PAGE > totalResults ? "not-allowed" : "pointer"
						}}>
						Next →
					</button>
				</div>
			)}
		</div>
	);
};

export default GoogleSearch;
