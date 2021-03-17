const getClassCopy = klass => {
	return class classCopy extends klass {};
};

export default getClassCopy;
