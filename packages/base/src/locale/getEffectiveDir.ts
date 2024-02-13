const getEffectiveDir = (element: HTMLElement): "rtl" | "ltr" => {
	if (element.matches(":dir(rtl)")) {
		return "rtl";
	}

	return "ltr";
};

export default getEffectiveDir;
