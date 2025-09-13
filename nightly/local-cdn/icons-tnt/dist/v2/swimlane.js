import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "swimlane";
const pathData = "M320 0q13 0 22.5 9.5T352 32v448q0 14-9.5 23t-22.5 9H192q-14 0-23-9t-9-23V32q0-13 9-22.5T192 0h128zm0 32H192v448h128V32z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/swimlane";
export { pathData, ltr, accData };