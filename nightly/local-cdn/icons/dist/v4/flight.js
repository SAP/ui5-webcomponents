import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "flight";
const pathData = "M470 43q9 9 9.5 18.5T480 74q0 12-3.5 27t-12 30.5T447 156l-45 45 68 204-68 68-91-181-87 66v90l-32 32-62-98-98-62 32-32h91l66-87-181-90 68-68 203 68 45-45q14-14 37-24t45-10q21 0 32 11zm-46 90q7-7 12.5-17t8.5-20.5 3.5-15.5.5-7q0-6-2-8h-2q-2 0-3.5-.5T438 64q-15 0-33 8t-26 16l-59 59-204-67-22 22 175 88-98 130H92l61 39 39 61v-78l131-99 88 176 22-23-68-203z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/flight";
export { pathData, ltr, accData };