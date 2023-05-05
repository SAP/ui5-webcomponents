import { registerIconLoader, CollectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const loadIconsBundle = async (collection: string): Promise<CollectionData> => {
	let iconData: CollectionData;

	if (collection === "business-suite-v1") {
		iconData = (await import("../generated/assets/v1/SAP-icons-business-suite.json")).default;
	} else {
		iconData = (await import("../generated/assets/v2/SAP-icons-business-suite.json")).default;
	}

	if (typeof iconData === "string" && (iconData as string).endsWith(".json")) {
		throw new Error("[icons-business-suite] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import \"@ui5/webcomponents-icons-business-suite/dist/Assets-static.js\". Check the \"Assets\" documentation for more information.");
	}
	return iconData;
}

const registerLoaders = () => {
	registerIconLoader("business-suite-v1", loadIconsBundle);
	registerIconLoader("business-suite-v2", loadIconsBundle);
};

registerLoaders();