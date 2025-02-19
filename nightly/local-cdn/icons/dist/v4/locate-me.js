import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "locate-me";
const pathData = "M451.5 43q2-1 4-1 3 0 5.5 2.5t2.5 6.5q0 1-1 3l-198 395q-2 4-7 4-1 0-4.5-.5t-3.5-7.5V264q0-8-8-8h-182q-6 0-7-3.5t-1-4.5q0-5 5-7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/locate-me";
export { pathData, ltr, accData };