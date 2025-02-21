import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sap-box";
const pathData = "M53.5 391l181 93V307l-44-23q-13-6-13-21v-59l-124-63v250zm138-203q7 4 10 10l51 88q3 6 3 12v193l93-47V250l-45-24q-13-6-13-21v-58l-145-72-89 45zm112-58q7 4 10 10l53 89q3 6 3 12v192l86-43V194l-42-22q-13-6-13-22V92l-147-72-84 43zm-223 154l116 59v23l-116-58v-24zm0 52l116 59v23l-116-59v-23zm-46 53V123q0-14 13-21l197-99q6-3 11-3 7 0 11 3l145 73q7 4 10 9l52 89q4 4 4 13v202q0 15-14 21l-197 100-7 2h-4l-11-2-197-100q-13-6-13-21z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/sap-box";
export { pathData, ltr, accData };