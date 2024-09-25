import type UI5Element from "../UI5Element";

const resolvePath = (el: UI5Element) => {
	return el.matches(":focus-within") && el.getFocusDomRef() === el.shadowRoot?.activeElement;
};

export {
	// eslint-disable-next-line import/prefer-default-export
	resolvePath,
};
