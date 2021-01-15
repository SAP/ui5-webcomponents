import { getFeature } from "./FeaturesRegistry.js";

const Legacy = getFeature("LegacyBrowsersSupport");

const isLegacyBrowser = () => {
	return Legacy && Legacy.isLegacyBrowser();
};

export default isLegacyBrowser;
