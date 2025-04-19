import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "feed";
const pathData = "M32 368q0-23 9-43.5T65 289t35.5-24 43.5-9 43.5 9 35.5 24 24 35.5 9 43.5-9 43.5-24 35.5-35.5 24-43.5 9-43.5-9T65 447t-24-35.5-9-43.5zm0-304V32h33q90 0 166 31t131.5 86.5T449 281t31 166v33h-32v-33q0-84-28.5-154T340 172 219 92.5 65 64H32zm32 304q0 33 23.5 56.5T144 448t56.5-23.5T224 368q0-34-23.5-57T144 288t-56.5 23T64 368zM32 128h32q66 0 124 25.5t101.5 69 69 101.5T384 448v32h-32v-32q0-60-22.5-112.5T268 244t-91.5-61.5T64 160H32v-32z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/feed";
export { pathData, ltr, accData };