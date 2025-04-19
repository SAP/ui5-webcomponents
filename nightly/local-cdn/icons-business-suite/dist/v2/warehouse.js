import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "warehouse";
const pathData = "M51 480c-28 0-51-23-51-51V275c0-28 23-51 51-51h410c28 0 51 23 51 51v154c0 28-23 51-51 51H51zm0-51h32v-77c0-25 20-44 45-44s44 19 44 44v77h38v-77c0-25 21-44 46-44s44 19 44 44v77h38v-77c0-25 20-44 45-44s44 19 44 44v77h34V275H51v154zm145-242c-9 0-13-4-13-12v-67c0-8 6-13 13-13 2 0 5 1 7 2l110 66c11 7 7 24-6 24H196zm159-12v-67c0-8 5-13 12-13 2 0 5 1 7 2l111 66c11 7 6 24-7 24H368c-9 0-13-4-13-12zM25 187c-9 0-13-4-13-12v-67c0-8 6-13 12-13 3 0 5 1 7 2l111 66c11 7 5 24-8 24H25z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/warehouse";
export { pathData, ltr, accData };