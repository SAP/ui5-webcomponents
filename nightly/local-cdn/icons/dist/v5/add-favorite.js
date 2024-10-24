import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-favorite";
const pathData = "M210 186q-6 12-20 15L78 217l81 85q7 7 7 17v5l-20 115 72-39q6-3 12-3 11 0 18.5 7t7.5 18q0 15-14 23l-118 64q-6 3-12 3-11 0-18.5-7.5T86 486q0-1 .5-1.5t.5-2.5l26-154L7 216q-7-7-7-18 0-9 6.5-16t15.5-9l147-21 64-137q7-15 23-15t23 15l64 137 147 21q9 2 15.5 9t6.5 16q0 11-8 19l-32 31q-8 8-18 8-11 0-18-7.5t-7-18.5q0-8 4-13l-112-16q-13-3-19-15l-46-99zm276 188q11 0 18.5 7.5T512 400t-7.5 18-18.5 7h-61v61q0 11-7 18.5t-18 7.5-18.5-7.5T374 486v-61h-61q-11 0-18-7t-7-18 7-18.5 18-7.5h61v-61q0-11 7.5-18t18.5-7 18 7 7 18v61h61z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/add-favorite";
export { pathData, ltr, accData };