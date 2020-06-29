const getSingletonElementInstance = tag => {
	let el = document.querySelector(tag);

	if (el) {
		return el;
	}

	const bodyElement = document.body;
	el = document.createElement(tag);

	return bodyElement.insertBefore(el, bodyElement.firstChild);
};

export default getSingletonElementInstance;
