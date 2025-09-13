import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "wounds-doc";
const pathData = "M0 512V384q0-27 10-50t27.5-40.5 41-27.5 49.5-10h48q-23 0-43.5-9T97 222.5t-24-36-9-43.5 9-43 24.5-35 36-24 42.5-9q23 0 43 9t35.5 24 24.5 35 9 43-9 43.5-24 36-35.5 24.5-43.5 9h48q26 0 48.5 10t42.5 27q2 2 2.5 3t2.5 3q32 38 32 85v128H0zm32-32h59l161-188q-7-4-28-4h-96q-42 0-69 27t-27 69v96zm288-352V64h64V0h64v64h64v64h-64v64h-64v-64h-64zM96 143q0 34 24 57 23 24 56 24 32 0 54-20.5t25-51.5l-80-24H98q-1 5-1.5 9t-.5 6zm192 169v168h32v-96q0-43-32-72zm-37-194q-8-25-28.5-39.5T176 64t-48 16z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/wounds-doc";
export { pathData, ltr, accData };