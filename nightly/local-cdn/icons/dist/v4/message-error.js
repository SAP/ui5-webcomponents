import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_MESSAGE_ERROR } from "../generated/i18n/i18n-defaults.js";

const name = "message-error";
const pathData = "M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-32 0q0-47-17.5-87.5t-48-71-71.5-48T256 32t-87 18-71.5 48.5-48 71T32 256q0 47 17.5 88t48 71 71.5 47.5 87 17.5q47 0 88-17.5t71-47.5 47.5-71 17.5-88zm-186-7q-5 3-1 9l89 89q8 8 0 17l-16 17q-8 4-9 4t-9-4l-89-89q-1-2-4-2-4 0-5 2l-88 89q-6 4-9 4-1 0-9-4l-16-17q-8-9 0-17l88-89q5-5 0-9l-88-89q-8-8 0-17l16-17q4-4 9-4t9 4l88 89q2 2 5 2 2 0 4-2l89-89q4-4 9-4t9 4l16 17q9 8 0 17z";
const ltr = false;
const accData = ICON_MESSAGE_ERROR;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/message-error";
export { pathData, ltr, accData };