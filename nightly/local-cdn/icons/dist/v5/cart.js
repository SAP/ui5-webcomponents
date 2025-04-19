import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cart";
const pathData = "M461 64q22 0 36.5 16t14.5 37q0 17-8 29l-81 130q-9 12-22 12H186l-23 45h259q11 0 18.5 7t7.5 18-7.5 18.5T422 384H122q-11 0-18.5-7.5T96 358q0-7 3-11l51-100L63 51H26q-11 0-18.5-7T0 26 7.5 7.5 26 0h54q16 0 23 15l22 49h336zm-1 51H147l54 122h186l73-117v-5zm-60 301q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm-256 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/cart";
export { pathData, ltr, accData };