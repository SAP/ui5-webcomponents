import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "toaster-up";
const pathData = "M358 128q11 0 18.5 7.5T384 154t-7.5 18-18.5 7H154q-11 0-18.5-7t-7.5-18 7.5-18.5T154 128h204zM486 0q11 0 18.5 7.5T512 26v12q0 11-7.5 18.5T486 64h-6v234q0 13-5.5 28T460 354t-21.5 21.5T412 384q-11 0-19.5-7t-8.5-19q0-8 5-15t14-9q11-4 18.5-14t7.5-22V64H83v234q0 12 7.5 22t18.5 14q9 2 14 9t5 15q0 11-8 18t-21 7q-14 0-26-8t-21-21-14.5-28-5.5-28V64h-6q-11 0-18.5-7.5T0 38V26Q0 15 7.5 7.5T26 0h460zM351 340q7 7 7 18t-7 18.5-18 7.5-18-7l-33-34v143q0 11-7.5 18.5T256 512t-18.5-7.5T230 486V343l-33 34q-7 7-18 7t-18-7.5-7-18.5 7-18l77-77q7-7 18-7t18 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/toaster-up";
export { pathData, ltr, accData };