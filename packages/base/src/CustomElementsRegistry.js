import setToArray from "./util/setToArray.js";
import { getSharedResource } from "./SharedResources.js";
import { getVersionIndex, getVersionInfo } from "./Version.js";

const Tags = getSharedResource("Tags", new Map());
const Definitions = new Set();
let Failures = {};
let failureTimeout;

const registerTag = tag => {
	Definitions.add(tag);
	Tags.set(tag, getVersionIndex());
};

const isTagRegistered = tag => {
	return Definitions.has(tag);
};

const getAllRegisteredTags = () => {
	return setToArray(Definitions);
};

const recordTagRegistrationFailure = tag => {
	const tagRegVersionIndex = Tags.get(tag);
	Failures[tagRegVersionIndex] = Failures[tagRegVersionIndex] || new Set();
	Failures[tagRegVersionIndex].add(tag);

	if (!failureTimeout) {
		failureTimeout = setTimeout(() => {
			displayFailedRegistrations();
			failureTimeout = undefined;
		}, 1000);
	}
};

const displayFailedRegistrations = () => {
	Object.keys(Failures).forEach(versionIndex => {
		const versionInfo = getVersionInfo(versionIndex);
		console.warn(`The following tags have already been defined by UI5 Web Components version: ${versionInfo.version}: ${setToArray(Failures[versionIndex]).join(", ")}`); // eslint-disable-line
	});

	Failures = {};
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
	recordTagRegistrationFailure,
};
