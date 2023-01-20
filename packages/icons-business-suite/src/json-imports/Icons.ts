import { registerIconLoader, CollectionData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const loadIconsBundle = async (): Promise<CollectionData> => {
	const iconData = (await import("../generated/assets/SAP-icons-business-suite.json")).default;
    if (typeof iconData === "string" && (iconData as string).endsWith(".json")) {
        throw new Error("[icons-business-suite] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import \"@ui5/webcomponents-icons-business-suite/dist/Assets-static.js\". Check the \"Assets\" documentation for more information.");
    }
    return iconData;
}

registerIconLoader("business-suite", loadIconsBundle);
