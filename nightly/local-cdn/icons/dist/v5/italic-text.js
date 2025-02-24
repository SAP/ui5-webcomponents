import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "italic-text";
const pathData = "M224 480q-13 0-24.5-6T179 457.5 165 434t-5-27q0-5 1-10.5t3-10.5l62-175h-40q-11 0-18.5-7t-7.5-18 7.5-18.5T186 160h76q11 0 18.5 7.5T288 186q0 2-2 8l-74 208q-1 2-1 7 0 8 5.5 14t14.5 6q11 0 18 7t7 18-8 18.5-24 7.5zm80-448q19 0 33.5 14T352 80t-14.5 34-33.5 14q-20 0-34-14t-14-34 14-34 34-14z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/italic-text";
export { pathData, ltr, accData };