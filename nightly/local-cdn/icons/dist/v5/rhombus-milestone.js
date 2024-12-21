import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "rhombus-milestone";
const pathData = "M495 215q17 17 17 41t-17 41L297 495q-17 17-41 17t-41-17L17 297Q0 280 0 256t17-41L215 17q17-17 41-17t41 17zm-36 46q2-2 2-5t-2-5L261 53q-4-2-5-2t-5 2L53 251q-2 4-2 5t2 5l198 198q4 2 5 2t5-2z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/rhombus-milestone";
export { pathData, ltr, accData };