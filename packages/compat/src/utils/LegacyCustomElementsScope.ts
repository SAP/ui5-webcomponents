import type UI5Element from "@ui5/webcomponents-base";
import { getCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { hasRegisteredTags } from "@ui5/webcomponents-base/dist/CustomElementsRegistry.js";

let suf: string;

const setLegacyCustomElementsScopingSuffix = (suffix: string) => {
	if (!suffix.match(/^[a-zA-Z0-9_-]+$/)) {
		throw new Error("Only alphanumeric characters and dashes allowed for the scoping suffix");
	}

	if (hasRegisteredTags()) {
		// eslint-disable-next-line no-console
		console.warn("Setting the scoping suffix must be done before importing any components. For proper usage, read the scoping section: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/06-scoping.md.");
	}

	suf = suffix;
};

const getLegacyCustomElementsScopingSuffix = () => {
	return suf;
};

const legacyScopingPatcher = (klass: typeof UI5Element) => {
	const metadata = klass.getMetadata();
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const originalGetTag = metadata.getTag;

	metadata.getTag = function () {
		const originalTag = originalGetTag.call(this);
		const legacySuffix = getLegacyCustomElementsScopingSuffix();
		const suffix = getCustomElementsScopingSuffix();

		if (!legacySuffix || !originalTag) {
			return originalTag;
		}

		if (suffix && originalTag.endsWith(`-${suffix}`)) {
			return originalTag.replace(`-${suffix}`, `-${legacySuffix}-${suffix}`);
		}

		return `${originalTag}-${legacySuffix}`;
	};
};

export {
	setLegacyCustomElementsScopingSuffix,
	getLegacyCustomElementsScopingSuffix,
	legacyScopingPatcher,
};
