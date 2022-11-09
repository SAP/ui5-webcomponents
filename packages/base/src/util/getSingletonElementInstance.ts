const getSingletonElementInstance = (tag: string, parentElement: HTMLElement = document.body) => {
	let el = document.querySelector(tag);

	if (el) {
		return el as Record<string, any>;
	}

	el = document.createElement(tag);

	return parentElement.insertBefore(el, parentElement.firstChild) as Record<string, any>;
};

export default getSingletonElementInstance;
