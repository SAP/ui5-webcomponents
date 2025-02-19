import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "note";
const pathData = "M485 512H27c-15 0-27-12-27-27V26C0 11 12 0 27 0h458c15 0 27 11 27 26v459c0 15-12 27-27 27zM53 53v405h406V53H53zm309 123h-79v225c0 15-12 27-27 27s-27-12-27-27V176h-79c-14 0-26-11-26-26s12-27 26-27h212c15 0 26 12 26 27s-11 26-26 26z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/note";
export { pathData, ltr, accData };