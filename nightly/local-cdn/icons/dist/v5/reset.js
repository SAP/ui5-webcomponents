import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "reset";
const pathData = "M206 371q-11 0-18.5-7.5T180 345q0-10 8-18l33-32-33-33q-8-8-8-18 0-11 7.5-18.5T206 218t18 7l33 33 33-33q7-7 18-7t18 7.5 7 18.5-7 18l-33 32 33 33q7 7 7 18t-7 18.5-18 7.5-18-7l-33-33-33 33q-7 7-18 7zm56-294q45 0 84.5 17t69.5 46.5 47 69 17 84.5-17 85-46.5 69-69 46-84.5 17q-41 0-81-14t-72-39-53.5-61T32 318v-5q-1-10 6-17t17-8h3q10-1 17 5.5t8 17.5q4 36 21 63t42 46 56 28.5 62 9.5 60.5-10 53-29.5T415 370t14-68q0-37-13-69t-36-55-53-36.5-65-13.5H119l33 33q8 8 8 18 0 11-7.5 18.5T134 205q-10 0-18-8l-77-76q-7-7-7-19 0-11 7-18l77-77q7-7 18-7t18.5 7.5T160 26q0 10-8 18l-33 33h143z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/reset";
export { pathData, ltr, accData };