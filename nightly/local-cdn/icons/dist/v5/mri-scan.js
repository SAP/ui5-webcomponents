import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "mri-scan";
const pathData = "M256 278q-13 0-22.5-9.5T224 246t9.5-22.5T256 214t22.5 9.5T288 246t-9.5 22.5T256 278zM26 352q-11 0-18.5-7.5T0 326t7.5-18 18.5-7h236q11 0 18.5 7t7.5 18-7.5 18.5T262 352H26zm0-81q-11 0-18.5-7T0 246t7.5-18.5T26 220h140q11 0 18.5 7.5T192 246t-7.5 18-18.5 7H26zm230 241q-55 0-105-22t-86-63q-7-9-7-17 0-11 7.5-18.5T84 384q5 0 11 3t15 13q24 27 62.5 44t83.5 17q42 0 79.5-16.5t65-44 44-65T461 256t-16.5-79.5-44-65-65-44T256 51q-62 0-113.5 34T67 176q-6 16-23 16-11 0-18.5-7.5T18 166q0-2 1-5t4-11q14-33 37.5-60.5T115 42t67-31 74-11q53 0 99.5 20.5t81 55 55 81T512 256q0 52-20.5 99t-55 81.5-81 55T256 512zm-6-80q-11 0-18.5-7.5T224 406t7.5-18 18.5-7h6q26 0 48.5-10t39.5-27 27-40 10-48q0-26-10-48.5T344 168t-39.5-27-48.5-10q-24 0-45 8t-34 20-25 12q-11 0-17.5-7.5T128 146q0-16 15.5-28T180 97.5t42.5-13T256 80q36 0 68 14t56 38 38 56 14 68-14 68-38 56-56 38-68 14h-6z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/mri-scan";
export { pathData, ltr, accData };