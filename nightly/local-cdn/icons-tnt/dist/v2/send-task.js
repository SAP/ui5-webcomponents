import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "send-task";
const pathData = "M489 479q-2 1-9 1H32q-2 0-12-2l167-155-25-22q-62 56-94.5 86T20 430L0 448V128q0-5 1-6l253 211 257-213q1 2 1 8v320q0 5-1 6L347 302l-26 21zM23 98q8-2 9-2h448q6 0 7 1L254 290z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/send-task";
export { pathData, ltr, accData };