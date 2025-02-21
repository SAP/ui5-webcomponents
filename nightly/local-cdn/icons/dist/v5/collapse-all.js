import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "collapse-all";
const pathData = "M128 151v271q0 11-7.5 18.5T102 448t-18-7.5-7-18.5V151l-33 34q-7 7-18 7t-18.5-7.5T0 166q0-10 8-18l76-77q9-7 18-7 10 0 19 7l76 77q8 8 8 18 0 11-7.5 18.5T179 192t-18-7zm186-36q-11 0-18.5-7T288 90t7.5-18.5T314 64h172q11 0 18.5 7.5T512 90t-7.5 18-18.5 7H314z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/collapse-all";
export { pathData, ltr, accData };