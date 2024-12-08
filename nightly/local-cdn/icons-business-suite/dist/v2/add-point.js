import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-point";
const pathData = "M422.5 362h52c13 0 26 12 26 26 0 13-13 26-26 26h-52v50c0 14-11 26-25 26-13 0-26-12-26-26v-50h-51c-14 0-26-13-26-26 0-14 12-26 26-26h51v-52c0-14 13-25 26-25 14 0 25 11 25 25v52zM165.5 1c85 0 155 70 155 155 0 84-70 154-155 154-84 0-154-70-154-154 0-85 70-155 154-155z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/add-point";
export { pathData, ltr, accData };