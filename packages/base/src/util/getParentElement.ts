const getParentElement = (element: Element) : Element | null => {
	return element.parentElement ? element.parentNode as Element : (element.parentNode as ShadowRoot).host;
};

export default getParentElement;
