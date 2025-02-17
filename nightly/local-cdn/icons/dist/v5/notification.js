import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "notification";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm70 160q11 0 18.5 7.5T352 186t-7 18l-53 52 53 52q7 7 7 18t-7.5 18.5T326 352t-18-7l-52-53-52 53q-7 7-18 7t-18.5-7.5T160 326t7-18l53-52-53-52q-7-7-7-18t7.5-18.5T186 160t18 7l52 53 52-53q7-7 18-7zm-70 301q42 0 79.5-16t65.5-44 44-65.5 16-79.5-16-79.5-44-65.5-65.5-44T256 51t-79.5 16-65.5 44-44 65.5T51 256t16 79.5 44 65.5 65.5 44 79.5 16z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/notification";
export { pathData, ltr, accData };