import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "fridge";
const pathData = "M132 0h248q15 0 25.5 11T416 37v443h-32v32h-64v-32H193v32h-65v-32H96V37q0-15 10.5-26T132 0zm252 448V50q0-8-5.5-13T366 32H146q-7 0-12.5 5T128 50v398h256zM321 96v32H192V96h129zm-43 110h73v18h-73v-18z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/fridge";
export { pathData, ltr, accData };