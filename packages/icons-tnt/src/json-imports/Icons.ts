import { registerIconLoader, CollectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const loadIconsBundle = async (collection: string): Promise<CollectionData> => {
	let iconData: CollectionData;

	if (collection === "tnt-v3") {
		iconData = (await import(/* webpackChunkName: "ui5-webcomponents-sap-icons-tnt-v3" */ "../generated/assets/v3/SAP-icons-TNT.json")).default;
	} else {
		iconData = (await import(/* webpackChunkName: "ui5-webcomponents-sap-icons-tnt-v2" */ "../generated/assets/v2/SAP-icons-TNT.json")).default;
	}

	if (typeof iconData === "string" && (iconData as string).endsWith(".json")) {
		throw new Error("[icons-tnt] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.");
	}
	return iconData;
}

const registerLoaders = () => {
	registerIconLoader("tnt-v2", loadIconsBundle);
	registerIconLoader("tnt-v3", loadIconsBundle);
};

registerLoaders();
