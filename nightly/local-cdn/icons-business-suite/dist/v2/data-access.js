import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data-access";
const pathData = "M494 131c1 2 1 5 1 8 0 5 0 8-1 9-3 4-5 7-6 8l-94 94c-5 5-10 7-17 7-6 0-11-2-16-7-11-9-11-24 0-33l52-54H41c-13 0-24-11-24-24s11-23 24-23h372l-52-54c-11-9-11-24 0-33 9-11 24-11 33 0l94 94c3 3 3 5 6 8zM99 358h372c13 0 24 11 24 24s-11 24-24 24H99l52 53c11 9 11 25 0 34-5 5-10 7-16 7-7 0-12-2-17-7l-94-94c-3-3-3-5-6-8-1-1-1-4-1-9s0-8 1-9c3-3 3-4 6-7v-1l94-94c9-11 24-11 33 0 11 9 11 25 0 34z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/data-access";
export { pathData, ltr, accData };