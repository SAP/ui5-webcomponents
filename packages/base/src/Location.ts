const isSSR = typeof document === "undefined";

const internals = {
	search() {
		if (isSSR) {
			return "";
		}
		return window.location.search;
	},
}

const getLocationHostname = () => {
	if (isSSR) {
		return "";
	}

	return window.location.hostname;
};

const getLocationPort = () => {
	if (isSSR) {
		return "";
	}

	return window.location.port;
};

const getLocationProtocol = () => {
	if (isSSR) {
		return "";
	}

	return window.location.protocol;
};

const getLocationHref = () => {
	if (isSSR) {
		return "";
	}

	return window.location.href;
};


const getLocationSearch = () => {
	return internals.search();
};

const locationReload = () => {
	if (!isSSR) {
		window.location.reload();
	}
};

export {
	internals,
	locationReload,
	getLocationHref,
	getLocationSearch,
	getLocationHostname,
	getLocationPort,
	getLocationProtocol,
};
