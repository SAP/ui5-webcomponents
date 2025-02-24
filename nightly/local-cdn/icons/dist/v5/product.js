import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "product";
const pathData = "M220 365q-6 0-12-3l-67-39q-13-8-13-22 0-11 7.5-18.5T154 275q6 0 12 3l67 39q13 8 13 22 0 11-7.5 18.5T220 365zm37 147q-7 0-13-3L45 394q-13-8-13-23V160q0-14 11-22l102-69q8-5 15-5 8 0 13 4l167 104q12 6 12 22v101q0 11-7.5 18t-18.5 7-18-7.5-7-18.5v-86l-140-88-78 53v184l174 100 172-100V156L243 48q-13-8-13-22 0-11 7.5-18.5T256 0q7 0 13 3l198 116q13 8 13 22v230q0 15-13 23L270 509q-6 3-13 3z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/product";
export { pathData, ltr, accData };