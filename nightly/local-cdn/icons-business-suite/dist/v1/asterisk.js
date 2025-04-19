import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "asterisk";
const pathData = "M36.813 147c-1-4 0-8 2-12l17-30c4-6 9-9 14-9 3 0 6 1 10 3l141 82V17c0-5 2-9 5-12 4-3 8-5 12-5h34c12 0 18 6 18 17v163l142-82c2-1 5-2 8-2 1 0 3 0 5 1 5 1 8 3 10 7l17 30c6 10 4 18-6 24l-142 82 142 82c9 5 12 14 6 23l-17 30c-2 4-5 6-10 8-2 0-4 1-5 1-3 0-6-1-9-3l-141-81v163c0 11-6 17-18 17h-34c-9 0-17-8-17-17V299l-141 81c-4 2-7 3-10 3-6 0-10-3-14-9l-16-30c-3-4-3-8-2-12 1-5 4-9 8-11l141-81-142-82c-4-2-6-6-8-11z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/asterisk";
export { pathData, ltr, accData };