// Set a runtime alias for easier debugging
import { setRuntimeAlias } from "@ui5/webcomponents-base/dist/Runtimes.js";
setRuntimeAlias("UI5 Web Components Playground");

// Set scoping
import { setCustomElementsScopingSuffix, setCustomElementsScopingRules } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
// setCustomElementsScopingSuffix("demo");
// setCustomElementsScopingRules({include: [/^ui5-/], exclude: [/^ui5-my-/, /-test-/]});

// Set custom resource sharing policies
import { setSharedResourcePolicy } from "@ui5/webcomponents-base/dist/SharedResources.js";
setSharedResourcePolicy("SVGIcons", "OnlyNewer");

// Set custom assets path
import { getAssetsPath, setAssetsPath } from "@ui5/webcomponents-base/dist/config/AssetsPath.js";
// setAssetsPath("/my-resources/");

// Attach theme loaded event
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming";
attachThemeLoaded(theme => {
	console.log("Theme load complete: ", theme);
});

// OpenUI5 integration
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";

/* Uncomment to test the registration of custom properties and JSON bundles - use the TextArea test page
import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
registerI18nBundle("@ui5/webcomponents", {
	bg: "./lang/messagebundle_bg.properties",
	fr: "./lang/fr.json",
});
*/
