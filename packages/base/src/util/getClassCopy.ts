import type UI5Element from "../UI5Element.js";

const getClassCopy = (klass: typeof UI5Element, constructorCallback: () => void) => {
	return class classCopy extends klass {
		constructor() {
			super();
			constructorCallback && constructorCallback();
		}
	};
};

export default getClassCopy;
