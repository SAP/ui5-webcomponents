const isElementHidden = (el: HTMLElement) => {
	if (el.nodeName === "SLOT") {
		return false;
	}

	const computedStyle = window.getComputedStyle(el);

	return (el.offsetWidth <= 0 && el.offsetHeight <= 0)
		|| (computedStyle.visibility === "hidden")
		|| (computedStyle.display === "none");
};

export default isElementHidden;
