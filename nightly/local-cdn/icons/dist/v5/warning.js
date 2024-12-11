import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "warning";
const pathData = "M505 399q7 13 7 27 0 21-15.5 37.5T456 480H56q-25 0-40.5-16.5T0 426q0-14 7-27L208 59q8-14 21-20.5t27-6.5 27 6.5T304 59zm-249 17q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm32-240q0-14-9-23t-23-9-23 9-9 23v96q0 14 9 23t23 9 23-9 9-23v-96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/warning";
export { pathData, ltr, accData };