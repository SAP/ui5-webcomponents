const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;

const isNodeClickable = (node: HTMLElement): boolean => {
	if ((node as HTMLButtonElement).disabled) {
		return false;
	}

	const tabIndex = node.getAttribute("tabindex");
	if (tabIndex !== null && tabIndex !== undefined) {
		return parseInt(tabIndex) >= 0;
	}

	return rFocusable.test(node.nodeName)
		|| (rClickable.test(node.nodeName)
		&& !!(node as HTMLLinkElement).href);
};

export default isNodeClickable;
