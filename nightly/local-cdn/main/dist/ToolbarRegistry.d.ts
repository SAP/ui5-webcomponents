import type ToolbarItem from "./ToolbarItem.js";
declare const registerToolbarItem: (ElementClass: typeof ToolbarItem) => void;
declare const getRegisteredToolbarItem: (name: string) => typeof ToolbarItem | undefined;
declare const getRegisteredStyles: () => import("@ui5/webcomponents-base/dist/types.js").ComponentStylesData[];
export { registerToolbarItem, getRegisteredToolbarItem, getRegisteredStyles, };
