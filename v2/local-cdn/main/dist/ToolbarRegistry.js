import getSharedResource from "@ui5/webcomponents-base/dist/getSharedResource.js";
const registry = getSharedResource("ToolbarItem.registry", new Map());
const registerToolbarItem = (ElementClass) => {
    registry.set(ElementClass.name, ElementClass);
};
const getRegisteredToolbarItem = (name) => {
    if (!registry.has(name)) {
        throw new Error(`No template found for ${name}`);
    }
    return registry.get(name);
};
const getRegisteredStyles = () => {
    return [...registry.values()].map((ElementClass) => ElementClass.styles);
};
const getRegisteredStaticAreaStyles = () => {
    return [...registry.values()].map((ElementClass) => ElementClass.staticAreaStyles);
};
const getRegisteredDependencies = () => {
    return [...registry.values()].map((ElementClass) => ElementClass.dependencies).flat();
};
export { registerToolbarItem, getRegisteredToolbarItem, getRegisteredStyles, getRegisteredStaticAreaStyles, getRegisteredDependencies, };
//# sourceMappingURL=ToolbarRegistry.js.map