import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "share";
const pathData = "M486 150q11 0 18 7.5t8 17.5q0 12-8 19l-54 55q-7 7-18 7t-18-7l-54-55q-8-7-8-19 1-11 8-18t18-7q10 0 18 8l10 11v-47q0-29-20.5-50T336 51H90q-11 0-18.5-7T64 26t7.5-18.5T90 0h246q25 0 47.5 9.5t39 26 26 39T458 122v47l10-11q8-8 18-8zm-64 311q11 0 18.5 7t7.5 18-7.5 18.5T422 512H176q-25 0-47.5-9.5t-39-26-26-39T54 390v-47l-10 11q-8 8-18 8-11 0-18-7.5T0 337q0-12 8-19l54-55q7-7 18-7t18 7l54 55q8 7 8 19-1 11-8 18t-18 7q-10 0-18-8l-10-11v47q0 29 20.5 50t49.5 21h246z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/share";
export { pathData, ltr, accData };