import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "filter-analytics";
const pathData = "M384 32h64q13 0 22.5 9.5T480 64v384q0 14-9.5 23t-22.5 9h-64q-14 0-23-9t-9-23V64q0-13 9-22.5t23-9.5zM192 448V160q0-13 9-22.5t23-9.5h64q13 0 22.5 9.5T320 160v288q0 14-9.5 23t-22.5 9h-64q-14 0-23-9t-9-23zM64 256h64q13 0 22.5 9.5T160 288v160q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23V288q0-13 9-22.5t23-9.5zm224 192V160h-64v288h64z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/filter-analytics";
export { pathData, ltr, accData };