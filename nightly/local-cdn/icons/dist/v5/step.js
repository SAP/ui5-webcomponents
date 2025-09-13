import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "step";
const pathData = "M160 448q-13 0-22.5-9.5T128 416t9-23l138-137-138-137q-9-11-9-23 0-13 9.5-22.5T160 64t23 9l160 160q9 10 9 23 0 12-9 23L183 439q-10 9-23 9zM26 384q-11 0-18.5-7.5T0 358q0-10 8-18l89-84-89-84q-8-8-8-18 0-11 7.5-18.5T26 128q10 0 17 7l109 102q8 8 8 19t-8 19L43 377q-7 7-17 7zm352 0q-11 0-18.5-7.5T352 358q0-10 8-18l89-84-89-84q-8-8-8-18 0-11 7.5-18.5T378 128q10 0 17 7l109 102q8 8 8 19t-8 19L395 377q-7 7-17 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/step";
export { pathData, ltr, accData };