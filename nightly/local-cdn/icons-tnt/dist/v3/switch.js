import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "switch";
const pathData = "M409 225c58 0 103 38 103 87v82c0 48-45 86-103 86H103C45 480 0 442 0 394v-82c0-33 21-61 51-76v-50c0-14 12-25 26-25s26 11 26 25v39h51V117H77c-14 0-26-11-26-25 0-15 12-26 26-26h101c12 0 22 8 25 20 1 3 2 7 2 11v128h102V97c0-2 1-4 1-4 0-16 11-27 25-27h101c15 0 26 11 26 26 0 14-11 25-26 25h-76v108h51zm52 178V301c0-14-11-25-26-25-14 0-26 11-26 25v102c0 15 12 26 26 26 15 0 26-11 26-26zm-90 0V301c0-14-11-25-26-25-13 0-25 11-25 25v102c0 15 12 26 25 26 15 0 26-11 26-26zm-90 0V301c0-14-11-25-25-25s-25 11-25 25v102c0 15 11 26 25 26s25-11 25-26zm-89 0V301c0-14-12-25-25-25-15 0-26 11-26 25v102c0 15 11 26 26 26 13 0 25-11 25-26zm-89 0V301c0-14-12-25-26-25s-26 11-26 25v102c0 15 12 26 26 26s26-11 26-26z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/switch";
export { pathData, ltr, accData };