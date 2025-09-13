import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "geographic-bubble-chart";
const pathData = "M32.5 252V32h191v56l-64 104v37l-37-37h-53v49l87 27q-13 8-20.5 21.5t-7.5 30.5q0 26 19 45t45 19h6.5l6.5-1-45 97-34-31-15-95-46-87zm301 109l-74-74 37-63h183v54q-4-23-21.5-38.5T416.5 224q-26 0-45 19t-19 45q0 27 19 45.5t45 18.5q21 0 37-12l-6 12-64 96-50 32V361zm-36-165v-55l36-32h37l73-77h36v146l-36-37v37h-19l-18-37h-36l-37 55h-36zM64.5 96q0 27 19 45.5t45 18.5 45-18.5 19-45.5q0-26-19-45t-45-19-45 19-19 45zm64-48q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm64 224q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm224-32q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm-102-155l37-53v53h-37z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/geographic-bubble-chart";
export { pathData, ltr, accData };