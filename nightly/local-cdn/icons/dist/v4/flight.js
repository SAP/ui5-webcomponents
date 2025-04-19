import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "flight";
const pathData = "M469.9 43q9 9 10 24.5t-3 32-12.5 32-17.5 24.5l-45 45 68 204-68 68-91-181-87 66v90l-32 32-62-98-98-62 32-32h91l66-87-181-90 68-68 203 68 45-45q14-14 37-24t45-10q21 0 32 11zm-46 90q7-7 12.5-17t8.5-20.5 3.5-19-1.5-11.5h-2q-2 0-3.5-.5t-3.5-.5q-15 0-33 8t-26 16l-59 59-204-67-22 22 175 88-98 130h-79l61 39 39 61v-78l131-99 88 176 22-23-68-203z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/flight";
export { pathData, ltr, accData };