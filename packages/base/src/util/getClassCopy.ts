import UI5Element, { ChangeInfo } from "../UI5Element";

const getClassCopy = (klass: typeof UI5Element, constructorCallback: Function) => {
	return class classCopy extends klass {
		constructor() {
			super();
			constructorCallback && constructorCallback();
		}
	};
};

export default getClassCopy;
