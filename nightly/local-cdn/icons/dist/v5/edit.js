import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "edit";
const pathData = "M505 94q7 9 7 18 0 11-6 17L130 505q-7 7-18 7H26q-11 0-18.5-7.5T0 486v-86q1-5 1.5-8.5T6 384L382 7q9-7 18-7t18 7zM364 198l-50-50L62 400l50 50zm86-86l-50-50-50 50 50 50z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/edit";
export { pathData, ltr, accData };