import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://drop-down-list";
const viewBox = "0 33 512 512";
const d = "M321 190q11 12 23 0 11-11 0-22l-65-61q-10-9-23-9t-22 9l-65 58q-12 11 0 23 11 11 23 0l59-53q5-6 11 0zm111 195q6 0 11-4.5t5-11.5-5-11.5-11-4.5H80q-16 0-16 16t16 16h352zm0-96q6 0 11-4.5t5-11.5-5-11.5-11-4.5H80q-16 0-16 16t16 16h352zm0 192q6 0 11-4.5t5-11.5-5-11.5-11-4.5H80q-16 0-16 16t16 16h352z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
