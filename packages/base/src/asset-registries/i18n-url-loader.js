import { getFeature } from "../FeaturesRegistry.js";
import { fetchTextOnce } from "../util/FetchHelper.js";
import { getEffectiveAssetPath } from "../util/EffectiveAssetPath.js";

const fetchBundle = async bundleUrl => {
	if (typeof bundleUrl === "object") { // inlined from build
		throw new Error(`Message bundle assets are inlined at build time creating an ineffective production bundle. Use dynamic assets with JSON inlining, or configure JSON imports as URL.....`);
	}

	const content = await fetchTextOnce(getEffectiveAssetPath(bundleUrl));
	let parser;
	if (content.startsWith("{")) {
		parser = JSON.parse;
	} else {
		const PropertiesFormatSupport = getFeature("PropertiesFormatSupport");
		if (!PropertiesFormatSupport) {
			throw new Error(`In order to support .properties files, please: import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";`);
		}
		parser = PropertiesFormatSupport.parser;
	}

	const data = parser(content);
	return data;
};

// eslint-disable-next-line
export { fetchBundle };
