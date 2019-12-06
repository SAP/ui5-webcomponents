import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

import de from "../assets/i18n/messagebundle_de.json";
import en from "../assets/i18n/messagebundle_en.json";
import es from "../assets/i18n/messagebundle_es.json";
import fr from "../assets/i18n/messagebundle_fr.json";

const bundleMap = {
	de,
	en,
	es,
	fr,
};

const allEntriesInlined = Object.entries(bundleMap).every(([_key, value]) => typeof (value) === "object");

/* eslint-disable */
if (allEntriesInlined) {
	console.warn(`Inefficient bundling detected: consider bundling i18n imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\/.*\\\.json"`);
}
/* eslint-enable */

registerI18nBundle("INIT_PACKAGE_VAR_NAME", bundleMap);
