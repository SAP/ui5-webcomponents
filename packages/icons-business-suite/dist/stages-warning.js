import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stages-warning";
const pathData = "M87 162L249 0l162 162-162 162zm162 127l126-127L249 36 122 162zm-19-187q0-19 19-19 7 0 14 4 6 4 6 15l-10 70q-1 6-3 9-2 1-7 1-4 0-6-1-2-2-4-9zm0 117q0-10 6-13 5-5 13-5t14 5q6 3 6 13 0 11-6 16-8 5-14 5-9 0-14-6t-5-15zM128 383v128H1V383h127zm383 128H383V383h128v128zM320 383v128H192V383h128zM96 415H33v64h63v-64zm192 0h-64v64h64v-64z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "stages-warning";
export { pathData, ltr, accData };