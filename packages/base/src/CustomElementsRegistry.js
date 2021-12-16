import setToArray from "./util/setToArray.js";
import getSharedResource from "./getSharedResource.js";
import {
	getCurrentRuntimeIndex,
	getRuntime,
	compareCurrentRuntimeWith,
	runtimeWarningsEnabled,
	logDisableRuntimeWarningsInstructions,
	getAllRuntimes,
} from "./Runtimes.js";
import Logger from "./util/Logger.js";

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
	if (!runtimeWarningsEnabled()) {
		return;
	}

	const allRuntimes = getAllRuntimes();
	const logger = new Logger(allRuntimes.length === 1
		? `There are currently at least 2 UI5 Web Components instances on this page.`
		: `There are currently ${allRuntimes.length} known UI5 Web Components instances on this HTML page (versions before 1.1.0 are not detected).`);

	if (allRuntimes.length > 1) {
		logger.line(`Loading order: ${allRuntimes.map(ver => ver.descriptor).join(", ")}`);
	}

	Object.keys(Failures).forEach(otherRuntimeIndex => {
		const currentRuntime = getRuntime();
		let comparison;
		let otherRuntimeVersionPhrase;
		let otherRuntimeDescriptor;

		if (otherRuntimeIndex === UNKNOWN_RUNTIME) { // version < 1.1.0 defined the tag
			comparison = 1; // the current runtime is considered newer
			otherRuntimeVersionPhrase = "the older version that defined them";
			otherRuntimeDescriptor = "";
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
		logger.para(`Runtime "${currentRuntime.descriptor}" failed to define ${Failures[otherRuntimeIndex].size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntimeDescriptor}": ${setToArray(Failures[otherRuntimeIndex]).sort().join(", ")}.`);
		if (comparison > 0) {
			logger.line(`WARNING! If your code uses features of the above web components, unavailable in ${otherRuntimeVersionPhrase}, it might not work as expected!`);
		} else {
			logger.line(`Since the above web components were defined by ${compareWord} version runtime, they should be compatible with your code.`);
		}
	});

	logger.para(`To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/2-advanced/03-scoping.md.`);

	logDisableRuntimeWarningsInstructions(logger);

	logger.console("warn");
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
	recordTagRegistrationFailure,
};
