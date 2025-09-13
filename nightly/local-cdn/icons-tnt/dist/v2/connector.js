import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "connector";
const pathData = "M16 180h480q16 0 16 16t-16 16H16q-16 0-16-16t16-16zm459 88q8-5 15-10t12-14h8v96h-12v-75q-6 6-11 8-4 4-12 6v-11zM16 257q7-7 9-13h7v96H21v-75q-4 5-10 8-6 4-11 6v-11q5-2 8.5-5t7.5-6z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/connector";
export { pathData, ltr, accData };