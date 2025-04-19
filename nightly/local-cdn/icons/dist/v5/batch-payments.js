import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "batch-payments";
const pathData = "M480 229q14 8 23 21.5t9 29.5q0 10-2 14l-43 126q-10 27-33 43.5T382 480H88q-22 0-38.5-14.5T31 430L0 153q0-23 17-40t41-17h38V57q0-11 7.5-18t18.5-7h333q11 0 18 7t7 18v172zm-181 40l40-39q8-6 18-6h72v-96q-18-2-30.5-14.5T384 83H192q-1 18-14 30.5T147 128v96q18 1 31 13.5t14 31.5h107zm37-93q0 20-14 34t-34 14-34-14-14-34 14-34 34-14 34 14 14 34zM71 325l10-22q2-6 6-10.5t9-9.5V147H58q-7 0-7 7zm390-45q0-6-6-6h-88l-40 39q-9 7-18 7H133q-5 0-6 4l-46 99q0 6 7 6h294q13 0 22.5-7.5T419 403z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/batch-payments";
export { pathData, ltr, accData };