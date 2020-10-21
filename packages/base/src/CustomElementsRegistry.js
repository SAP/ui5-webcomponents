import setToArray from "./util/setToArray.js";
import { getSharedResource } from "./SharedResources.js";
import {
	getVersionIndex,
	getVersionInfo,
	compareWithVersion,
	versionWarningsEnabled,
	logDisableVersionWarningsInstructions,
	getAllVersions,
} from "./Version.js";
import Logger from "./util/Logger.js";

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
			Failures = {};
			failureTimeout = undefined;
		}, 1000);
	}
};

const displayFailedRegistrations = () => {
	if (!versionWarningsEnabled()) {
		return;
	}

	const allVersions = getAllVersions();
	const logger = new Logger(`There are currently ${allVersions.length} UI5 Web Components instances on this HMTL page (loading order: ${allVersions.join(", ")}).`);

	Object.keys(Failures).forEach(otherVersionIndex => {
		const currentVersionInfo = getVersionInfo();
		const otherVersionInfo = getVersionInfo(otherVersionIndex);
		const comparison = compareWithVersion(otherVersionIndex);

		let compareWord;
		if (comparison > 0) {
			compareWord = "an older";
		} else if (comparison < 0) {
			compareWord = "a newer";
		} else {
			compareWord = "the same";
		}
		logger.para(`Runtime of version ${currentVersionInfo.version} failed to define ${Failures[otherVersionIndex].size} tag(s) as they were defined by a runtime of ${compareWord} version (${otherVersionInfo.version}): ${setToArray(Failures[otherVersionIndex]).sort().join(", ")}.`);
		if (comparison > 0) {
			logger.line(`WARNING! If your code uses features of the above web components, unavailable in version ${otherVersionInfo.version}, it might not work as expected!`);
		}
	});

	logger.para(`To fix this, consider using scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/Scoping.md.`);

	logDisableVersionWarningsInstructions(logger);

	logger.console("warn");
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
	recordTagRegistrationFailure,
};
