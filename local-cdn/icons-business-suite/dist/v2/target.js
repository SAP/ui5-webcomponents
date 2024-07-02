import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "target";
const pathData = "M457.5 328c15 0 26 11 26 26v50c0 42-32 76-75 76h-304c-42 0-76-34-76-76v-50c0-15 11-26 25-26 15 0 26 11 26 26v50c0 14 11 25 25 25h304c14 0 24-11 24-25v-50c0-15 11-26 25-26zm-221 15l-99-98c-11-11-11-25 0-36 10-11 24-11 35 0l59 59V25c0-15 10-25 25-25s24 10 24 25v243l59-59c11-11 24-11 35 0s11 25 0 36l-98 98c-5 6-9 11-20 11s-13-5-20-11z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/target";
export { pathData, ltr, accData };