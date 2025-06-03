chrome.commands.onCommand.addListener((command) => {
	if (command === "open-extension") {
		chrome.windows.create({
			url: "index.html",
			type: "popup",
			width: 600,
			height: 640,
			left: 1000,
			top: 100,
			focused: true
		});
	}
});
