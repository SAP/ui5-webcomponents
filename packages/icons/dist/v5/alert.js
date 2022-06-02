import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "alert";
const pathData = "M200 34q9-17 24-25.5T256 0t32 8.5T312 34l192 353q8 13 8 30 0 25-18 44.5T448 481H64q-28 0-46-19.5T0 417q0-17 8-30zm88 119q0-13-9-22.5t-23-9.5-23 9.5-9 22.5v128q0 14 9 23.5t23 9.5 23-9.5 9-23.5V153zm6 238q0-16-11-27t-27-11-27 11-11 27q0 17 11 28t27 11 27-11 11-28z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "alert";
export { pathData, ltr, accData };