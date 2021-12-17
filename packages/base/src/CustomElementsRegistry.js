import setToArray from "./util/setToArray.js";
import getSharedResource from "./getSharedResource.js";
import { getCurrentRuntimeIndex, compareRuntimes, getAllRuntimes } from "./Runtimes.js";

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
	let tagRegRuntimeIndex = Tags.get(tag);
	if (tagRegRuntimeIndex === undefined) {
		tagRegRuntimeIndex = UNKNOWN_RUNTIME; // If the tag is taken, but not registered in Tags, then a version before 1.1.0 defined it => use the "unknown" key
	}
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
	const allRuntimes = getAllRuntimes();
	const currentRuntimeIndex = getCurrentRuntimeIndex();
	const currentRuntime = allRuntimes[currentRuntimeIndex];

	let message = `Multiple UI5 Web Components instances detected.`;

	if (allRuntimes.length > 1) {
		message = `${message}\nLoading order (versions before 1.1.0 not listed): ${allRuntimes.map(runtime => `\n${runtime.description}`).join("")}`;
	}

	Object.keys(Failures).forEach(otherRuntimeIndex => {
		let comparison;
		let otherRuntime;

		if (otherRuntimeIndex === UNKNOWN_RUNTIME) { // version < 1.1.0 defined the tag
			comparison = 1; // the current runtime is considered newer
			otherRuntime = {
				description: `Older unknown runtime`,
			};
		} else {
			comparison = compareRuntimes(currentRuntimeIndex, otherRuntimeIndex);
			otherRuntime = allRuntimes[otherRuntimeIndex];
		}

		let compareWord;
		if (comparison > 0) {
			compareWord = "an older";
		} else if (comparison < 0) {
			compareWord = "a newer";
		} else {
			compareWord = "the same";
		}
		message = `${message}\n\n"${currentRuntime.description}" failed to define ${Failures[otherRuntimeIndex].size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntime.description}": ${setToArray(Failures[otherRuntimeIndex]).sort().join(", ")}.`;

		if (comparison > 0) {
			message = `${message}\nWARNING! If your code uses features of the above web components, unavailable in ${otherRuntime.description}, it might not work as expected!`;
		} else {
			message = `${message}\nSince the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
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
