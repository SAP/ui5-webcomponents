import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "write-new-document";
const pathData = "M32 480h64v32H33q-14 0-23.5-9T0 480V128L128 0h224q14 0 23 9.5t9 22.5v96h-32V32H160v96q0 14-9.5 23t-22.5 9H32v320zm475-282q5 5 5 11t-5 11L247 481q-1 1-17 6t-36 10q-23 7-51 15 9-27 17-49 7-18 12.5-33.5T179 413l261-260q5-5 11-5t11 5zm-97 74l-22-22-182 181 23 22zm63-63l-22-22-41 40 23 23z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/write-new-document";
export { pathData, ltr, accData };