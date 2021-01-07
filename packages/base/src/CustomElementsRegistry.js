import setToArray from "./util/setToArray.js";
import { getSharedResource } from "./SharedResources.js";
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
	const tagRegRuntimeIndex = Tags.get(tag);
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
	const logger = new Logger(`There are currently ${allRuntimes.length} UI5 Web Components instances on this HMTL page (loading order: ${allRuntimes.map(ver => ver.descriptor).join(", ")}).`);

	Object.keys(Failures).forEach(otherRuntimeIndex => {
		const currentRuntime = getRuntime();
		const otherRuntime = getRuntime(otherRuntimeIndex);
		const comparison = compareCurrentRuntimeWith(otherRuntimeIndex);

		let compareWord;
		if (comparison > 0) {
			compareWord = "an older";
		} else if (comparison < 0) {
			compareWord = "a newer";
		} else {
			compareWord = "the same";
		}
		logger.para(`Runtime ${currentRuntime.descriptor} failed to define ${Failures[otherRuntimeIndex].size} tag(s) as they were defined by a runtime of ${compareWord} version (${otherRuntime.descriptor}): ${setToArray(Failures[otherRuntimeIndex]).sort().join(", ")}.`);
		if (comparison > 0) {
			logger.line(`WARNING! If your code uses features of the above web components, unavailable in version ${otherRuntime.version}, it might not work as expected!`);
		} else {
			logger.line(`Since the above web components were defined by ${comparison < 0 ? "a newer" : "the same"} version runtime, they should be compatible with your code.`);
		}
	});

	logger.para(`To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/Scoping.md.`);

	logDisableRuntimeWarningsInstructions(logger);

	logger.console("warn");
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
	recordTagRegistrationFailure,
};
