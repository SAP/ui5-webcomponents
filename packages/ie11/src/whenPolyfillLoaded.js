let polyfillLoadedPromise;

const whenPolyfillLoaded = () => {
	if (polyfillLoadedPromise) {
		return polyfillLoadedPromise;
	}

	polyfillLoadedPromise = new Promise(resolve => {
		if (window.WebComponents
			&& !window.WebComponents.ready
			&& window.WebComponents.waitFor) {
			// the polyfill loader is present
			window.WebComponents.waitFor(() => {
				// the polyfills are loaded, safe to execute code depending on their APIs
				resolve();
			});
		} else {
			// polyfill loader missing, modern browsers only
			resolve();
		}
	});

	return polyfillLoadedPromise;
};

export default whenPolyfillLoaded;
