import type UI5Element from "../UI5Element.js";

const rtlAwareSet = new Set<typeof UI5Element>();

const markAsRtlAware = (klass: typeof UI5Element) => {
	rtlAwareSet.add(klass);
};

const isRtlAware = (klass: typeof UI5Element) => {
	return rtlAwareSet.has(klass);
};

export {
	markAsRtlAware,
	isRtlAware,
};
