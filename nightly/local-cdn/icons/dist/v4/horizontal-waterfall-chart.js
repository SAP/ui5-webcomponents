import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "horizontal-waterfall-chart";
const pathData = "M0 0h32v512H0V0zm80 36q0-4 4-4h424q4 0 4 4v56q0 4-4 4H84q-4 0-4-4V36zm272 128q0-4 4-4h152q4 0 4 4v56q0 4-4 4H356q-4 0-4-4v-56zM244 288h104q4 0 4 4v56q0 4-4 4H244q-4 0-4-4v-56q0-4 4-4zM80 420q0-4 4-4h152q4 0 4 4v56q0 4-4 4H84q-4 0-4-4v-56z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/horizontal-waterfall-chart";
export { pathData, ltr, accData };