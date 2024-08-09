import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data";
const pathData = "M230 61v67q0 21-15 36t-36 15h-66l-11 10v271h308V51H240zm205 450H77q-11 0-18.5-7T51 486V179q0-11 8-19L212 7q7-7 18-7h205q11 0 18.5 7.5T461 26v460q0 11-7.5 18t-18.5 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/data";
export { pathData, ltr, accData };