import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "physical-activity";
const pathData = "M394 91q-23 0-34-13.5T349 45t11-32 34-13q18 0 31.5 13T439 45t-13.5 32.5T394 91zm81 127q19 0 19 19 0 7-5 13t-14 6h-72q-15 0-22-15l-16-32 28-49 28 58h54zm-293 76l39 39-31 53q-7 13-26 15H47q-28 0-28-27t28-27h103zm176 64q8 8 8 22 0 9-4 18l-51 96q-5 9-12.5 13t-12.5 4q-11 0-20.5-8t-9.5-20q0-9 4-13l45-80-113-113 76-124-146 33q-1 1-6 1-10 0-17-4.5T92 164q0-15 18-20l211-51q8-2 12-2 22 0 35 18l5 8 10 22-91 154z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/physical-activity";
export { pathData, ltr, accData };