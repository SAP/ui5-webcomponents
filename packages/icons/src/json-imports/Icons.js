import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const loadIconsBundle = async () => {
    const iconData = (await import("../generated/assets/SAP-icons.json")).default;
    if (typeof iconData === "string" && iconData.endsWith(".json")) {
        throw new Error("[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import \"@ui5/webcomponents-icons/dist/Assets-static.js\". Check the \"Assets\" documentation for more information.");
    }
    return iconData;
}

registerIconLoader("SAP-icons", loadIconsBundle);