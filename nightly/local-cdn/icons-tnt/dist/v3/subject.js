import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "subject";
const pathData = "M64 32h384c16 0 32 13 32 32v384c0 19-13 32-32 32H64c-19 0-32-15-32-32V64c0-17 15-32 32-32zm216 40h-48v48h48V72zm56 48h48V72h-48v48zM176 72h-48v48h48V72zm272 88H64v288h384V160z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/subject";
export { pathData, ltr, accData };