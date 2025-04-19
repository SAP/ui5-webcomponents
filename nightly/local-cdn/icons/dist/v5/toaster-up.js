import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "toaster-up";
const pathData = "M486 0q11 0 18.5 7.5T512 26v12q0 11-7.5 18.5T486 64h-6v233q0 13-5.5 28.5T460 354t-21.5 21.5T412 384q-11 0-19.5-7t-8.5-19q0-8 5-15t14-9q11-4 18.5-14t7.5-23V64H83v233q0 13 7.5 23t18.5 14q9 2 14 9t5 15q0 11-8 18t-20 7q-14 0-26.5-8T52 354t-14.5-28-5.5-29V64h-6q-11 0-18.5-7.5T0 38V26Q0 15 7.5 7.5T26 0h460zM358 128q11 0 18.5 7.5T384 154t-7.5 18-18.5 7H154q-11 0-18.5-7t-7.5-18 7.5-18.5T154 128h204zm-7 212q7 7 7 18t-7 18.5-18 7.5q-10 0-18-8l-33-33v143q0 11-7.5 18.5T256 512t-18.5-7.5T230 486V343l-33 33q-8 8-18 8-11 0-18-7.5t-7-18.5 7-18l77-77q7-7 18-7t18 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/toaster-up";
export { pathData, ltr, accData };