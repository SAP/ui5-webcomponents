import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "paper-plane";
const pathData = "M304.275 403l100-256-144 145zm61-295l-256 100 111 44zm133-94q13 13 6 30l-174 444q-7 18-26 18-18 0-25-17l-73-183-183-73q-17-7-17-25 0-19 18-26l444-174q17-7 30 6z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "paper-plane";
export { pathData, ltr, accData };