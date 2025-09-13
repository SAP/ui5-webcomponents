import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_HIDE } from "../generated/i18n/i18n-defaults.js";

const name = "hide";
const pathData = "M505 468q7 7 7 18t-7.5 18.5T486 512t-18-7l-92-93q-64 36-123 36-43 0-80-15t-68-40-56.5-57.5T3 269q-3-6-3-12 0-9 12-27t28-38 32-37 23-24L8 44q-8-8-8-18Q0 15 7.5 7.5T26 0t18 7zM228 117q-5 2-7 2h-3q-11 0-18.5-7.5T192 93q0-9 6-16t15-9q11-2 20-3t22-1q45 0 82.5 14t68.5 38.5 56.5 57T509 243q3 6 3 12 0 9-4 14l-46 68q-7 9-12.5 12t-11.5 3q-10 0-17.5-7t-7.5-17q0-11 9-23l35-50q-83-140-203-140-9 0-14.5.5T228 117zm25 280q21 0 41.5-6t43.5-17l-36-36q-21 13-46 13-40 0-67.5-27.5T161 256q0-25 13-46l-43-43q-12 11-30.5 32T56 257q16 26 36.5 51.5t45 45T191 385t62 12zm-40-148q0 50 50 50z";
const ltr = false;
const accData = ICON_HIDE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/hide";
export { pathData, ltr, accData };