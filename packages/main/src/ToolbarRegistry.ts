import getSharedResource from "@ui5/webcomponents-base/dist/getSharedResource.js";

import type ToolbarItem from "./ToolbarItem.js";

const registry = getSharedResource<Map<string, typeof ToolbarItem>>("ToolbarItem.registry", new Map());

const registerToolbarItem = (ElementClass: typeof ToolbarItem) => {
	registry.set(ElementClass.name, ElementClass);
};

const getRegisteredToolbarItem = (name: string) => {
	if (!registry.has(name)) {
		throw new Error(`No template found for ${name}`);
	}

	return registry.get(name);
};

const getRegisteredStyles = () => {
	return [...registry.values()].map((ElementClass: typeof ToolbarItem) => ElementClass.styles);
};

const getRegisteredStaticAreaStyles = () => {
	return [...registry.values()].map((ElementClass: typeof ToolbarItem) => ElementClass.staticAreaStyles);
};

const getRegisteredDependencies = () => {
	return [...registry.values()].map((ElementClass: typeof ToolbarItem) => ElementClass.dependencies).flat();
};

export {
	registerToolbarItem,
	getRegisteredToolbarItem,
	getRegisteredStyles,
	getRegisteredStaticAreaStyles,
	getRegisteredDependencies,
};
