import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "warehouse";
const pathData = "M427 429h34V275H51v154h32v-77c0-25 20-44 45-44s44 19 44 44v77h38v-77c0-25 21-44 46-44s44 19 44 44v77h38v-77c0-25 20-44 45-44s44 19 44 44v77zM51 224h410c28 0 51 23 51 51v154c0 28-23 51-51 51H51c-28 0-51-23-51-51V275c0-28 23-51 51-51zm83-37H25c-8 0-13-4-13-12v-67c0-10 11-16 19-11l111 66c11 7 5 24-8 24zm173 0H196c-7 0-13-4-13-12v-67c0-10 11-16 20-11l110 66c11 7 7 24-6 24zm171 0H368c-8 0-13-4-13-12v-67c0-10 10-16 19-11l111 66c10 7 6 24-7 24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/warehouse";
export { pathData, ltr, accData };