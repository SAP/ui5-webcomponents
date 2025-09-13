import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "folder";
const pathData = "M0 64q0-14 9-23t23-9h180q7 0 12 5l19 22q5 5 12 5h225q14 0 23 9t9 23v352q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V64zm32 16v351q0 16 16 16h416q16 0 16-16V112q0-16-16-16H237q-7 0-12-5l-19-22q-5-5-12-5H48q-16 0-16 16zm64 144v-32q0-14 9-23t23-9h32q14 0 23 9t9 23v32q0 13-9 22.5t-23 9.5h-32q-14 0-23-9.5T96 224zm176 0h128q16 0 16 16 0 6-4.5 11t-11.5 5H272q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5zm0-64h128q16 0 16 16 0 6-4.5 11t-11.5 5H272q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5zm-16 145q0-7 5-11.5t11-4.5h128q16 0 16 16 0 6-4.5 11t-11.5 5H272q-6 0-11-5t-5-11z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/folder";
export { pathData, ltr, accData };