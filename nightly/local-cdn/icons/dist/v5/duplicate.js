import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "duplicate";
const pathData = "M58 384q-11 0-18.5-7.5T32 358V90q0-38 26-64t64-26h236q11 0 18.5 7.5T384 26t-7.5 18-18.5 7H122q-17 0-28 11T83 90v268q0 11-7 18.5T58 384zm332 128H218q-38 0-64-26t-26-64V186q0-38 26-64t64-26h172q38 0 64 26t26 64v236q0 38-26 64t-64 26zM218 147q-17 0-28 11t-11 28v236q0 17 11 28t28 11h172q17 0 28-11t11-28V186q0-17-11-28t-28-11H218z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/duplicate";
export { pathData, ltr, accData };