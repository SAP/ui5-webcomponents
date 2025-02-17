import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "customer-and-supplier";
const pathData = "M486 32q11 0 18.5 7.5T512 58v396q0 11-7.5 18.5T486 480H26q-11 0-18.5-7.5T0 454V154q0-11 7.5-18.5T26 128h230V58q0-11 7.5-18.5T282 32h204zM51 179v200q25-27 64-27h77q39 0 64 27V179H51zm307 250v-58h-51v58h51zm-51-109h51v-45h-51v45zm51-141h-51v45h51v-45zm103 250v-58h-51v58h51zM307 128h51V83h-51v45zm154 51h-51v45h51v-45zm0-96h-51v45h51V83zm-51 237h51v-45h-51v45zm-266 0q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/customer-and-supplier";
export { pathData, ltr, accData };