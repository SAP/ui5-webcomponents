import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-process";
const pathData = "M288 128q0 11-8 19L171 249q-7 7-17 7-11 0-18.5-7.5T128 230q0-10 8-18l89-84-89-84q-8-8-8-18 0-11 7.5-18.5T154 0q10 0 17 7l109 102q8 8 8 19zm11 121q-7 7-17 7-11 0-18.5-7.5T256 230q0-10 8-18l89-84-89-84q-8-8-8-18 0-11 7.5-18.5T282 0q10 0 17 7l109 102q8 8 8 19t-8 19zM160 128q0 11-8 19L43 249q-7 7-17 7-11 0-18.5-7.5T0 230q0-10 8-18l89-84L8 44q-8-8-8-18Q0 15 7.5 7.5T26 0q10 0 17 7l109 102q8 8 8 19zm326 246q11 0 18.5 7.5T512 400t-7.5 18.5T486 426h-60v60q0 11-7.5 18.5T400 512t-18.5-7.5T374 486v-60h-60q-11 0-18.5-7.5T288 400t7.5-18.5T314 374h60v-60q0-11 7.5-18.5T400 288t18.5 7.5T426 314v60h60z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/add-process";
export { pathData, ltr, accData };