import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "display-more";
const pathData = "M422 0q38 0 64 26t26 64v332q0 38-26 64t-64 26H138q-28 0-53.5-11t-44-29.5-29.5-44T0 374t11-53 29.5-43.5 44-29.5 53.5-11h127l-34-33q-7-7-7-18t7.5-18.5T250 160t18 7l77 77q7 9 7 18 0 10-7 19l-77 76q-8 8-18 8-11 0-18.5-7.5T224 339t7-18l34-33H138q-18 0-34 7t-27.5 18.5-18.5 27-7 33.5q0 36 25.5 61.5T138 461h284q17 0 28-11t11-28V90q0-17-11-28t-28-11H90q-17 0-28 11T51 90v76q0 11-7 18.5T26 192t-18.5-7.5T0 166V90q0-38 26-64T90 0h332z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/display-more";
export { pathData, ltr, accData };