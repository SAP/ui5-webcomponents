import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "copy";
const pathData = "M384 26q0 11-7.5 18T358 51H122q-17 0-28 11T83 90v268q0 11-7 18.5T58 384t-18.5-7.5T32 358V90q0-38 26-64t64-26h236q11 0 18.5 7.5T384 26zm6 70q38 0 64 26t26 64v236q0 38-26 64t-64 26H218q-38 0-64-26t-26-64V186q0-38 26-64t64-26h172zm39 90q0-17-11-28t-28-11H218q-17 0-28 11t-11 28v236q0 17 11 28t28 11h172q17 0 28-11t11-28V186zm-71 83q11 0 18.5 7.5T384 295t-7.5 18-18.5 7H250q-11 0-18.5-7t-7.5-18 7.5-18.5T250 269h108zm0 96q11 0 18.5 7t7.5 18-7.5 18.5T358 416H250q-11 0-18.5-7.5T224 390t7.5-18 18.5-7h108z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/copy";
export { pathData, ltr, accData };