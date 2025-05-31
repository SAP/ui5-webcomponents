import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "aggregator";
const pathData = "M128 358c14 0 26 11 26 25v26h51V281h-51v26c0 14-12 25-26 25H26c-15 0-26-11-26-25V204c0-14 11-25 26-25h102c14 0 26 11 26 25v26h51V102h-51v26c0 14-12 25-26 25H26c-15 0-26-11-26-25V25C0 11 11 0 26 0h102c14 0 26 11 26 25v26h51c28 0 51 23 51 51v128h77v-51c0-28 23-51 51-51h77c28 0 51 23 51 51v153c0 28-23 51-51 51h-77c-28 0-51-23-51-51v-51h-77v128c0 28-23 51-51 51h-51v26c0 14-12 26-26 26H26c-15 0-26-12-26-26V383c0-14 11-25 26-25h102zm-26-256V51H51v51h51zm0 179v-51H51v51h51zm0 179v-51H51v51h51z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/aggregator";
export { pathData, ltr, accData };