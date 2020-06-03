const Definitions = new Set();
const Failures = new Set();
let failureTimeout;

const registerTag = tag => {
	Definitions.add(tag);
};

const isTagRegistered = tag => {
	return Definitions.has(tag);
};

const getAllRegisteredTags = () => {
	const arr = [];
	Definitions.forEach(tag => {
		arr.push(tag);
	});
	return arr;
};

const recordTagRegistrationFailure = tag => {
	Failures.add(tag);
	if (!failureTimeout) {
		failureTimeout = setTimeout(() => {
			displayFailedRegistrations();
			failureTimeout = undefined;
		}, 1000);
	}
};

const displayFailedRegistrations = () => {
	const tags = []; // IE only supports Set.prototype.forEach
	Failures.forEach(tag => {
		tags.push(tag);
	});
	console.warn(`The following tags have already been defined by a different UI5 Web Components version: ${tags.join(", ")}`); // eslint-disable-line
	Failures.clear();
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
	recordTagRegistrationFailure,
};
