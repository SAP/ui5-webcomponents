// Set a runtime alias for easier debugging
import { setRuntimeAlias } from "@ui5/webcomponents-base/dist/Runtimes.js";
setRuntimeAlias("UI5 Web Components Playground");

// Set scoping
import { setCustomElementsScopingSuffix, setCustomElementsScopingRules } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
// setCustomElementsScopingSuffix("demo");
// setCustomElementsScopingRules({include: [/^ui5-/], exclude: [/^ui5-my-/, /-test-/]});

// Set custom resource sharing policies
import { setSharedResourcePolicy } from "@ui5/webcomponents-base/dist/SharedResources.js";
import SharedResourceReusePolicy from "@ui5/webcomponents-base/dist/types/SharedResourceReusePolicy.js";
import SharedResourceReuseType from "@ui5/webcomponents-base/dist/types/SharedResourceType.js";
setSharedResourcePolicy(SharedResourceReuseType.SVGIcons, SharedResourceReusePolicy.OnlyNewer);
setSharedResourcePolicy(SharedResourceReuseType.ThemeProperties, SharedResourceReusePolicy.OnlyNewer);

// Set custom assets path
import { setAssetsPath } from "@ui5/webcomponents-base/dist/config/AssetsPath.js";
// setAssetsPath("/my-resources/");

// Attach theme loaded event
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming";
attachThemeLoaded(theme => {
	console.log("Theme load complete: ", theme);
});

// OpenUI5 integration
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";

// Set configuration settings
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
// setLanguage("de");

/* Uncomment to test the registration of custom properties and JSON bundles - use the TextArea test page
import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
registerI18nBundle("@ui5/webcomponents", {
	bg: "./lang/messagebundle_bg.properties",
	fr: "./lang/fr.json",
});
*/
