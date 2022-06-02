import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stock-requirements";
const pathData = "M0 111L92 0l91 111h-54v99H55v-99H0zm340 81v128H172V192h168zm-11 209h54v-99h74v99h55l-92 111z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "stock-requirements";
export { pathData, ltr, accData };