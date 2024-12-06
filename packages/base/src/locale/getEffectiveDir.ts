const getEffectiveDir = (element: HTMLElement): "rtl" | "ltr" => {
	try {
		return element.matches(":dir(rtl)") ? 'rtl' : 'ltr';
	} catch {
		return 'ltr'
	}
};

export default getEffectiveDir;
