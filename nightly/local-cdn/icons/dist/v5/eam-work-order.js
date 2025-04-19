import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "eam-work-order";
const pathData = "M480 320H32q-14 0-23-9t-9-23 9-23 23-9q0-34 9.5-65.5T69 132t43-48 56-34l-1-11v-1l-1-2v-1q0-12 11-19t26-10.5T233 1t23-1 23 1 30 4.5T335 16t11 19v1l-1 2v1l-1 11q31 13 56 34t43 48 27.5 58.5T480 256q14 0 23 9t9 23-9 23-23 9zM221 54l17 87h36l17-87q-16-3-35-3-18 0-35 3zm208 202q0-49-25.5-90.5T334 102l-15 70q-2 8-8.5 14t-16.5 6h-76q-10 0-16.5-6t-8.5-14l-15-70q-44 22-69.5 63.5T83 256h346zm77 138l-94 109q-8 9-19 9-12 0-19-8l-47-52q-7-7-7-17 0-11 7.5-18.5T346 409t18 9l28 30 75-87q8-9 19-9t18.5 7.5T512 378q0 8-6 16z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/eam-work-order";
export { pathData, ltr, accData };