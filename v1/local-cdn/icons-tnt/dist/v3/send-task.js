import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "send-task";
const pathData = "M254 290L23 98c5-1 8-2 9-2h448c4 0 6 0 7 1zm67 33l168 156c-1 1-4 1-9 1H32c-1 0-5-1-12-2l167-155-25-22C79 376 40 413 20 430L0 448V128c0-3 0-5 1-6l253 211 257-213c1 1 1 4 1 8v320c0 3 0 5-1 6L347 302z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/send-task";
export { pathData, ltr, accData };