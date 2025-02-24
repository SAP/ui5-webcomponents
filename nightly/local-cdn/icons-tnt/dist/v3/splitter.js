import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "splitter";
const pathData = "M384 153c-14 0-25-11-25-25v-26h-52v128h52v-26c0-14 11-25 25-25h103c14 0 25 11 25 25v103c0 14-11 25-25 25H384c-14 0-25-11-25-25v-26h-52v128h52v-26c0-14 11-25 25-25h103c14 0 25 11 25 25v103c0 14-11 26-25 26H384c-14 0-25-12-25-26v-26h-52c-28 0-51-23-51-51V281h-77v51c0 28-22 51-51 51H51c-28 0-51-23-51-51V179c0-28 23-51 51-51h77c29 0 51 23 51 51v51h77V102c0-28 23-51 51-51h52V25c0-14 11-25 25-25h103c14 0 25 11 25 25v103c0 14-11 25-25 25H384zm26-102v51h51V51h-51zm0 179v51h51v-51h-51zm0 179v51h51v-51h-51z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/splitter";
export { pathData, ltr, accData };