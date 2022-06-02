import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "doc-attachment";
const pathData = "M1 480V128L129 0h224q13 0 22.5 9t9.5 23v64h-32V32H161v96q0 14-9.5 23t-23.5 9H33v320h320v-48h32v48q0 14-9 23t-23 9H33q-14 0-23-9t-9-23zm255-335l37 165 54-165h36l55 165 36-165h37l-55 220h-37l-53-165-55 165h-37l-55-220h37z";
const ltr = false;
const accData = null;
const collection = "SAP-icons";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "doc-attachment";
export { pathData, ltr, accData };