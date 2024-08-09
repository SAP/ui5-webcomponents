import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "blank-tag";
const pathData = "M486 448H140q-14 0-23-12L6 270q-5-7-5-14t5-14L117 76q9-12 23-12h346q11 0 19 8t8 20v328q0 12-8 20t-19 8zm-333-51h309V115H153L58 256zm24-93q-19 0-33.5-14T129 256t14.5-34 33.5-14q20 0 34 14t14 34-14 34-34 14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/blank-tag";
export { pathData, ltr, accData };