import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "color-fill";
const pathData = "M416 0q35 0 57.5 23T496 80v320q0 34-22.5 57T416 480H96q-34 0-57-23t-23-57V80q0-34 23-57T96 0h320z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "color-fill";
export { pathData, ltr, accData };