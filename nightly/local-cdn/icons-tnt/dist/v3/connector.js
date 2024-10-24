import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "connector";
const pathData = "M16 180h480c11 0 16 5 16 16s-5 16-16 16H16c-11 0-16-5-16-16s5-16 16-16zm459 99v-11c11-7 20-12 27-24h8v96h-12v-75c-4 4-8 7-11 8-3 3-7 5-12 6zM16 257c5-5 8-9 9-13h7v96H21v-75c-3 3-6 6-10 8-4 3-8 5-11 6v-11c7-3 11-7 16-11z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/connector";
export { pathData, ltr, accData };