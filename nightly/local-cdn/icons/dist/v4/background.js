import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "background";
const pathData = "M368 192q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm80-160q14 0 23 9t9 23v384q0 14-9 23t-23 9H64q-13 0-22.5-9T32 448V64q0-14 9.5-23T64 32h384zm0 32H64v384h384V64zm-92 288l-58-85 22-43 96 128h-60zm-7 32H94l130-183z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/background";
export { pathData, ltr, accData };