import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bullet-chart";
const pathData = "M391 206h96c14 0 26 12 26 26v45c0 14-12 26-26 26h-96v29c0 14-11 25-25 25s-25-11-25-25v-29H27c-14 0-25-12-25-26v-45c0-14 11-26 25-26h314v-28c0-14 11-26 25-26s25 12 25 26v28z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/bullet-chart";
export { pathData, ltr, accData };