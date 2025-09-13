import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "edit-outside";
const pathData = "M0 480l22-110q0-5 4-9L352 36q4-4 11-4t11 4l69 68q12 11 0 23L118 453q-4 4-8 4zm52-99l46 46 224-224-46-45L53 381h-1zm204 115v-16q0-27 10-50t27.5-40.5 41-27.5 49.5-10h80l-75-69q-11-12 0-23 5-5 11-5t11 5l92 83q9 10 9 23t-9 23l-92 86q-5 5-11 5-3 0-11-5-11-12 0-23l75-68h-80q-40 0-68 28t-28 68v16q0 16-16 16t-16-16zm43-361l45 45 65-65-46-44z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/edit-outside";
export { pathData, ltr, accData };