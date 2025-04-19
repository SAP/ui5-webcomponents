import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "currency";
const pathData = "M512 384q0 13-9 22.5t-23 9.5H32q-14 0-23-9t-9-23V125q2-12 10.5-20.5T30 96h450q14 0 23 9t9 23v256zM32 352q14 0 23 9t9 23h384q0-14 9-23t23-9V160q-14 0-23-9t-9-23H64q0 14-9 23t-23 9v192zm224-176q33 0 56.5 23.5T336 256t-23.5 56.5T256 336t-56.5-23.5T176 256t23.5-56.5T256 176zm0 128q20 0 34-14t14-34-14-34-34-14-34 14-14 34 14 34 34 14zm-128-48q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23zm256 0q0-14 9-23t23-9 23 9 9 23-9 23-23 9-23-9-9-23z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/currency";
export { pathData, ltr, accData };