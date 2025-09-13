import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist-item";
const pathData = "M439 0q31 0 52 21.5T512 73v150q0 33-25 55L280 503q-9 9-24 9-14 0-23-9L26 278Q0 255 0 223V73q0-30 21.5-51.5T73 0h366zm36 73q0-15-10-25.5T439 37H73q-15 0-25.5 10.5T37 73v150q0 16 13 27l206 225 207-225q12-10 12-27V73z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/checklist-item";
export { pathData, ltr, accData };