import setToArray from "./util/setToArray.js";
import { getSharedResource } from "./SharedResources.js";
import {
	getVersionIndex,
	getVersionInfo,
	compareWithVersion,
	versionWarningsEnabled,
} from "./Version.js";

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
	Object.keys(Failures).forEach(otherVersionIndex => {
		const currentVersionInfo = getVersionInfo();
		const otherVersionInfo = getVersionInfo(otherVersionIndex);
		const comparison = compareWithVersion(otherVersionIndex);
		if (versionWarningsEnabled()) {
			console.warn(`Runtime version ${currentVersionInfo.version} failed to register one or more tags. The following tags have already been defined by another runtime of ${comparison === 0 ? "the same" : (comparison > 0 ? "an older" : "a newer")} UI5 Web Components version (${otherVersionInfo.version}): ${setToArray(Failures[otherVersionIndex]).sort().join(", ")}.\n\n To prevent this from happening, consider using scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/Scoping.md.\n\n To suppress this warning, add the following code to your bundle:\n import { disableVersionWarnings } from "@ui5/webcomponents-base/dist/Version.js";\n disableVersionWarnings();`); // eslint-disable-line
		}
	});

	Failures = {};
};

export {
	registerTag,
	isTagRegistered,
	getAllRegisteredTags,
	recordTagRegistrationFailure,
};
