import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "signature";
const pathData = "M472 90q8 8 8 18t-8 18L254 345q-9 7-18 7h-82q-11 0-18.5-7.5T128 326v-82q0-10 8-18L354 7q9-7 18-7 11 0 18 7zM336 190l-46-46-100 100 46 46zm82-82l-46-46-45 46 45 45zm-92 353q11 0 18.5 7t7.5 18-7.5 18.5T326 512H96q-27 0-45.5-19.5T32 447q0-28 24-50l29-26q8-6 17-6 11 0 18.5 7t7.5 18q0 12-9 20l-30 26q-6 6-6 11t4 9.5 9 4.5h230z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/signature";
export { pathData, ltr, accData };