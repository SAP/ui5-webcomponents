const getClassCopy = (klass, constructorCallback) => {
	return class classCopy extends klass {
		constructor() {
			super();
			constructorCallback();
		}
	};
};

export default getClassCopy;
