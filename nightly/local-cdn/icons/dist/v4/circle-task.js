import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "circle-task";
const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20q-54 0-100-20t-81-55-55-81.5T0 256t20-99.5T75 75t81-55T256 0zm0 475q46 0 86-17t69.5-47 46.5-70 17-85q0-46-17-86t-46.5-69.5T342 54t-86-17-86 17-69.5 46.5T54 170t-17 86q0 45 17 85t46.5 70 69.5 47 86 17z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/circle-task";
export { pathData, ltr, accData };