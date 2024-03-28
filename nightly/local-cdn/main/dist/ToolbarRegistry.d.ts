import type ToolbarItem from "./ToolbarItem.js";
declare const registerToolbarItem: (ElementClass: typeof ToolbarItem) => void;
declare const getRegisteredToolbarItem: (name: string) => typeof ToolbarItem | undefined;
declare const getRegisteredStyles: () => import("@ui5/webcomponents-base/dist/types.js").ComponentStylesData[];
declare const getRegisteredStaticAreaStyles: () => import("@ui5/webcomponents-base/dist/types.js").ComponentStylesData[];
declare const getRegisteredDependencies: () => typeof import("@ui5/webcomponents-base/dist/UI5Element.js").default[];
export { registerToolbarItem, getRegisteredToolbarItem, getRegisteredStyles, getRegisteredStaticAreaStyles, getRegisteredDependencies, };
