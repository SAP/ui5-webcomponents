import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "building";
const pathData = "M454 267q11 0 18.5 7t7.5 18v194q0 11-7.5 18.5T454 512H58q-11 0-18.5-7.5T32 486V195q0-11 7.5-18t18.5-7h102v-47q0-13 12-22l58-41V26q0-11 7.5-18.5T256 0t18.5 7.5T282 26v34l58 41q12 9 12 22v144h102zm-102 51v46h77v-46h-77zm-51 142v-45h-90v45h90zm0-96v-46h-90v46h90zm-218 0h77v-46H83v46zm218-143h-90v46h90v-46zm-90-51h90v-33l-45-32-45 31v34zM83 221v46h77v-46H83zm0 240h77v-46H83v46zm346 0v-46h-77v46h77z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/building";
export { pathData, ltr, accData };