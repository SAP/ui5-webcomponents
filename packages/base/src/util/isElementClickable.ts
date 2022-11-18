const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;

const isElementClickable = (el: HTMLElement): boolean => {
	if ((el as HTMLButtonElement).disabled) {
		return false;
	}

	const tabIndex = el.getAttribute("tabindex");
	if (tabIndex !== null && tabIndex !== undefined) {
		return parseInt(tabIndex) >= 0;
	}

	return rFocusable.test(el.nodeName)
		|| (rClickable.test(el.nodeName)
		&& !!(el as HTMLLinkElement).href);
};

export default isElementClickable;
