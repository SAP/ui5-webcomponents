import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "swimlane";
const pathData = "M196 460h120V51H196v409zm145 51H170q-11 0-18-7t-7-18V26q0-11 7-18.5T170 0h171q11 0 18.5 7.5T367 26v460q0 11-7.5 18t-18.5 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/swimlane";
export { pathData, ltr, accData };