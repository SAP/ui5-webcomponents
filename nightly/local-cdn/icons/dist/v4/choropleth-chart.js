import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "choropleth-chart";
const pathData = "M32.5 252V32h191v56l-64 104v37l-37-37h-53v49l154 47v55l-63 137-34-31-15-95-46-87zm264-28h183v63l-32 65-64 96-50 32V361l-74-74zm1-28v-55l36-32h37l73-77h36v146l-36-37v37h-19l-18-37h-36l-37 55h-36zm54-164v53h-37z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/choropleth-chart";
export { pathData, ltr, accData };