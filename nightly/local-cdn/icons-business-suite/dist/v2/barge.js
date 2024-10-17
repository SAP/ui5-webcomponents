import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "barge";
const pathData = "M26.9 199h12v-51c0-14 12-26 26-26h102c14 0 26 12 26 26v51h12c15 0 26 11 26 25v51h255c9 0 18 5 23 14 5 8 4 18-2 26l-51 76c-4 7-12 12-21 12h-357c-11 0-22-7-25-17l-51-154c-2-8 0-16 4-23 5-7 13-10 21-10zm64 0h51v-26h-51v26zm5 153h326l16-26h-233c-14 0-25-11-25-25v-51h-118z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/barge";
export { pathData, ltr, accData };