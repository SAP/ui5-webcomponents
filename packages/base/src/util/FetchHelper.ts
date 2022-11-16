const fetchPromises = new Map<string, Promise<Response>>();
const jsonPromises = new Map<string, Promise<any>>();
const textPromises = new Map<string, Promise<string>>();

const fetchTextOnce = async (url: string) => {
	if (!fetchPromises.get(url)) {
		fetchPromises.set(url, fetch(url));
	}
	const response = await fetchPromises.get(url);

	if (response && !textPromises.get(url)) {
		textPromises.set(url, response.text());
	}

	return textPromises.get(url);
};

const fetchJsonOnce = async (url: string) => {
	if (!fetchPromises.get(url)) {
		fetchPromises.set(url, fetch(url));
	}
	const response = await fetchPromises.get(url);

	if (response && !jsonPromises.get(url)) {
		jsonPromises.set(url, response.json());
	}

	return jsonPromises.get(url);
};

export { fetchTextOnce, fetchJsonOnce };
