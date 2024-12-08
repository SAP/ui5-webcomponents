import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "system";
const pathData = "M53 459h406V53H53v406zm432 53H27q-11 0-19-7.5T0 486V27Q0 16 8 8t19-8h458q11 0 19 8t8 19v459q0 11-8 18.5t-19 7.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/system";
export { pathData, ltr, accData };