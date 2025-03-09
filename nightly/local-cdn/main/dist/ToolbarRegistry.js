import getSharedResource from "@ui5/webcomponents-base/dist/getSharedResource.js";
const registry = getSharedResource("ToolbarItem.registry", new Map());
const registerToolbarItem = (ElementClass) => {
    registry.set(ElementClass.getMetadata().getPureTag(), ElementClass);
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
export { registerToolbarItem, getRegisteredToolbarItem, getRegisteredStyles, };
//# sourceMappingURL=ToolbarRegistry.js.map