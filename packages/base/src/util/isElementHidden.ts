const isElementHidden = (el: HTMLElement) => {
	if (el.nodeName === "SLOT") {
		return false;
	}

	return (el.offsetWidth <= 0 && el.offsetHeight <= 0) || (el.style && el.style.visibility === "hidden");
};

export default isElementHidden;
