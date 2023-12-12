const getParentElement = (el: HTMLElement) => {
	return (el.parentElement ? el.parentNode : (el.parentNode as ShadowRoot).host) as HTMLElement;
};

export default getParentElement;
