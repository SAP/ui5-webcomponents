import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "signature";
const pathData = "M473 89q7 7 7 19 0 11-7 18L254 344q-8 8-18 8h-82q-11 0-18.5-7.5T128 326v-82q0-10 8-18L354 7q9-7 18-7 10 0 19 7zm-55 19l-46-46-45 46 45 45zm-82 82l-46-46-100 100 46 46zm-10 271q11 0 18.5 7t7.5 18-7.5 18.5T326 512H97q-27 0-46-19t-19-46q0-29 24-50l30-26q6-6 16-6 11 0 18.5 7t7.5 18-9 20l-30 26q-6 6-6 11t4 9.5 10 4.5h229z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/signature";
export { pathData, ltr, accData };