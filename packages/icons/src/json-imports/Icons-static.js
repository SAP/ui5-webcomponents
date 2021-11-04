import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import SAPIconsV4Url from "../generated/assets/v4/SAP-icons.json";
import SAPIconsV5Url from "../generated/assets/v5/SAP-icons.json";

const loadIconsBundle = async (collection) => {
	if (typeof SAPIconsV5Url === "object" || typeof SAPIconsV4Url === "object") {
		// inlined from build
		throw new Error("[icons] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
	}

	let iconsUrl = null;

	if (collection === "SAP-icons-v5") {
		iconsUrl = SAPIconsV5Url;
	} else if (collection === "SAP-icons") {
		iconsUrl = SAPIconsV4Url;
	}

	return (await fetch(iconsUrl)).json();
}

const registerLoaders = () => {
	registerIconLoader("SAP-icons", loadIconsBundle);
	registerIconLoader("SAP-icons-v5", loadIconsBundle);
};

registerLoaders();
