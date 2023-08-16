import getSharedResource from "@ui5/webcomponents-base/dist/getSharedResource.js";

import type IToolbarItem from "../ToolbarItem.js";

const registry = getSharedResource<Map<string, typeof IToolbarItem>>("ToolbarItem.registry", new Map());

export const registerToolbarItem = (ElementClass: typeof IToolbarItem) => {
	registry.set(ElementClass.name, ElementClass);
};

export const getToolbarItem = (name: string) => {
	if (!registry.has(name)) {
		throw new Error(`No template found for ${name}`);
	}

	return registry.get(name);
};
