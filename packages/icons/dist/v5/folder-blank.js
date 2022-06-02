import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "folder-blank";
const pathData = "M435.5 71q32 0 54 22t22 55v255q0 33-22 55t-54 22h-358q-33 0-55-22t-22-55V97q0-33 22-55t55-22h128q8 0 18 8l43 43h169zm25 77q0-11-7-18.5t-18-7.5h-179q-11 0-18-7l-44-44h-117q-11 0-18.5 7t-7.5 19v306q0 12 7.5 19t18.5 7h358q25 0 25-26V148z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "folder-blank";
export { pathData, ltr, accData };