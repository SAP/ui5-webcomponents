import { ObjectWithDynamicKeys } from "../types";

const getSingletonElementInstance = (tag: string, parentElement: HTMLElement = document.body) => {
	let el = document.querySelector(tag);

	if (el) {
		return el as ObjectWithDynamicKeys;
	}

	el = document.createElement(tag);

	return parentElement.insertBefore(el, parentElement.firstChild) as ObjectWithDynamicKeys;
};

export default getSingletonElementInstance;
