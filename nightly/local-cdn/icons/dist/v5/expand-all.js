import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expand-all";
const pathData = "M161 327q7-7 18-7t18.5 7.5T205 346q0 10-8 18l-77 77q-7 7-18 7-9 0-18-7L7 364q-7-7-7-18t7.5-18.5T25 320q12 0 19 7l33 34V90q0-11 7-18.5t18-7.5 18.5 7.5T128 90v271zm325-39q11 0 18.5 7.5T512 314t-7.5 18-18.5 7H313q-11 0-18-7t-7-18 7-18.5 18-7.5h173zm0 109q11 0 18.5 7t7.5 18-7.5 18.5T486 448H313q-11 0-18-7.5t-7-18.5 7-18 18-7h173zM313 115q-11 0-18-7t-7-18 7-18.5 18-7.5h173q11 0 18.5 7.5T512 90t-7.5 18-18.5 7H313zm173 58q11 0 18.5 7t7.5 18-7.5 18.5T486 224H313q-11 0-18-7.5t-7-18.5 7-18 18-7h173z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/expand-all";
export { pathData, ltr, accData };