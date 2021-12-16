import setToArray from "./util/setToArray.js";
import getSharedResource from "./getSharedResource.js";
import {
	getCurrentRuntimeIndex,
	getRuntime,
	compareCurrentRuntimeWith,
	getAllRuntimes,
} from "./Runtimes.js";

const Tags = getSharedResource("Tags", new Map());

const Definitions = new Set();
let Failures = {};
let failureTimeout;

const UNKNOWN_RUNTIME = "unknown";

const registerTag = tag => {
	Definitions.add(tag);
	Tags.set(tag, getCurrentRuntimeIndex());
};

const isTagRegistered = tag => {
	return Definitions.has(tag);
};

const getAllRegisteredTags = () => {
	return setToArray(Definitions);
};

const recordTagRegistrationFailure = tag => {
	const tagRegRuntimeIndex = Tags.get(tag) || UNKNOWN_RUNTIME; // If the tag is taken, but not registered in Tags, then a version before 1.1.0 defined it => use the "unknown" key
	Failures[tagRegRuntimeIndex] = Failures[tagRegRuntimeIndex] || new Set();
	Failures[tagRegRuntimeIndex].add(tag);

	if (!failureTimeout) {
		failureTimeout = setTimeout(() => {
			displayFailedRegistrations();
			Failures = {};
			failureTimeout = undefined;
		}, 1000);
	}
};

const displayFailedRegistrations = () => {
	let message = `There is currently more than one UI5 Web Components instance on this HTML page.`;

	const allRuntimes = getAllRuntimes();
	if (allRuntimes.length > 1) {
		message = `${message}\nDetected instances  (versions before 1.1.0 are not detected) loading order: ${allRuntimes.map(ver => `\n${ver.descriptor}`).join(", ")}`;
	}

	Object.keys(Failures).forEach(otherRuntimeIndex => {
		const currentRuntime = getRuntime();
		let comparison;
		let otherRuntimeVersionPhrase;
		let otherRuntimeDescriptor;

		if (otherRuntimeIndex === UNKNOWN_RUNTIME) { // version < 1.1.0 defined the tag
			comparison = 1; // the current runtime is considered newer
			otherRuntimeVersionPhrase = "the older version that defined them";
			otherRuntimeDescriptor = "Unknown older version";
		} else {
			const otherRuntime = getRuntime(otherRuntimeIndex);
			otherRuntimeVersionPhrase = `version ${otherRuntime.version}`;
			otherRuntimeDescriptor = otherRuntime.descriptor;
			comparison = compareCurrentRuntimeWith(otherRuntimeIndex);
		}

		let compareWord;
		if (comparison > 0) {
			compareWord = "an older";
		} else if (comparison < 0) {
			compareWord = "a newer";
		} else {
			compareWord = "the same";
		}
		message = `${message}\n\nRuntime "${currentRuntime.descriptor}" failed to define ${Failures[otherRuntimeIndex].size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntimeDescriptor}": ${setToArray(Failures[otherRuntimeIndex]).sort().join(", ")}.`;

		if (comparison > 0) {
			message = `${message}\nWARNING! If your code uses features of the above web components, unavailable in ${otherRuntimeVersionPhrase}, it might not work as expected!`;
		} else if (comparison < 0) {
			message = `${message}\nWARNING! If ${otherRuntimeVersionPhrase} uses features of the above components, unavailable in ${currentRuntime.descriptor}, it might not work as expected!`;
		} else {
			message = `${message}\nSince the above web components were defined by the same version runtime, they should be compatible with your code.`;
		}
	});

	message = `${message}\n\nTo prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/2-advanced/03-scoping.md.`;

	console.warn(message); // eslint-disable-line
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
	recordTagRegistrationFailure,
};
