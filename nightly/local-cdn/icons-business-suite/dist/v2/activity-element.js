import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "activity-element";
const pathData = "M447 312V145c0-13-10-24-23-24H89c-13 0-24 11-24 24v167c0 13 11 24 24 24h72v-24c0-27 21-47 48-47h95c26 0 48 20 48 47v24h72c13 0 23-11 23-24zM89 73h335c39 0 71 32 71 72v167c0 40-32 72-71 72h-72v48c0 27-22 48-48 48h-95c-27 0-48-21-48-48v-48H89c-40 0-72-32-72-72V145c0-40 32-72 72-72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/activity-element";
export { pathData, ltr, accData };