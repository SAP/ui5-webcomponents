import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "change-request";
const pathData = "M52.5 512V0h408v512h-408zm34-32h339V35h-339v445zm250-352l51 51-26 26-51-51zm-179 179l128-129 51 52-128 128zm-26 77v-51l51 51h-51z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "change-request";
export { pathData, ltr, accData };