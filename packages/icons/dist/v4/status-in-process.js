import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-in-process";
const pathData = "M511 450q1 2 1 10t-5.5 14-14.5 6H22q-10 0-16-6t-6-14q0-2 2-10L237 12q7-12 19-12 11 0 19 12zm-89-34L256 117 91 416h331z";
const ltr = false;
const accData = null;
const collection = "SAP-icons";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "status-in-process";
export { pathData, ltr, accData };