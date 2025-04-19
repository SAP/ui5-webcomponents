import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "railcar";
const pathData = "M17 145V74C17 34 49 2 89 2h334c40 0 72 32 72 72v71c0 32-20 58-48 68-7 3-16 4-24 4h-24v48c0 13-11 24-24 24H136c-15 0-23-11-23-24v-48H89c-40 0-72-32-72-72zm72-95c-13 0-24 11-24 24v71c0 13 11 24 24 24h47c13 0 24 11 24 24v48h191v-48c0-13 9-24 24-24h48c13 0 24-11 24-24V74c0-13-11-24-24-24H89zM41 431c-13 0-24-11-24-24 0-15 11-24 24-24h29c11-27 35-47 66-47s56 20 67 47h82c11-27 35-47 66-47s56 20 68 48c1 0 3-1 4-1h48c13 0 24 9 24 24v49c0 13-11 24-24 24s-24-11-24-24v-25h-24c-1 0 0-2-3-2 0 1 0 1-1 2-9 30-36 49-67 49-32 0-59-21-68-49h-80c-9 28-36 49-68 49s-58-21-67-49H41zm95-47c-15 0-23 11-23 24 0 11 5 20 16 23 2 1 4 1 7 1 2 0 5 0 7-1 10-3 17-12 17-23 0-13-11-24-24-24zm216 0c-13 0-24 11-24 24 0 11 7 20 17 23 2 1 5 1 7 1s5 0 7-1c9-3 16-12 16-23 0-13-10-24-23-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/railcar";
export { pathData, ltr, accData };