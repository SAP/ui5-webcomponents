import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "underline-text";
const pathData = "M128 32h32v208q0 33 23.5 56.5T240 320h32q34 0 57-23.5t23-56.5V32h32v208q0 23-9 43.5T351 319t-35.5 24-43.5 9h-32q-23 0-43.5-9T161 319t-24-35.5-9-43.5V32zM80 448h352q6 0 11 5t5 11q0 16-16 16H80q-16 0-16-16t16-16z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/underline-text";
export { pathData, ltr, accData };