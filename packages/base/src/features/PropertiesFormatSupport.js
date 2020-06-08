import { registerFeature } from "../FeaturesRegistry.js";
import parseProperties from "../util/parseProperties.js";

const PropertiesFormatSupport = {
	parser: parseProperties,
};

registerFeature("PropertiesFormatSupport", PropertiesFormatSupport);
