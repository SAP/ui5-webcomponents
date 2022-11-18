const getSingletonElementInstance = (tag: string, parentElement: HTMLElement = document.body) => {
	let el = document.querySelector(tag);

	if (el) {
		return el;
	}

	el = document.createElement(tag);

	return parentElement.insertBefore(el, parentElement.firstChild);
};

export default getSingletonElementInstance;
