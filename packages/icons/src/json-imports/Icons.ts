import { registerIconLoader, CollectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const loadIconsBundle = async (collection: string): Promise<CollectionData> => {
    let iconData: CollectionData;

	if (collection === "SAP-icons-v5") {
		iconData = (await import(`../generated/assets/v5/SAP-icons.json`)).default;
	} else {
		iconData = (await import(`../generated/assets/v4/SAP-icons.json`)).default;
	}

    if (typeof iconData === "string" && (iconData as string).endsWith(".json")) {
        throw new Error("[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import \"@ui5/webcomponents-icons/dist/Assets-static.js\". Check the \"Assets\" documentation for more information.");
    }
    return iconData;
}

const registerLoaders = () => {
	registerIconLoader("SAP-icons", loadIconsBundle);
	registerIconLoader("SAP-icons-v5", loadIconsBundle);
};

registerLoaders();
