import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "unfavorite";
const pathData = "M400 510q-7 0-12-3l-132-74-131 74q-6 3-13 3-11 0-18.5-7T86 485q0-2 .5-2.5t.5-1.5l26-155L7 214q-7-7-7-17t6.5-17 15.5-9l148-21 63-137q7-15 23-15t23 15l64 137 147 21q10 2 16 9t6 17q0 11-7 17L399 326l26 155q1 1 1 4 0 11-7.5 18t-18.5 7zM256 379q7 0 13 3l97 54-20-114q0-7 1-12t6-10l81-85-112-16q-13-1-20-15l-46-99-46 99q-5 13-19 15L78 215l81 85q5 5 6 10t1 12l-20 114 98-54q5-3 12-3z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/unfavorite";
export { pathData, ltr, accData };