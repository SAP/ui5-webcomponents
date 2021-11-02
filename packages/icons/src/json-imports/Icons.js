import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const theme = getTheme();
const SAP_HORIZON = theme === "sap_horizon" || theme === "sap_horizon_exp";

const loadIconsBundle = async () => {
    let iconData = null;
	
	// TODO: remove commented code
	// const version = SAP_HORIZON ? "v5" : "v4";
	// iconData = (await import(`../generated/assets/${version}/SAP-icons.json`)).default;

	if (SAP_HORIZON) {
		iconData = (await import(`../generated/assets/v5/SAP-icons.json`)).default;
	} else {
		iconData = (await import(`../generated/assets/v4/SAP-icons.json`)).default;
	}

    if (typeof iconData === "string" && iconData.endsWith(".json")) {
        throw new Error("[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import \"@ui5/webcomponents-icons/dist/Assets-static.js\". Check the \"Assets\" documentation for more information.");
    }
    return iconData;
}

registerIconLoader(SAP_HORIZON ? "SAP-icons-v5" : "SAP-icons", loadIconsBundle);