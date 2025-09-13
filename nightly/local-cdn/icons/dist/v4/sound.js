import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sound";
const pathData = "M384 64q13 0 22.5 9t9.5 23v320q0 14-9.5 23t-22.5 9q-10 0-20-7l-107-82q-4-3-15-5t-17-2h-97q-12 0-18.5-5t-9.5-11q-4-7-4-16V192q0-9 4-16 3-6 9.5-11t18.5-5h97q6 0 17-1.5t15-5.5l107-82q10-7 20-7zm0 32l-109 84q-14 9-31.5 10.5T225 192h-97v128h97q1 0 18.5 1.5T275 332l109 84V96z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/sound";
export { pathData, ltr, accData };