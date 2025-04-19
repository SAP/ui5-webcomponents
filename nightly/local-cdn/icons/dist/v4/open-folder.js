import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "open-folder";
const pathData = "M503 75q10 9 10 21v3l-28 351q-1 13-11 21-7 9-21 9H122q-23 0-31-24L1 177q0-9 8-14 4-2 10-2h86q6 0 11 5 4 4 7 10 4 8 5 11 1 2 1 4v2h64l25-105q6-23 31-23h230q14 0 24 10zm-65 375q8 0 8-5 0-3-1-6l-72-204q-5-10-15-10H58l69 219q2 6 7 6h304zm42-336v-2q0-15-16-15H256q-12 0-15 12l-16 84h153q26 0 31 22l51 171z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/open-folder";
export { pathData, ltr, accData };