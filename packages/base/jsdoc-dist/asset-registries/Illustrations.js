import getSharedResource from "../getSharedResource.js";
const loaders = new Map();
const registry = getSharedResource("SVGIllustration.registry", new Map());
const illustrationPromises = getSharedResource("SVGIllustration.promises", new Map());
const ILLUSTRATION_NOT_FOUND = "ILLUSTRATION_NOT_FOUND";
const registerIllustration = (name, data) => {
    registry.set(`${data.set}/${name}`, {
        dialogSvg: data.dialogSvg,
        sceneSvg: data.sceneSvg,
        spotSvg: data.spotSvg,
        title: data.title,
        subtitle: data.subtitle,
    });
};
const registerIllustrationLoader = async (illustrationName, loader) => {
    loaders.set(illustrationName, loader);
};
const _loadIllustrationOnce = async (illustrationName) => {
    if (!illustrationPromises.has(illustrationName)) {
        if (!loaders.has(illustrationName)) {
            throw new Error(`No loader registered for the ${illustrationName} illustration. Probably you forgot to import the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module.`);
        }
        const loadIllustrations = loaders.get(illustrationName);
        illustrationPromises.set(illustrationName, loadIllustrations(illustrationName));
    }
    return illustrationPromises.get(illustrationName);
};
const getIllustrationDataSync = (illustrationName) => {
    let set = "fiori";
    if (illustrationName.startsWith("Tnt")) {
        set = "tnt";
        illustrationName = illustrationName.replace(/^Tnt/, "");
    }
    return registry.get(`${set}/${illustrationName}`);
};
const getIllustrationData = async (illustrationName) => {
    let set = "fiori";
    await _loadIllustrationOnce(illustrationName);
    if (illustrationName.startsWith("Tnt")) {
        set = "tnt";
        illustrationName = illustrationName.replace(/^Tnt/, "");
    }
    return registry.get(`${set}/${illustrationName}`) || ILLUSTRATION_NOT_FOUND;
};
export { getIllustrationDataSync, registerIllustration, registerIllustrationLoader, getIllustrationData, };
//# sourceMappingURL=Illustrations.js.map