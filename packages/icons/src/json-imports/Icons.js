import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { isTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/theming/ThemeLoaded.js";

const loadIconsBundle = async () => {
    let iconData = null;

	if (isTheme("sap_horizon")) {
		iconData = (await import(`../generated/assets/v5/SAP-icons.json`)).default;
	} else {
		iconData = (await import(`../generated/assets/v4/SAP-icons.json`)).default;
	}

    if (typeof iconData === "string" && iconData.endsWith(".json")) {
        throw new Error("[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import \"@ui5/webcomponents-icons/dist/Assets-static.js\". Check the \"Assets\" documentation for more information.");
    }
    return iconData;
}

const registerLoader = () => {
	registerIconLoader(isTheme("sap_horizon") ? "SAP-icons-v5" : "SAP-icons", loadIconsBundle)
};

registerLoader();
attachThemeLoaded(registerLoader);