import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_HIDE } from "../generated/i18n/i18n-defaults.js";

const name = "hide";
const pathData = "M505 468q7 7 7 18t-7.5 18.5T486 512t-18-7l-92-93q-64 36-123 36-43 0-80-15t-68-40-56.5-57.5T3 269q-3-6-3-12 0-9 12-27t28-38 32-37 23-24L7 44q-7-7-7-18T7.5 7.5 26 0t18 7zM228 117q-6 2-7.5 2H218q-11 0-18.5-7.5T192 93q0-9 6-16t15-9q11-2 20-3t22-1q45 0 82.5 14t68.5 38.5 56.5 57T509 243q3 6 3 12 0 9-4 14l-46 68q-7 9-13 12t-11 3q-10 0-17.5-7t-7.5-17q0-11 9-23l35-50q-83-140-203-140-9 0-15 .5t-11 1.5zm25 280q21 0 41.5-6t43.5-17l-36-35q-10 5-21.5 8.5T256 351q-40 0-67.5-27.5T161 256q0-13 3.5-24.5T173 210l-42-43q-12 11-30.5 32T56 257q16 26 36.5 51.5t45 45T191 385t62 12zm-40-148q0 2-.5 3.5t-.5 3.5q0 19 12.5 31.5T256 300q2 0 3.5-.5t3.5-.5z";
const ltr = false;
const accData = ICON_HIDE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/hide";
export { pathData, ltr, accData };