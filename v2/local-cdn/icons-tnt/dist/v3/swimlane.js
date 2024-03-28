import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "swimlane";
const pathData = "M192 0h128c17 0 32 15 32 32v448c0 19-15 32-32 32H192c-19 0-32-13-32-32V32c0-17 13-32 32-32zm128 480V32H192v448h128z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/swimlane";
export { pathData, ltr, accData };