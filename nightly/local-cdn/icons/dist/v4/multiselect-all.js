import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "multiselect-all";
const pathData = "M92 472l80-97 20 19L92 512l-60-59 20-20zm80-285l20 19L92 323l-60-59 20-19 40 38zm0-187l20 19L92 137 32 78l20-21 40 40zm292 65q16 0 16 16 0 6-4.5 11T464 97H273q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h191zm0 191q16 0 16 16 0 6-4.5 11t-11.5 5H273q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h191zm0 192q16 0 16 16 0 6-4.5 11t-11.5 5H273q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h191z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/multiselect-all";
export { pathData, ltr, accData };