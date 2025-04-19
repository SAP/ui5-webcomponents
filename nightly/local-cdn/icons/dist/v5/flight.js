import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "flight";
const pathData = "M480 278q16 10 16 28v5q0 18-11.5 25t-27.5 7l-163-39v114l60 39q14 8 14 25 0 13-9 21.5t-21 8.5q-6 0-9-1l-73-23-73 23q-3 1-9 1-12 0-21-8.5t-9-21.5q0-17 14-25l60-39V304L55 343q-16 0-27.5-7T16 311v-5q0-18 16-28l186-109V38q0-16 11-27t27-11 27 11 11 27v131z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/flight";
export { pathData, ltr, accData };