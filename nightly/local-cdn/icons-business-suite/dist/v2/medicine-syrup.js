import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "medicine-syrup";
const pathData = "M70 285c0-35 16-70 40-94l32-33c5-5 8-12 8-19v-5h-27c-15 0-26-11-26-26V28c0-15 11-27 26-27h267c15 0 26 12 26 27v80c0 15-11 26-26 26h-27v5c0 8 3 12 8 19l32 33c26 26 39 57 39 94v115c0 44-35 80-79 80H150c-44 0-80-36-80-80V285zm53 0v115c0 15 12 27 27 27h213c15 0 27-12 27-27V285c0-21-8-40-24-56l-33-32c-16-15-24-37-24-58v-5H202v5c0 21-6 41-22 58l-32 32c-16 13-25 33-25 56zm79 36c-16 0-25-11-25-27s9-27 25-27h27v-26c0-16 11-27 27-27s27 11 27 27v26h26c16 0 27 11 27 27s-11 27-27 27h-26v27c0 16-11 25-27 25s-27-9-27-25v-27h-27zM150 55v27h213V55H150z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/medicine-syrup";
export { pathData, ltr, accData };