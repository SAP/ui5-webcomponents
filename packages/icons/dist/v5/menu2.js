import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "menu2";
const pathData = "M32.5 127q-14 0-23-8.5T.5 96q0-15 9-23.5t23-8.5h447q32 0 32 32 0 31-32 31h-447zm447 96q15 0 23.5 9t8.5 23-8.5 23-23.5 9h-447q-14 0-23-9t-9-23 9-23 23-9h447zm0 160q15 0 23.5 9t8.5 23-8.5 23-23.5 9h-447q-14 0-23-9t-9-23 9-23 23-9h447z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "menu2";
export { pathData, ltr, accData };