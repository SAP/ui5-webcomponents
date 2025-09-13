import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-document";
const pathData = "M16 128L144 0h224q14 0 23 9t9 23v192h-32V32H176v96q0 13-9.5 22.5T144 160H48v320h192v32H49q-14 0-23.5-9.5T16 480V128zm352 256v-96h32v96h96v32h-96v96h-32v-96h-96v-32h96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/add-document";
export { pathData, ltr, accData };