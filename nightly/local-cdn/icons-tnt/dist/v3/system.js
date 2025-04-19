import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "system";
const pathData = "M485 512H27c-15 0-27-12-27-26V27C0 12 12 0 27 0h458c15 0 27 12 27 27v459c0 14-12 26-27 26zM53 53v406h406V53H53z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/system";
export { pathData, ltr, accData };